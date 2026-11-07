import { createServerFn } from "@tanstack/react-start";
import type { MercadoDatabase } from "@/data/mercado/db-tipos";
import { formatarBrl } from "@/lib/mercado";

export type Comentario = {
  autor: string;
  data: string;
  corpo: string;
  compra: string;
};

/**
 * Linhas de contato do mirror original nunca chegam ao cliente: quem envia e
 * o proprio site.
 */
function limparContato(texto: string): string {
  return texto
    .split("\n")
    .filter((l) => {
      const t = l.trim();
      if (!t) return true;
      return !(/^(Contact|Contato):/i.test(t) || /@x-mail\.pro/i.test(t));
    })
    .join("\n");
}

export type Variante = {
  id: string;
  produtoId: string;
  variante: string;
  preco: number;
  precoTexto: string;
  precoAntigo: string;
  img: string;
  ordem: number;
};

export type Produto = {
  id: string;
  chave: string;
  vendor: string;
  vendorSlug: string;
  produto: string;
  titulo: string;
  descricao: string;
  galeria: string[];
  imgPrincipal: string;
  categoria: string;
  envio: string;
  vendas: number;
  comentarios: Comentario[];
  paises: string[];
  variantes: Variante[];
};

export type Vendedor = {
  id: string;
  slug: string;
  nome: string;
  nivel: string;
  envio: string;
  capa: string;
  logo: string;
  ativo: boolean;
  vendas: number;
  destaque: boolean;
  produtos: number;
};

export type Catalogo = {
  fonte: "banco" | "estatico";
  produtos: Produto[];
  vendedores: Vendedor[];
};

const CATEGORIA = "drugs";

function lerEnv(chave: "SUPABASE_URL" | "SUPABASE_PUBLISHABLE_KEY", fallback: string | undefined) {
  const runtime = typeof process !== "undefined" && process.env ? process.env[chave] : undefined;
  return runtime ?? fallback;
}

