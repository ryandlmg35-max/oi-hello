import { describe, expect, it } from "vitest";

import {
  adicionarItem,
  criarItem,
  definirQuantidade,
  normalizarItens,
  removerItem,
  subtotal,
  totalItens,
  type ItemCarrinho,
} from "@/features/carrinho/carrinho-reducer";

const produto = {
  id: "prod-1",
  titulo: "Blueberry Hash",
  vendor: "Hash King",
  vendorSlug: "hash-king",
};

const variante = {
  id: "var-1",
  produtoId: "prod-1",
  variante: "5 GRAM",
  preco: 35,
  precoTexto: "$35.00",
  img: "pic/hashking/ahead.jpg",
};

describe("carrinho do mercado", () => {
  it("cria item com os dados do listing e a variante", () => {
    const item = criarItem(produto, variante);

    expect(item).toMatchObject({
      varianteId: "var-1",
      produtoId: "prod-1",
      nome: "Blueberry Hash",
      variante: "5 GRAM",
      preco: 35,
      vendor: "Hash King",
      quantidade: 1,
    });
  });

  it("soma a quantidade quando a variante ja esta no carrinho", () => {
    const primeiro = criarItem(produto, variante);
    const segundo = criarItem(produto, variante, 2);

    const itens = adicionarItem(adicionarItem([], primeiro), segundo);

    expect(itens).toHaveLength(1);
    expect(itens[0]?.quantidade).toBe(3);
    expect(totalItens(itens)).toBe(3);
  });

  it("mantem variantes diferentes do mesmo produto separadas", () => {
    const outra = {
      ...variante,
      id: "var-2",
      variante: "10 GRAM",
      preco: 60,
      precoTexto: "$60.00",
    };

    const itens = adicionarItem(
      adicionarItem([], criarItem(produto, variante)),
      criarItem(produto, outra),
    );

    expect(itens).toHaveLength(2);
    expect(subtotal(itens)).toBe(95);
  });

  it("define quantidade e remove quando chega a zero", () => {
    const itens = adicionarItem([], criarItem(produto, variante, 3));

    expect(definirQuantidade(itens, "var-1", 5)[0]?.quantidade).toBe(5);
    expect(definirQuantidade(itens, "var-1", 0)).toHaveLength(0);
    expect(removerItem(itens, "var-1")).toHaveLength(0);
  });

  it("calcula subtotal com centavos sem erro de ponto flutuante", () => {
    const item: ItemCarrinho = { ...criarItem(produto, variante), preco: 0.1, quantidade: 3 };

    expect(subtotal([item])).toBe(0.3);
  });

  it("descarta payload invalido vindo do localStorage", () => {
    const itens = normalizarItens([
      { varianteId: "var-1", nome: "Blueberry Hash", preco: 35, quantidade: 2 },
      { varianteId: 42, nome: "sem id" },
      null,
      "lixo",
      { varianteId: "var-2", nome: "preco quebrado", preco: "abc", quantidade: 1 },
    ]);

    expect(itens).toHaveLength(1);
    expect(itens[0]?.varianteId).toBe("var-1");
    expect(itens[0]?.quantidade).toBe(2);
  });
});
