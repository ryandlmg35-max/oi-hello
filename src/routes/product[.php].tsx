import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { carregarCatalogo } from "@/data/mercado/servidor";
import { FaixaVendedor } from "@/components/mercado/faixa-vendedor";
import { useCarrinho } from "@/features/carrinho/carrinho-context";

const slug = (valor: string) =>
  valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const Route = createFileRoute("/product.php")({
  head: () => ({
    meta: [
      { title: "Produto | Black Market 2026" },
      { name: "description", content: "Anúncio com escrow MultiSig e entrega expressa." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    vendor: typeof search["vendor"] === "string" ? search["vendor"] : "",
    product: typeof search["product"] === "string" ? search["product"] : "",
    variante: typeof search["variante"] === "string" ? search["variante"] : "",
  }),
  loader: async ({ params }) => {
    const catalogo = await carregarCatalogo();
    return { catalogo };
  },
  component: PaginaProduto,
});

function PaginaProduto() {
  const { vendor, product, variante: varianteUrl } = Route.useSearch();
  const { catalogo } = Route.useLoaderData();
  const { adicionar } = useCarrinho();

  const vendedor = useMemo(
    () => catalogo.vendedores.find((v) => v.slug === slug(vendor)) ?? null,
    [catalogo.vendedores, vendor],
  );

  const produto = useMemo(() => {
    const alvo = catalogo.produtos.find((p) => p.vendorSlug === slug(vendor));
    if (!alvo) return null;
    return (
      catalogo.produtos.find((p) => p.vendorSlug === slug(vendor) && p.produto === product) ?? alvo
    );
  }, [catalogo.produtos, vendor, product]);

  const [selecionada, setSelecionada] = useState<string>(
    varianteUrl || produto?.variantes[0]?.id || "",
  );

  if (!produto) throw notFound();

  const variante =
    produto.variantes.find((v) => v.id === selecionada) ?? produto.variantes[0] ?? null;
  const galeria = produto.galeria.length ? produto.galeria : [produto.imgPrincipal].filter(Boolean);

  function pedir() {
    if (!variante) return;
    adicionar(
      {
        id: produto!.id,
        titulo: produto!.titulo,
        vendor: produto!.vendor,
        vendorSlug: produto!.vendorSlug,
      },
      {
        id: variante.id,
        produtoId: produto!.id,
        variante: variante.variante,
        preco: variante.preco,
        precoTexto: variante.precoTexto,
        img: variante.img || produto!.imgPrincipal,
      },
    );
    toast.success(`${produto!.titulo} — ${variante.variante} adicionado ao carrinho`);
  }

  return (
    <div className="maincontainer">
      <FaixaVendedor
        vendedor={vendedor}
        reviewsHref={`/product.php?vendor=${encodeURIComponent(produto.vendor)}&product=${encodeURIComponent(
          produto.produto,
        )}#comments`}
      />

      <section className="product4-card">
        <div className="product-image-container">
          <center>
            <img
              src={`/${produto.imgPrincipal}`}
              alt={`${produto.vendor} | Black Market 2026`}
              className="product-header"
            />
          </center>
        </div>

        {produto.descricao ? (
          <p className="product-description">
            {produto.descricao.split("\n").map((linha, i) => (
              <span key={i}>
                {linha}
                <br />
              </span>
            ))}
          </p>
        ) : null}

        <section className="features-card2">
          <div className="product-image-container">
            <center>
              {galeria.map((imagem) => (
                <div className="container1" key={imagem}>
                  <a href={`/${imagem}`} target="_blank" rel="noreferrer">
                    <img
                      src={`/${imagem}`}
                      alt={`${produto.titulo} | Black Market 2026`}
                      width={250}
                    />
                  </a>
                </div>
              ))}
            </center>
          </div>

          <div className="feature-item">
            <div className="product-action">
              <select
                name="add"
                className="product-select"
                value={selecionada}
                onChange={(event) => setSelecionada(event.target.value)}
              >
                {produto.variantes.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.variante} {v.precoAntigo ? `(${v.precoAntigo})` : ""} por {v.precoTexto}
                  </option>
                ))}
              </select>
              <br />
              <button type="button" className="btn-buy2" onClick={pedir}>
                PEDIR
              </button>
              <div style={{ marginTop: "10px" }}>
                <Link to="/card.php" className="btn-rating">
                  VER CARRINHO
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>

      <br />
      <br />

      <section className="product4-card" id="comments">
        <div className="product-text">
          <h3 className="product-title">Comentários</h3>
          <div className="product-info-bar" />
        </div>

        {produto.comentarios.length === 0 ? (
          <p className="footnote">Nenhum comentário ainda.</p>
        ) : (
          produto.comentarios.map((comentario, i) => (
            <label htmlFor={`fname-${i}`} key={`${comentario.autor}-${i}`}>
              {comentario.autor}
              <p className="product-description2">
                {comentario.data}
                <br />
              </p>
              <section className="features-card2">
                <div className="feature-item">
                  <center>
                    <img src="/pic/5star.png" width={100} alt="5 estrelas" />
                  </center>
                  <br />
                  {comentario.corpo}
                </div>
                <div className="features-grid">
                  <p className="footnote">
                    <img src="/pic/verified.png" className="verfiedpic" alt="verificado" /> Compra
                    confirmada
                    <br />
                    {comentario.compra}
                  </p>
                </div>
              </section>
            </label>
          ))
        )}

        <center>
          <Link
            to="/product.php"
            search={{
              vendor: produto.vendor,
              product: produto.produto,
              variante: varianteUrl,
            }}
            hash="comments"
            className="btn-rating"
          >
            Ver todas
          </Link>
        </center>
      </section>
    </div>
  );
}
