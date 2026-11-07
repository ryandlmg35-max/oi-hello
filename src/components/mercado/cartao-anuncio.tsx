import { Link } from "@tanstack/react-router";
import { envioLimpo } from "@/lib/mercado";
import type { Produto, Variante } from "@/data/mercado/servidor";

type Props = {
  produto: Produto;
  variante: Variante;
};

/**
 * Cartao de anuncio do site original (card2.css -> .product-card2).
 * O link leva para a pagina do produto com a variante ja selecionada.
 */
export function CartaoAnuncio({ produto, variante }: Props) {
  // `to` + `search` (e nao query dentro do `to`): o router trata a query do
  // `to` como parte do pathname e a navegacao entre anuncios quebra.
  const destino = {
    to: "/product.php",
    search: {
      vendor: produto.vendor,
      product: produto.produto,
      variante: variante.id,
    },
  } as const;

  return (
    <div className="product-card2">
      <div className="card-header2">
        <Link {...destino}>
          <img
            src={`/${variante.img || produto.imgPrincipal}`}
            alt={produto.titulo}
            className="cardimg"
          />
        </Link>
        <Link {...destino}>
          <div className="floating-card-image">
            {produto.titulo}
            <br />
            {variante.variante}
          </div>
        </Link>
      </div>
      <div className="card-content2">
        <p>
          <div className="card__subtitle">
            <center>
              {variante.precoTexto}
              <br />
              {envioLimpo(produto.envio)}
            </center>
          </div>
        </p>
        <Link {...destino} className="details-button2">
          DETALHES
        </Link>
      </div>
    </div>
  );
}
