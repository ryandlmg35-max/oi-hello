export type ItemCarrinho = {
  varianteId: string;
  produtoId: string;
  nome: string;
  variante: string;
  preco: number;
  precoTexto: string;
  img: string;
  vendor: string;
  vendorSlug: string;
  quantidade: number;
};

export type VarianteParaCarrinho = {
  id: string;
  produtoId: string;
  variante: string;
  preco: number;
  precoTexto: string;
  img: string;
};

export type ProdutoParaCarrinho = {
  id: string;
  titulo: string;
  vendor: string;
  vendorSlug: string;
};

export const CHAVE_STORAGE = "blackmarket.carrinho.v1";

export function criarItem(
  produto: ProdutoParaCarrinho,
  variante: VarianteParaCarrinho,
  quantidade = 1,
): ItemCarrinho {
  return {
    varianteId: variante.id,
    produtoId: produto.id,
    nome: produto.titulo,
    variante: variante.variante,
    preco: variante.preco,
    precoTexto: variante.precoTexto,
    img: variante.img,
    vendor: produto.vendor,
    vendorSlug: produto.vendorSlug,
    quantidade: Math.max(1, quantidade),
  };
}

/** Adiciona (ou soma) uma variante. */
export function adicionarItem(itens: ItemCarrinho[], item: ItemCarrinho) {
  const existente = itens.find((i) => i.varianteId === item.varianteId);
  if (!existente) return [...itens, item];
  return itens.map((i) =>
    i.varianteId === item.varianteId ? { ...i, quantidade: i.quantidade + item.quantidade } : i,
  );
}

/** Define a quantidade. Quantidade 0 remove o item. */
export function definirQuantidade(itens: ItemCarrinho[], varianteId: string, quantidade: number) {
  if (quantidade <= 0) return removerItem(itens, varianteId);
  return itens.map((i) => (i.varianteId === varianteId ? { ...i, quantidade } : i));
}

export function removerItem(itens: ItemCarrinho[], varianteId: string) {
  return itens.filter((i) => i.varianteId !== varianteId);
}

export function totalItens(itens: ItemCarrinho[]): number {
  return itens.reduce((acc, i) => acc + i.quantidade, 0);
}

export function subtotal(itens: ItemCarrinho[]): number {
  const soma = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  return Math.round((soma + Number.EPSILON) * 100) / 100;
}

/** Valida o payload lido do localStorage antes de colocá-lo no estado. */
export function normalizarItens(bruto: unknown): ItemCarrinho[] {
  if (!Array.isArray(bruto)) return [];

  const itens: ItemCarrinho[] = [];
  for (const registro of bruto) {
    if (typeof registro !== "object" || registro === null) continue;
    const item = registro as Partial<ItemCarrinho>;
    if (typeof item.varianteId !== "string" || typeof item.nome !== "string") continue;
    const preco = Number(item.preco);
    const quantidade = Number(item.quantidade);
    if (!Number.isFinite(preco) || !Number.isFinite(quantidade)) continue;

    itens.push({
      varianteId: item.varianteId,
      produtoId: typeof item.produtoId === "string" ? item.produtoId : "",
      nome: item.nome,
      variante: typeof item.variante === "string" ? item.variante : "",
      preco,
      precoTexto: typeof item.precoTexto === "string" ? item.precoTexto : `$${preco.toFixed(2)}`,
      img: typeof item.img === "string" ? item.img : "",
      vendor: typeof item.vendor === "string" ? item.vendor : "",
      vendorSlug: typeof item.vendorSlug === "string" ? item.vendorSlug : "",
      quantidade: Math.max(1, Math.trunc(quantidade)),
    });
  }
  return itens;
}
