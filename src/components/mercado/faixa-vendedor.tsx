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
            <h3 className="feature-title">Proteção Escrow</h3>
            <p className="feature-description">Sistema de pagamento 100% seguro*</p>
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
                {vendedor.vendas.toLocaleString("pt-BR")} vendas
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
              <img src="/pic/vendor.png" className="icon" alt="Vendedor" />
              <h3 className="feature-title">Vendedor</h3>
              <p className="feature-description">Vendedor registrado</p>
            </>
          )}
        </div>

        <div className="feature-item">
          <img src="/pic/ups.png" className="icon" alt="Envio" />
          <h3 className="feature-title">Envio Expresso</h3>
          <p className="feature-description">Mundial, com código de rastreio</p>
        </div>
      </div>
      <p className="footnote">*Todos os pagamentos ficam protegidos até o produto ser recebido.</p>
    </section>
  );
}
