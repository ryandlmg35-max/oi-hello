import { mercadoSupabase as supabase } from "@/data/mercado/client";
import type { ItemCarrinho } from "@/features/carrinho/carrinho-reducer";

export type Resultado = { ok: true; id: string; chave?: string } | { ok: false; mensagem: string };

export type PedidoItem = {
  produto_id: string;
  variante_id: string | null;
  quantidade: number;
  preco_unitario: number;
  produto_nome: string | null;
  variante: string | null;
  vendedor: string | null;
};

export type Pedido = {
  id: string;
  status: string;
  valor_total: number;
  criado_em: string;
  chave_secreta: string | null;
  pagamento: string | null;
  moeda: string | null;
  endereco: Record<string, string> | null;
  observacoes: string | null;
  pedido_itens: PedidoItem[];
};

export const SELECT_PEDIDO = `
  id, status, valor_total, criado_em, chave_secreta, pagamento, moeda, endereco, observacoes,
  pedido_itens ( produto_id, variante_id, quantidade, preco_unitario, produto_nome, variante, vendedor )
`;

/** Chave de 12 caracteres usada para consultar o status do pedido. */
export function gerarChaveSecreta(): string {
  const alfabeto = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alfabeto[b % alfabeto.length]).join("");
}

/** Traduz os erros do PostgREST para algo acionavel no checkout. */
function explicarErro(erro: { code?: string; message: string } | null, padrao: string): string {
  if (!erro) return padrao;
  switch (erro.code) {
    case "42703":
    case "PGRST204":
      return "O banco ainda nao tem as colunas do mercado — aplique a migration 0001_migration.sql no Supabase.";
    case "23503":
      return "O catalogo ainda nao foi sincronizado no banco — aplique a migration 0001_migration.sql.";
    case "42501":
      return "Sua sessao nao tem permissao para essa operacao (RLS do projeto).";
    case "23505":
      return "Ja existe um registro com esse identificador — tente novamente.";
    default:
      return erro.message || padrao;
  }
}

/**
 * Grava o pedido do usuario autenticado.
 * `pedidos` e `pedido_itens` tem policy de RLS por `auth.uid()`, entao a
 * insercao usa o JWT do usuario (cliente browser), nunca service role.
 */
export async function criarPedido(params: {
  usuarioId: string;
  nome: string;
  email: string;
  endereco: Record<string, string>;
  pagamento: string;
  moeda: string;
  observacoes: string;
  itens: ItemCarrinho[];
}): Promise<Resultado> {
  const { usuarioId, nome, email, endereco, pagamento, moeda, observacoes, itens } = params;

  // Garante o perfil (FK de pedidos.usuario_id -> profiles.id).
  const { error: erroPerfil } = await supabase
    .from("profiles")
    .upsert({ id: usuarioId, nome, email }, { onConflict: "id" });

  if (erroPerfil) {
    return { ok: false, mensagem: `Nao foi possivel salvar seu perfil: ${erroPerfil.message}` };
  }

  const total = Math.round(itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0) * 100) / 100;
  const chave = gerarChaveSecreta();

  const { data: pedido, error: erroPedido } = await supabase
    .from("pedidos")
    .insert({
      usuario_id: usuarioId,
      status: "pendente",
      valor_total: total,
      chave_secreta: chave,
      pagamento,
      moeda,
      endereco,
      observacoes: observacoes || null,
    })
    .select("id")
    .single();

  if (erroPedido || !pedido) {
    return {
      ok: false,
      mensagem: explicarErro(erroPedido, "Nao foi possivel registrar o pedido."),
    };
  }

  const linhas = itens.map((item) => ({
    pedido_id: pedido.id,
    produto_id: item.produtoId,
    variante_id: item.varianteId,
    quantidade: item.quantidade,
    preco_unitario: item.preco,
    produto_nome: item.nome,
    variante: item.variante,
    vendedor: item.vendor,
  }));

  const { error: erroItens } = await supabase.from("pedido_itens").insert(linhas);

  if (erroItens) {
    // rollback: pedido sem itens nao faz sentido
    await supabase.from("pedidos").delete().eq("id", pedido.id);
    return {
      ok: false,
      mensagem: explicarErro(erroItens, "Nao foi possivel registrar os itens."),
    };
  }

  return { ok: true, id: pedido.id, chave };
}

/** Historico de pedidos do usuario logado (RLS: apenas os proprios). */
export async function listarMeusPedidos(): Promise<Pedido[]> {
  const { data, error } = await supabase
    .from("pedidos")
    .select(SELECT_PEDIDO)
    .order("criado_em", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Pedido[];
}

/** Perfil do usuario logado. */
export async function buscarMeuPerfil(usuarioId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, nome, email, criado_em")
    .eq("id", usuarioId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ?? null;
}

/** Atualiza o nome do perfil do usuario logado. */
export async function atualizarMeuPerfil(usuarioId: string, nome: string): Promise<Resultado> {
  const { error } = await supabase.from("profiles").update({ nome }).eq("id", usuarioId);
  if (error) return { ok: false, mensagem: error.message };
  return { ok: true, id: usuarioId };
}
