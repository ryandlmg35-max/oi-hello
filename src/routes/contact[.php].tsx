import { createFileRoute } from "@tanstack/react-router";

const CHAVE_PGP_DEMO = `-----BEGIN PGP PUBLIC KEY BLOCK-----
mDMEaSJ+SxYJKwYBBAHaRw8BAQdAVU2CTMJ9fLMYjis8dUOyFQpFB0IAAhGWm7Yn
RBWLxcq0IFVzZXIgPHN1cHBvcnRAYmxhY2ttYXJrZXQuY2xvdWQ+iJkEExYKAEEW
IQS+A4J5wLSW1VqIOsEzfyHDZL9EhgUCaSJ+SwIbAwUJBaOagAULCQgHAgIiAgYV
CgkICwIEFgIDAQIeBwIXgAAKCRAzfyHDZL9Ehv8eAP4yPnKXQ2t3UyWlAqOdio/S
0spRNSEmnlEWMzqSusq+IwD/VPs1/92Yw5sUjBA/r5m/gZzx0gUKQFbgysPKLa4R
uAq4OARpIn5LEgorBgEEAZdVAQUBAQdA+zx+aMHdmukmm8ta0WHtiQvAtr5as+y2
l92vqCVRllUDAQgHiHgEGBYKACAWIQS+A4J5wLSW1VqIOsEzfyHDZL9EhgUCaSJ+
SwIbDAAKCRAzfyHDZL9Ehi0AAP96hVX46259AdIuSLtXQT0fwrWqJzFUOrcJrRV8
2uz2GAEA9jOK99BB/+HvfjWCubOGQAPGweLql0YgVFQAUVGYFwQ=
=FOc7
-----END PGP PUBLIC KEY BLOCK-----`;

export const Route = createFileRoute("/contact.php")({
  head: () => ({
    meta: [
      { title: "Contact | Black Market 2026" },
      { name: "description", content: "Fale com a equipe e pegue a chave PGP do mirror." },
    ],
  }),
  component: PaginaContato,
});

function PaginaContato() {
  return (
    <div className="maincontainer" style={{ textAlign: "left", maxWidth: "800px", width: "97%" }}>
      <section className="features-card">
        <div className="feature-item">
          <h2
            className="feature-title"
            style={{
              fontSize: "1.3rem",
              color: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "10px",
              marginBottom: "16px",
            }}
          >
            Questions?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Reach out to our team.</p>
          <p style={{ color: "rgba(255,255,255,0.85)", marginTop: "10px" }}>
            support@blackmarket.demo
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "18px" }}>Market PGP Key:</p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.72rem",
              lineHeight: 1.5,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            {CHAVE_PGP_DEMO}
          </pre>
          <p className="footnote">
            Mirror de estudo: chave e contato acima sao placeholders do clone, nao os contatos do
            mercado original.
          </p>
        </div>
      </section>
    </div>
  );
}
