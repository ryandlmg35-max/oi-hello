import { Link } from "@tanstack/react-router";
import type { Vendedor } from "@/data/mercado/servidor";

type Props = {
  vendedor: Vendedor;
  destaque?: boolean;
};

/** Cartao de colecao da loja (card2.css -> .product-card). */
export function CartaoVendedor({ vendedor, destaque = false }: Props) {
  const para = `/vendor.php?vendor=${encodeURIComponent(vendedor.nome)}`;

  return (
    <div className="product-card">
      <div className="card-header">
        <Link to={para}>
          <img src={`/${vendedor.capa}`} alt={vendedor.nome} className="background-image" />
        </Link>
        <Link to={para}>
          <img
            src={`/${vendedor.logo}`}
            alt={`${vendedor.nome} Logo`}
            className="floating-card-image"
          />
        </Link>
      </div>
      <div className="card-content">
        <h2>{vendedor.nome}</h2>
        {destaque ? <img src="/pic/verified.png" className="verfiedpic" alt="verificado" /> : null}
        <Link to={para} className="details-button2">
          DETALHES
        </Link>
      </div>
    </div>
  );
}
