import { Link } from "@tanstack/react-router";
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
  const para = `/product.php?vendor=${encodeURIComponent(produto.vendor)}&product=${encodeURIComponent(
    produto.produto,
  )}&variante=${encodeURIComponent(variante.id)}`;

  return (
    <div className="product-card2">
      <div className="card-header2">
        <Link to={para}>
          <img
            src={`/${variante.img || produto.imgPrincipal}`}
            alt={produto.titulo}
            className="cardimg"
          />
        </Link>
        <Link to={para}>
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
              {produto.envio}
            </center>
          </div>
        </p>
        <Link to={para} className="details-button2">
          DETAILS
        </Link>
      </div>
    </div>
  );
}
