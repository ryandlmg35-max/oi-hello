import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/escrow-overview.php")({
  head: () => ({
    meta: [
      { title: "Escrow | Black Market 2026" },
      {
        name: "description",
        content: "Escrow MultiSig: o pagamento fica travado até a entrega ser confirmada.",
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
            O que é o Escrow?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, textAlign: "left" }}>
            <strong style={{ color: "rgba(255,255,255,0.85)" }}>Negociação segura:</strong> o escrow
            funciona como um terceiro neutro que segura o Bitcoin até você conferir o produto. Isso
            evita fraude: nós recebemos o pagamento só depois que você confirma o produto.
          </p>

          <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "16px", textAlign: "left" }}>
            <strong>Como funciona:</strong>
          </p>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
            <li
              style={{
                padding: "6px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              → <strong style={{ color: "rgba(255,255,255,0.8)" }}>1. Bloqueio:</strong> o Bitcoin
              fica guardado em um cofre seguro.
            </li>
            <li
              style={{
                padding: "6px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              → <strong style={{ color: "rgba(255,255,255,0.8)" }}>2. Envio:</strong> nós postamos o
              produto.
            </li>
            <li style={{ padding: "6px 0", color: "rgba(255,255,255,0.6)" }}>
              → <strong style={{ color: "rgba(255,255,255,0.8)" }}>3. Liberação:</strong> recebido e
              conferido por você, o valor é liberado.
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
            Por que o nosso Escrow?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            Nossa provedora dedicada atua como terceiro independente e segura o pagamento até todas
            as responsabilidades da transação serem cumpridas. O dinheiro fica 100% isolado em um
            sistema dedicado e seguro.
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginTop: "14px" }}>
            <li
              style={{
                padding: "8px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ color: "#e91e63", fontWeight: 600 }}>100% Protegido por Escrow:</span>{" "}
              gestão de carteira automatizada e segura.
            </li>
            <li
              style={{
                padding: "8px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ color: "#e91e63", fontWeight: 600 }}>Anonimato máximo:</span> Sem
              JavaScript. Sem cadastro. Sem rastreamento.
            </li>
            <li
              style={{
                padding: "8px 0",
                color: "rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ color: "#e91e63", fontWeight: 600 }}>Estoque próprio:</span> todos os
              produtos são do nosso próprio estoque.
            </li>
          </ul>

          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: "14px" }}>
            Todas as transações são cobertas até R$ 270.000,00. Todo o estoque é respaldado pelo
            nosso fundo de garantia próprio de R$ 270.000,00.
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
            Como funciona (passo a passo)
          </h2>
          <ol style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, paddingLeft: "1.2em" }}>
            <li>Faça seu pedido.</li>
            <li>O sistema gera um endereço de Escrow único, ligado ao ID do seu pedido.</li>
            <li>Deposite o valor exato na carteira informada.</li>
            <li>O pedido confirma automaticamente após 2 confirmações de rede.</li>
            <li>Postamos o produto em até 10 dias.</li>
            <li>Receba o produto e confirme a entrega.</li>
            <li>O valor é liberado.</li>
            <li>Deixe sua avaliação do produto.</li>
          </ol>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            O prazo do Escrow expira em 10 dias; nesse ponto o valor é transferido automaticamente.
            Abrir uma disputa estende o período até a resolução.
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
            E se eu não receber meu pedido?
          </h2>
          <ol style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, paddingLeft: "1.2em" }}>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Cancele o pedido:</strong> se a
              entrega não for confirmada, o valor é devolvido na hora.
            </li>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Disputa automática:</strong> se o
              pedido for marcado como &quot;Enviado&quot; e não chegar, uma disputa abre.
            </li>
            <li>
              <strong style={{ color: "rgba(255,255,255,0.85)" }}>Resolução:</strong> disputas são
              resolvidas em até 48 horas.
            </li>
          </ol>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item" style={{ textAlign: "center" }}>
          <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
            VER MEDICAL / DRUGS
          </Link>
        </div>
      </section>
    </div>
  );
}
