import { Link } from "@tanstack/react-router";

/** Faixa de escrow do site original (card2.css -> .escrow-promo). */
export function PromoEscrow() {
  return (
    <section className="escrow-promo" aria-label="Custódia MultiSig">
      <Link to="/escrow-overview.php" className="escrow-promo-icon">
        <img src="/pic/becomevendor.png" width={64} height={64} alt="Custódia" />
      </Link>
      <div className="escrow-promo-body">
        <h3 className="escrow-promo-title">
          <span>Custódia MultiSig</span> do próprio site
        </h3>
        <p className="escrow-promo-text">
          Seu dinheiro fica travado na custódia do site até o pedido chegar na sua mão. Saiba como
          funciona a segurança.
        </p>
        <div className="escrow-promo-chips">
          <span className="escrow-chip">Custódia MultiSig</span>
          <span className="escrow-chip">Custódia de 10 dias</span>
          <span className="escrow-chip">BTC, ETH, SOL ou PIX</span>
        </div>
        <Link to="/escrow-overview.php" className="details-button2">
          DETALHES
        </Link>
      </div>
    </section>
  );
}
