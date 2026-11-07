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
          Sistema de <span>Escrow MultiSig</span> Dedicado
        </h3>
        <p className="escrow-promo-text">
          Seu dinheiro fica travado no escrow até o pedido chegar. Saiba mais sobre a segurança do
          nosso mercado.
        </p>
        <div className="escrow-promo-chips">
          <span className="escrow-chip">Protegido por MultiSig</span>
          <span className="escrow-chip">Escrow de 10 dias</span>
          <span className="escrow-chip">BTC e ETH</span>
        </div>
        <Link to="/escrow-overview.php" className="details-button2">
          DETALHES
        </Link>
      </div>
    </section>
  );
}
