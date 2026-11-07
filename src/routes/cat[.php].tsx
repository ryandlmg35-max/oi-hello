import { createFileRoute, Link } from "@tanstack/react-router";
import { carregarCatalogo } from "@/data/mercado/servidor";
import { CartaoAnuncio } from "@/components/mercado/cartao-anuncio";

export const Route = createFileRoute("/cat.php")({
  head: () => ({
    meta: [
      { title: "Medical / Drugs | Black Market 2026" },
      {
        name: "description",
        content: "Medical / Drugs — listings com escrow MultiSig e entrega expressa.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    cat: typeof search["cat"] === "string" ? search["cat"] : "drugs",
  }),
  loader: async () => {
    const catalogo = await carregarCatalogo();
    return { catalogo };
  },
  component: Categoria,
});

function Categoria() {
  const { cat } = Route.useSearch();
  const { catalogo } = Route.useLoaderData();

  const produtos = cat === "drugs" ? catalogo.produtos.filter((p) => p.categoria === "drugs") : [];

  const anuncios = produtos.flatMap((produto) =>
    produto.variantes.map((variante) => ({ produto, variante })),
  );

  if (cat !== "drugs") {
    return (
      <div className="maincontainer">
        <section className="features-card">
          <div className="features-grid">
            <div className="feature-item">
              <h3 className="feature-title">Category not available</h3>
              <p className="feature-description">
                Este mirror traz somente a secao Medical / Drugs.
              </p>
              <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
                Ver Medical / Drugs
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="maincontainer">
        <section className="features-card" id="winter2026">
          <br />
          <div className="features-grid">
            <div className="feature-item">
              <Link to="/cat.php" search={{ cat: "drugs" }}>
                <img
                  src="/pic/bf_sale_wide.jpg"
                  width={600}
                  height={291}
                  alt="Black Friday Sale"
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                />
              </Link>
              <br />
              <br />
              <h3 className="feature-title">
                Sale: Up to{" "}
                <span style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "1.1em" }}>20%</span>{" "}
                Off
              </h3>
              <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
                View All Products
              </Link>
            </div>
          </div>
          <p className="footnote">*Available until 30/9/2026</p>
        </section>
      </div>

      <div className="card-container">
        {anuncios.map(({ produto, variante }) => (
          <CartaoAnuncio key={variante.id} produto={produto} variante={variante} />
        ))}
      </div>
    </>
  );
}
