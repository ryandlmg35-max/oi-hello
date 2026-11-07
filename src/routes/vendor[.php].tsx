import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { carregarCatalogo } from "@/data/mercado/servidor";
import { CartaoAnuncio } from "@/components/mercado/cartao-anuncio";
import { FaixaVendedor } from "@/components/mercado/faixa-vendedor";
import { paramTexto } from "@/lib/mercado";

const slug = (valor: string) =>
  valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const Route = createFileRoute("/vendor.php")({
  head: () => ({
    meta: [
      { title: "Coleção | Black Market 2026" },
      {
        name: "description",
        content: "Produtos direto do nosso estoque — envio próprio, com custódia MultiSig.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    vendor: paramTexto(search["vendor"]),
  }),
  loader: async () => {
    const catalogo = await carregarCatalogo();
    return { catalogo };
  },
  component: PaginaVendedor,
});

function PaginaVendedor() {
  const { vendor } = Route.useSearch();
  const { catalogo } = Route.useLoaderData();

  const vendedor = useMemo(
    () => catalogo.vendedores.find((v) => v.slug === slug(vendor)) ?? null,
    [catalogo.vendedores, vendor],
  );

  const anuncios = useMemo(
    () =>
      catalogo.produtos
        .filter((p) => p.vendorSlug === slug(vendor))
        .flatMap((produto) => produto.variantes.map((variante) => ({ produto, variante }))),
    [catalogo.produtos, vendor],
  );

  if (!vendedor) throw notFound();

  return (
    <div className="maincontainer">
      <FaixaVendedor
        vendedor={vendedor}
        reviews={{
          vendor: vendedor.nome,
          product: catalogo.produtos.find((p) => p.vendorSlug === vendedor.slug)?.produto ?? "1",
        }}
      />
      <br />

      <div className="card-container">
        {anuncios.map(({ produto, variante }) => (
          <CartaoAnuncio key={variante.id} produto={produto} variante={variante} />
        ))}
      </div>

      {anuncios.length === 0 ? (
        <section className="features-card">
          <div className="features-grid">
            <div className="feature-item">
              <h3 className="feature-title">Nenhum anúncio</h3>
              <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
                Ver Medical / Drugs
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