async function clientePublico() {
  const { createClient } = await import("@supabase/supabase-js");
  const url = lerEnv("SUPABASE_URL", import.meta.env["VITE_SUPABASE_URL"]);
  const chave = lerEnv(
    "SUPABASE_PUBLISHABLE_KEY",
    import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"],
  );
  if (!url || !chave) throw new Error("Supabase nao configurado");
  return createClient<MercadoDatabase>(url, chave, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function precoTexto(valor: number): string {
  return formatarBrl(valor);
}

/**
 * Consulta de pedido por id + chave secreta.
 * Usa a service role quando ela existe no runtime (runtime da Lovable Cloud);
 * sem ela, a RLS do projeto so permite o proprio dono do pedido — nesse caso
 * a pagina /status.php cai no caminho autenticado.
 */
export const buscarPedidoPorChave = createServerFn({ method: "GET" })
  .validator((input: { id: string; chave: string }) => input)
  .handler(async ({ data: entrada }) => {
    const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    const url = lerEnv("SUPABASE_URL", import.meta.env["VITE_SUPABASE_URL"]);
    if (!serviceKey || !url) return { disponivel: false, pedido: null };

    const { createClient } = await import("@supabase/supabase-js");
    const admin = createClient<MercadoDatabase>(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: pedido, error } = await admin
      .from("pedidos")
      .select(
        "id, status, valor_total, criado_em, chave_secreta, pagamento, moeda, endereco, observacoes, pedido_itens ( produto_id, variante_id, quantidade, preco_unitario, produto_nome, variante, vendedor )",
      )
      .eq("id", entrada.id)
      .eq("chave_secreta", entrada.chave)
      .maybeSingle();

    if (error || !pedido) return { disponivel: true, pedido: null };
    return { disponivel: true, pedido };
  });

/**
 * Carrega o catalogo da secao Medical / Drugs.
 * Fonte primaria: banco (produtos + produtos_variantes + vendedores).
 * Fallback: catalogo estatico embutido, para a vitrine funcionar antes da
 * migration 0001 ser aplicada no Supabase.
 */
export const carregarCatalogo = createServerFn({ method: "GET" }).handler(
  async (): Promise<Catalogo> => {
    try {
      const supabase = await clientePublico();

      const [
        { data: linhasProduto, error: erroProduto },
        { data: linhasVariante, error: erroVariante },
        { data: linhasVendedor, error: erroVendedor },
      ] = await Promise.all([
        supabase
          .from("produtos")
          .select(
            "id, nome, descricao, preco, imagem_url, categoria, vendedor, vendedor_slug, envio, numero_produto, galeria, comentarios, vendas, criado_em",
          )
          .eq("categoria", CATEGORIA),
        supabase
          .from("produtos_variantes")
          .select("id, produto_id, variante, preco, preco_antigo, imagem, ordem")
          .order("ordem"),
        supabase
          .from("vendedores")
          .select("id, slug, nome, nivel, envio, capa, logo, ativo, vendas, destaque"),
      ]);

      if (erroProduto || erroVariante || erroVendedor) throw new Error("consulta falhou");
      if (!linhasProduto || linhasProduto.length === 0) throw new Error("catalogo vazio");

      const variantesPorProduto = new Map<string, Variante[]>();
      for (const linha of linhasVariante ?? []) {
        const lista = variantesPorProduto.get(linha.produto_id) ?? [];
        lista.push({
          id: linha.id,
          produtoId: linha.produto_id,
          variante: linha.variante,
          preco: Number(linha.preco),
          precoTexto: precoTexto(Number(linha.preco)),
          precoAntigo: linha.preco_antigo ?? "",
          img: linha.imagem ?? "",
          ordem: linha.ordem ?? 0,
        });
        variantesPorProduto.set(linha.produto_id, lista);
      }

      const produtos: Produto[] = linhasProduto.map((linha) => ({
        id: linha.id,
        chave: `${linha.vendedor_slug}#${linha.id}`,
        vendor: linha.vendedor ?? "",
        vendorSlug: linha.vendedor_slug ?? "",
        produto: linha.numero_produto ?? linha.id,
        titulo: linha.nome,
        descricao: limparContato(linha.descricao ?? ""),
        galeria: linha.galeria ?? [],
        imgPrincipal: linha.imagem_url ?? "",
        categoria: linha.categoria ?? CATEGORIA,
        envio: linha.envio ? limparContato(linha.envio).replace(/\n+/g, " · ") : "Envio mundial",
        vendas: linha.vendas ?? 0,
        comentarios: (linha.comentarios ?? []) as Comentario[],
        paises: [],
        variantes: (variantesPorProduto.get(linha.id) ?? []).sort((a, b) => a.ordem - b.ordem),
      }));

      const vendedores: Vendedor[] = (linhasVendedor ?? []).map((linha) => ({
        id: linha.id,
        slug: linha.slug,
        nome: linha.nome,
        nivel: "",
        envio: linha.envio,
        capa: linha.capa ?? "",
        logo: linha.logo ?? "",
        ativo: linha.ativo,
        vendas: linha.vendas,
        destaque: linha.destaque,
        produtos: produtos.filter((p) => p.vendorSlug === linha.slug).length,
      }));

      return { fonte: "banco", produtos, vendedores };
    } catch {
      const estatico = await import("@/data/mercado/catalogo");
      const produtos: Produto[] = estatico.PRODUTOS.map((p) => ({
        ...p,
        descricao: limparContato(p.descricao),
        produto: p.produto,
        envio: limparContato(p.envio).replace(/\n+/g, " · "),
        variantes: p.variantes.map((v, i) => ({
          id: v.id,
          produtoId: p.id,
          variante: v.variante,
          preco: v.preco,
          precoTexto: v.precoTexto,
          precoAntigo: v.precoAntigo,
          img: v.img,
          ordem: i,
        })),
      }));
      const vendedores: Vendedor[] = estatico.VENDEDORES.map((v) => ({
        id: v.slug,
        slug: v.slug,
        nome: v.nome,
        nivel: "",
        envio: v.envio,
        capa: v.capa,
        logo: v.logo,
        ativo: v.ativo,
        vendas: v.vendas,
        destaque: v.topo,
        produtos: v.produtos,
      }));
      return { fonte: "estatico", produtos, vendedores };
    }
  },
);
