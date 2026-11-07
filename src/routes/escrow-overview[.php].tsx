import { createFileRoute, Link } from "@tanstack/react-router";

const CANAL = "https://t.me/yuminnk";

const PRAZOS = [
  {
    regiao: "Brasil",
    prazo: "2 a 5 dias úteis",
    nota: "Postagem com código de rastreio nacional, enviado junto com o pedido.",
  },
  {
    regiao: "América do Norte",
    prazo: "5 a 9 dias úteis",
    nota: "USA e Canadá. Envio discreto, registrado e rastreado ponta a ponta.",
  },
  {
    regiao: "Europa",
    prazo: "4 a 8 dias úteis",
    nota: "Embalagem neutra, despacho com rastreio internacional.",
  },
  {
    regiao: "América Latina",
    prazo: "5 a 10 dias úteis",
    nota: "Todas as cidades atendidas por coleta postal.",
  },
  {
    regiao: "Ásia e Oceania",
    prazo: "7 a 14 dias úteis",
    nota: "Rotas mais rápidas por tempo, com rastreio em todo o percurso.",
  },
];

const CUSTODIA = [
  "O valor depositado fica bloqueado no nosso cofre MultiSig até você confirmar que recebeu.",
  "Para liberar, são necessárias duas chaves: a nossa e a confirmação do comprador. Uma chave sozinha não move nada.",
  "O prazo da custódia é de 10 dias. Não confirmou? O valor volta automaticamente, sem burocracia.",
  "Nada do valor depositado é movido ou usado enquanto o pedido estiver aberto.",
];

const ENVIO = [
  "Postamos direto do nosso estoque — um único manuseio, do armário até o correio.",
  "Embalagem dupla, selada a vácuo, sem cheiro e sem qualquer identificação de remetente.",
  "Etiquetas neutras: nada no pacote aponta para o site.",
  "O código de rastreio chega para você quando a postagem é registrada, não antes (protocolo de segurança).",
  "Nenhum pedido é postado sem a conferência dupla do estoque e da embalagem.",
];

export const Route = createFileRoute("/escrow-overview.php")({
  head: () => ({
    meta: [
      { title: "Segurança | Black Market 2026" },
      {
        name: "description",
        content:
          "Segurança: estoque próprio, custódia MultiSig do site, prazos de entrega por continente e suporte direto no Telegram.",
      },
    ],
  }),
  component: PaginaSeguranca,
});

const COR_MENOR = "rgba(255,255,255,0.6)";
const COR_FORTE = "rgba(255,255,255,0.85)";

function PaginaSeguranca() {
  return (
    <div className="maincontainer" style={{ textAlign: "left", maxWidth: "800px", width: "97%" }}>
      <section className="features-card">
        <div className="feature-item" style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/pic/becomevendor.png"
            alt="Segurança"
            style={{ width: "180px", maxWidth: "55vw", display: "block", margin: "0 auto 20px" }}
          />
          <h2
            className="feature-title"
            style={{
              fontSize: "1.6rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            Segurança do Pedido
          </h2>
          <p style={{ color: COR_MENOR, lineHeight: 1.7 }}>
            Tudo aqui tem dono e rastro: os produtos saem do{" "}
            <strong style={{ color: COR_FORTE }}>nosso próprio estoque</strong>, o pagamento fica
            sob <strong style={{ color: COR_FORTE }}>custódia MultiSig do site</strong> e você
            acompanha cada passo até a entrega.
          </p>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            Custódia do seu valor
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {CUSTODIA.map((item, i) => (
              <li
                key={i}
                style={{
                  padding: "8px 0",
                  color: COR_MENOR,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                → {item}
              </li>
            ))}
          </ul>
          <p style={{ color: COR_MENOR, lineHeight: 1.7, marginTop: "14px" }}>
            Em caso de problema, é o próprio site que responde: você fala direto com a gente e
            resolve sem envolver ninguém de fora.
          </p>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            Como é feito o envio
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {ENVIO.map((item, i) => (
              <li
                key={i}
                style={{
                  padding: "8px 0",
                  color: COR_MENOR,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                → {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            Prazos de entrega por continente
          </h2>
          <table className="summary-table">
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>
                  <div className="summarydescription">Região</div>
                </td>
                <td style={{ width: "24%" }}>
                  <div className="summarydescription">Prazo</div>
                </td>
                <td>
                  <div className="summarydescription">Como chega</div>
                </td>
              </tr>
              {PRAZOS.map((linha) => (
                <tr key={linha.regiao}>
                  <td>
                    <div className="summarydescription2">{linha.regiao}</div>
                  </td>
                  <td>
                    <div className="summarydescription2">{linha.prazo}</div>
                  </td>
                  <td>
                    <div className="summarydescription2">{linha.nota}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            *Prazos contam a partir da postagem registrada. Feriados e fiscalização local podem
            estender a etapa final — o rastreio sempre mostra onde o pedido está.
          </p>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            E se eu não receber meu pedido?
          </h2>
          <ol style={{ color: COR_MENOR, lineHeight: 1.9, paddingLeft: "1.2em" }}>
            <li>
              <strong style={{ color: COR_FORTE }}>Reembolso automático:</strong> a entrega não
              confirmou em até 10 dias? O valor depositado volta na hora.
            </li>
            <li>
              <strong style={{ color: COR_FORTE }}>Caso automático:</strong> pedido marcado como
              enviado e não chegou? O caso abre sozinho, com todo o histórico do rastreio anexado.
            </li>
            <li>
              <strong style={{ color: COR_FORTE }}>Resolução:</strong> casos são resolvidos em até
              48 horas, direto no Telegram de suporte.
            </li>
          </ol>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            Suporte direto
          </h2>
          <p style={{ color: COR_MENOR, lineHeight: 1.7 }}>
            Fale direto com a equipe no Telegram: sem sistema de chamado, sem fila — tempo médio de
            resposta, minutos.
          </p>
          <p style={{ marginTop: "16px", textAlign: "center" }}>
            <a
              href={CANAL}
              target="_blank"
              rel="noreferrer"
              className="details-button2"
              style={{ display: "inline-block" }}
            >
              ABRIR SUPORTE NO TELEGRAM
            </a>
          </p>
          <p className="footnote">t.me/yuminnk é o único canal de suporte do site.</p>
        </div>
      </section>

      <section className="features-card">
        <div className="feature-item" style={{ textAlign: "center" }}>
          <Link to="/cat.php" search={{ cat: "drugs" }} className="details-button2">
            VER PRODUTOS
          </Link>
        </div>
      </section>
    </div>
  );
}
