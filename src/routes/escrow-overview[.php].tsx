import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/escrow-overview.php")({
  head: () => ({
    meta: [
      { title: "Escrow | Black Market 2026" },
      {
        name: "description",
        content: "MultiSig escrow: o pagamento fica travado até a entrega ser confirmada.",
      },
    ],
  }),
  component: PaginaEscrow,
});

function PaginaEscrow() {
  return (
    <div className="maincontainer" style={{ textAlign: "left", maxWidth: "800px", width: "97%" }}>
      <section className="features-card">
        <div className="feature-item" style={{ textAlign: "center", marginBottom: "28px" }}>
          <img
            src="/pic/becomevendor.png"
            alt="Escrow"
            style={{ width: "180px", maxWidth: "55vw", display: "block", margin: "0 auto 20px" }}
          />
          <h2
            className="feature-title"
            style={{
              fontSize: "1.4rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            What is Escrow?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, textAlign: "left" }}>
            <strong style={{ color: "rgba(255,255,255,0.85)" }}>Safe & Secure Trading:</strong>{" "}
            Escrow acts as a neutral third party that holds the Bitcoin until the buyer verifies the
            product. This prevents fraud, ensuring the seller gets paid and the buyer receives their
            product.
          </p>

          <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "16px", textAlign: "left" }}>
            <strong>How it works:</strong>
          </p>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
            <li
              style={{
                padding: "6px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              → <strong style={{ color: "rgba(255,255,255,0.8)" }}>1. Lock:</strong> Bitcoin is held
              in a secure vault.
            </li>
            <li
              style={{
                padding: "6px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              → <strong style={{ color: "rgba(255,255,255,0.8)" }}>2. Delivery:</strong> Seller
              sends the goods.
            </li>
            <li style={{ padding: "6px 0", color: "rgba(255,255,255,0.6)" }}>
              → <strong style={{ color: "rgba(255,255,255,0.8)" }}>3. Release:</strong> Once
              received and verified, funds are released to the seller.
            </li>
          </ul>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            Why Our Escrow?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            Our dedicated provider acts as an independent third party, holding payment until all
            transaction responsibilities are met. Funds are 100% isolated on a dedicated, secure
            system.
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginTop: "14px" }}>
            <li
              style={{
                padding: "8px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ color: "#e91e63", fontWeight: 600 }}>100% Escrow-Protected:</span>{" "}
              Automated and secure wallet management.
            </li>
            <li
              style={{
                padding: "8px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ color: "#e91e63", fontWeight: 600 }}>Maximum Anonymity:</span> No
              JavaScript. No Registration. No Tracking.
            </li>
            <li
              style={{
                padding: "8px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ color: "#e91e63", fontWeight: 600 }}>Verified Vendors Only:</span> We
              strictly enforce a &apos;Vendor Bond&apos; policy. Only sellers with a paid security
              bond are authorized to operate.
            </li>
          </ul>

          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "14px" }}>
            All transactions are secured up to $50,000. Every vendor maintains a mandatory $5,000
            security deposit. With 10 active sellers, our insurance pool totals $50,000 ($5,000 ×
            10).
          </p>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            How It Works (Step-by-Step)
          </h2>
          <ol style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, paddingLeft: "1.2em" }}>
            <li>Place your order.</li>
            <li>The system generates a unique Escrow address linked to your Order ID.</li>
            <li>Deposit the exact amount into the provided wallet.</li>
            <li>Order confirms automatically after 2 network confirmations.</li>
            <li>Seller ships the product within 10 days.</li>
            <li>Receive the goods and confirm delivery.</li>
            <li>Funds are released to the seller.</li>
            <li>Leave a product review.</li>
          </ol>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            The Escrow timeframe expires after 10 days, at which point funds are automatically
            transferred. Opening a dispute extends this period until a resolution is reached.
          </p>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            What if I do not receive my order?
          </h2>
          <ol style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, paddingLeft: "1.2em" }}>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Cancel the order:</strong> If
              delivery isn&apos;t confirmed, funds are refunded instantly.
            </li>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Automatic Dispute:</strong> If a
              seller marks an item "Shipped" but it doesn&apos;t arrive, a dispute opens.
            </li>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Resolution:</strong> Disputes are
              resolved within 48 hours.
            </li>
          </ol>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item" style={{ textAlign: "center" }}>
          <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
            BROWSE MEDICAL / DRUGS
          </Link>
        </div>
      </section>
    </div>
  );
}
