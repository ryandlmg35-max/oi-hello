import { Link } from "@tanstack/react-router";
import type { Vendedor } from "@/data/mercado/servidor";

type Props = {
  vendedor: Vendedor | null;
  /** Link do bloco "REVIEWS" (pagina do produto). */
  reviewsHref?: string;
};

/**
 * Faixa de tres blocos (escrow / vendedor / envio) usada nas paginas de
 * produto e de vendedor do site original.
 */
export function FaixaVendedor({ vendedor, reviewsHref }: Props) {
  return (
    <section className="features-card">
      <br />
      <div className="features-grid">
        <div className="feature-item">
          <Link to="/escrow-overview.php" className="headerlink">
            <img src="/pic/becomevendor.png" className="icon" alt="Escrow" />
            <h3 className="feature-title">Escrow Protection</h3>
            <p className="feature-description">100% Secure Payment System*</p>
          </Link>
        </div>

        <div className="feature-item">
          {vendedor ? (
            <>
              <img src={`/${vendedor.logo}`} className="icon" alt={vendedor.nome} />
              <h3 className="feature-title">{vendedor.nome}</h3>
              <p className="feature-description">
                <img src="/pic/5star.png" width={100} alt="5 estrelas" />
                <br />
                {vendedor.vendas.toLocaleString("en-US")} Sellings
                <br />
              </p>
              {reviewsHref ? (
                <a href={reviewsHref} className="btn-rating">
                  REVIEWS
                </a>
              ) : null}
            </>
          ) : (
            <>
              <img src="/pic/vendor.png" className="icon" alt="Vendor" />
              <h3 className="feature-title">Vendor</h3>
              <p className="feature-description">Registered seller</p>
            </>
          )}
        </div>

        <div className="feature-item">
          <img src="/pic/ups.png" className="icon" alt="Shipping" />
          <h3 className="feature-title">Express Shipping</h3>
          <p className="feature-description">Worldwide With Tracking ID</p>
        </div>
      </div>
      <p className="footnote">*All payments are protected until the product is received.</p>
    </section>
  );
}
