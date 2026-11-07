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
            <img src="/pic/becomevendor.png" className="icon" alt="Custódia" />
            <h3 className="feature-title">Compra Protegida</h3>
            <p className="feature-description">Custódia do site + reembolso automático*</p>
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
              </p>
              {reviewsHref ? (
                <a href={reviewsHref} className="btn-rating">
                  AVALIAÇÕES
                </a>
              ) : null}
            </>
          ) : (
            <>
              <img src="/pic/logo.png" className="icon" alt="Black Market 2026" />
              <h3 className="feature-title">Black Market 2026</h3>
              <p className="feature-description">Loja oficial</p>
            </>
          )}
        </div>

        <div className="feature-item">
          <img src="/pic/ups.png" className="icon" alt="Envio" />
          <h3 className="feature-title">Envio Direto</h3>
          <p className="feature-description">Nós mesmos enviamos, com código de rastreio</p>
        </div>
      </div>
      <p className="footnote">*Todos os pagamentos ficam protegidos até o produto ser recebido.</p>
    </section>
  );
}
