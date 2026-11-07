import { Link } from "@tanstack/react-router";

/** Faixa de escrow do site original (card2.css -> .escrow-promo). */
export function PromoEscrow() {
  return (
    <section className="escrow-promo" aria-label="MultiSig Escrow">
      <Link to="/escrow-overview.php" className="escrow-promo-icon">
        <img src="/pic/becomevendor.png" width={64} height={64} alt="Escrow" />
      </Link>
      <div className="escrow-promo-body">
        <h3 className="escrow-promo-title">
          Dedicated <span>MultiSig</span> Escrow System
        </h3>
        <p className="escrow-promo-text">
          Your funds stay locked in escrow until your order arrives. Learn more about our market
          security.
        </p>
        <div className="escrow-promo-chips">
          <span className="escrow-chip">MultiSig Protected</span>
          <span className="escrow-chip">10 Days Escrow</span>
          <span className="escrow-chip">BTC & ETH</span>
        </div>
        <Link to="/escrow-overview.php" className="details-button2">
          DETAILS
        </Link>
      </div>
    </section>
  );
}
