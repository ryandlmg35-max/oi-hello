import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { CATEGORIAS, PRODUTOS, VENDEDORES, totalAnuncios } from "@/data/mercado/catalogo";

const RAIZ = path.resolve(__dirname, "..", "..");

describe("catalogo espelhado (Medical / Drugs)", () => {
  it("so contem a categoria drugs", () => {
    expect(CATEGORIAS.map((c) => c.slug)).toEqual(["drugs"]);
    expect(PRODUTOS.every((p) => p.categoria === "drugs")).toBe(true);
  });

  it("mantem a contagem do site original", () => {
    expect(PRODUTOS).toHaveLength(19);
    expect(totalAnuncios()).toBe(70);
    expect(VENDEDORES).toHaveLength(6);
  });

  it("nao repete id de variante", () => {
    const ids = PRODUTOS.flatMap((p) => p.variantes.map((v) => v.id));

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("todo produto tem variante com preco e imagem", () => {
    for (const produto of PRODUTOS) {
      expect(produto.variantes.length).toBeGreaterThan(0);
      for (const variante of produto.variantes) {
        expect(variante.preco).toBeGreaterThan(0);
        expect(variante.img).not.toBe("");
        expect(variante.variante.length).toBeGreaterThan(0);
      }
    }
  });

  it("cada produto aponta para um vendedor do catalogo", () => {
    const slugs = new Set(VENDEDORES.map((v) => v.slug));

    for (const produto of PRODUTOS) {
      expect(slugs.has(produto.vendorSlug)).toBe(true);
    }
  });

  it("comentarios vieram quebrados em bloco unico (autor nao pode vir colado)", () => {
    for (const produto of PRODUTOS) {
      for (const comentario of produto.comentarios) {
        expect(comentario.autor.length).toBeLessThan(60);
        expect(comentario.autor).not.toContain("Confirmed Purchase");
        expect(comentario.data).toMatch(/\d{2}\.\s?\w{3}\s\d{4}/);
      }
    }
  });

  it("as imagens espelhadas existem em public/pic", () => {
    const faltando: string[] = [];

    for (const produto of PRODUTOS) {
      const arquivos = [produto.imgPrincipal, ...produto.galeria, ...produto.variantes.map((v) => v.img)];
      for (const arquivo of arquivos) {
        if (!arquivo) continue;
        const destino = path.join(RAIZ, "public", arquivo);
        if (!fs.existsSync(destino)) faltando.push(arquivo);
      }
    }

    for (const vendedor of VENDEDORES) {
      for (const arquivo of [vendedor.capa, vendedor.logo]) {
        if (!arquivo) continue;
        const destino = path.join(RAIZ, "public", arquivo);
        if (!fs.existsSync(destino)) faltando.push(arquivo);
      }
    }

    expect([...new Set(faltando)]).toEqual([]);
  });
});
