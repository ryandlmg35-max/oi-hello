import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { paramTexto } from "@/lib/mercado";

const CATALOGO = {
  fonte: "estatico",
  produtos: [
    {
      id: "p1",
      chave: "hash-king#1",
      vendor: "Hash King",
      vendorSlug: "hash-king",
      produto: "1",
      titulo: "Produto Um",
      descricao: "",
      galeria: [],
      imgPrincipal: "pic/a.jpg",
      categoria: "drugs",
      envio: "Envio",
      vendas: 1,
      comentarios: [],
      paises: [],
      variantes: [
        {
          id: "v1",
          nome: "Produto Um",
          variante: "5 GRAM",
          preco: 35,
          precoTexto: "R$ 189,00",
          precoAntigo: "",
          img: "",
          envio: "",
          origem: "card",
        },
      ],
    },
    {
      id: "p2",
      chave: "hash-king#2",
      vendor: "Hash King",
      vendorSlug: "hash-king",
      produto: "2",
      titulo: "Produto Dois",
      descricao: "",
      galeria: [],
      imgPrincipal: "pic/b.jpg",
      categoria: "drugs",
      envio: "Envio",
      vendas: 1,
      comentarios: [],
      paises: [],
      variantes: [
        {
          id: "v2",
          nome: "Produto Dois",
          variante: "10 GRAM",
          preco: 70,
          precoTexto: "R$ 378,00",
          precoAntigo: "",
          img: "",
          envio: "",
          origem: "card",
        },
      ],
    },
  ],
  vendedores: [],
};

vi.mock("@/data/mercado/servidor", () => ({
  carregarCatalogo: async () => CATALOGO,
  buscarPedidoPorChave: async () => ({ disponivel: false }),
}));

async function routerNoCatalogo() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/cat.php?cat=drugs"] }),
    context: { queryClient: new QueryClient() },
  });
  await router.load();
  return router;
}

function searchDoProduto(router: Awaited<ReturnType<typeof routerNoCatalogo>>) {
  return router.state.matches.find((m) => m.routeId.includes("product"))?.search as
    { vendor: string; product: string; variante: string } | undefined;
}

describe("navegacao entre produtos", () => {
  it("leva ao produto clicado, nao ao anterior", async () => {
    const router = await routerNoCatalogo();

    // Como o app navega: to + search (o router monta a query string).
    await router.navigate({
      to: "/product.php",
      search: { vendor: "Hash King", product: "1", variante: "v1" },
    });
    expect(searchDoProduto(router)).toMatchObject({ vendor: "Hash King", product: "1" });

    await router.navigate({
      to: "/product.php",
      search: { vendor: "Hash King", product: "2", variante: "v2" },
    });
    const search = searchDoProduto(router);
    expect(search).toMatchObject({ vendor: "Hash King", product: "2", variante: "v2" });

    // O produto resolvido precisa ser o segundo, nao o primeiro do vendedor.
    const resolvido = CATALOGO.produtos.find(
      (p) => p.vendorSlug === "hash-king" && p.produto === search?.product,
    );
    expect(resolvido?.titulo).toBe("Produto Dois");
  });

  it("param numerico da URL vira texto (o router parseia ?product=2 como numero)", async () => {
    const router = await routerNoCatalogo();

    // URL crua (link antigo ou entrada direta no endereco): o router le a
    // query como JSON e "2" vira numero 2 — o validateSearch tem que
    // devolver texto, senao o produto nao e encontrado.
    router.history.push("/product.php?vendor=Hash%20King&product=2&variante=v2");
    await router.load();
    await new Promise((resolve) => setTimeout(resolve, 30));

    expect(router.state.location.search).toMatchObject({ product: 2 });
    expect(searchDoProduto(router)).toMatchObject({ vendor: "Hash King", product: "2" });

    expect(paramTexto(2)).toBe("2");
    expect(paramTexto("2")).toBe("2");
    expect(paramTexto(undefined)).toBe("");
    expect(paramTexto(true)).toBe("");
  });
});
