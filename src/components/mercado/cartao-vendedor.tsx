import { Link } from "@tanstack/react-router";
import type { Vendedor } from "@/data/mercado/servidor";

type Props = {
  vendedor: Vendedor;
  destaque?: boolean;
};

/** Cartao de vendedor do site original (card2.css -> .product-card). */
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
        <p>
          {vendedor.nivel}{" "}
          {destaque ? (
            <img src="/pic/verified.png" className="verfiedpic" alt="verificado" />
          ) : null}
        </p>
        <p>{vendedor.envio}</p>
        {vendedor.ativo ? (
          <div className="vendor-active-badge">
            <span className="active-dot" />
            Vendor Active
          </div>
        ) : null}
        {vendedor.vendas > 0 ? (
          <div className="vendor-orders-count">
            {vendedor.vendas.toLocaleString("en-US")} orders completed
          </div>
        ) : null}
        <Link to={para} className="details-button2">
          DETAILS
        </Link>
      </div>
    </div>
  );
}
