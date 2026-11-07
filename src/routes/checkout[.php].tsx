import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/features/auth/auth-context";
import { useCarrinho } from "@/features/carrinho/carrinho-context";
import { criarPedido } from "@/features/pedidos/pedidos";
import {
  enderecoEscrow,
  formatarBrl,
  formatarCrypto,
  pixPayloadCopiaCola,
  ROTULO_FORMA,
  type FormaPagamento,
  type MoedaPagamento,
} from "@/lib/mercado";

const esquema = z.object({
  nome: z.string().min(3, "Informe seu nome completo"),
  email: z.string().email("E-mail invalido"),
  telefone: z.string().min(8, "Telefone invalido"),
  endereco: z.string().min(4, "Informe o endereco"),
  numero: z.string().min(1, "Numero obrigatorio"),
  complemento: z.string().optional(),
  cidade: z.string().min(2, "Informe a cidade"),
  pais: z.string().min(2, "Informe o pais"),
  cep: z.string().min(4, "CEP invalido"),
  pagamento: z.enum(["BTC", "ETH", "SOL", "PIX"]),
  observacoes: z.string().optional(),
});

type Erros = Partial<Record<keyof z.infer<typeof esquema>, string>>;

export const Route = createFileRoute("/checkout.php")({
  head: () => ({
    meta: [
      { title: "Checkout | Black Market 2026" },
      { name: "description", content: "Checkout com custódia MultiSig do site." },
    ],
  }),
  component: PaginaCheckout,
});

function PaginaCheckout() {
  const { user, loading } = useAuth();
  const { itens, subtotal, limpar } = useCarrinho();

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [erros, setErros] = useState<Erros>({});
  const [pedido, setPedido] = useState<{
    id: string;
    chave: string;
    modo?: "banco" | "local";
  } | null>(null);

  const [form, setForm] = useState({
    nome: user?.user_metadata?.["nome"] ?? "",
    email: user?.email ?? "",
    telefone: "",
    endereco: "",
    numero: "",
    complemento: "",
    cidade: "",
    pais: "Brasil",
    cep: "",
    pagamento: "BTC" as FormaPagamento,
    observacoes: "",
  });

  if (loading) {
    return (
      <main className="checkout-page">
        <div className="checkout-card">
          <h1 className="checkout-heading">Checkout</h1>
          <p className="info-text">Verificando sessão...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="checkout-page">
        <div className="checkout-card cart-empty">
          <h1 className="checkout-heading">Checkout</h1>
          <img src="/pic/logo.png" width={180} alt="Checkout" />
          <p className="info-text">
            Entre na sua conta para gerar o endereço de custódia e finalizar o pedido.
          </p>
          <div className="cart-actions">
            <Link to="/login.php" search={{ redirect: "/checkout.php" }} className="btn-rating">
              ENTRAR
            </Link>
            <Link to="/cat.php" search={{ cat: "drugs" }} className="btn-outline">
              Continuar comprando
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (pedido) {
    const ePix = form.pagamento === "PIX";
    const endereco = enderecoEscrow(form.pagamento);
    const codigoPix = ePix ? pixPayloadCopiaCola(subtotal) : "";
    return (
      <main className="checkout-page">
        <div className="checkout-card">
          <h1 className="checkout-heading">Pedido criado</h1>

          {pedido.modo === "local" ? (
            <div className="notice-box">
              Pedido registrado localmente neste navegador: o projeto Supabase ainda não tem as
              tabelas do mercado (migration 0001 pendente). O QR PIX, a chave secreta e o status
              funcionam normalmente — assim que a migration for aplicada, os novos pedidos vão
              direto para o banco.
            </div>
          ) : null}

          <div className="status-box awaiting">
            <div className="status-label">Aguardando pagamento</div>
            <div className="status-value">
              {ePix
                ? formatarBrl(subtotal)
                : `${formatarBrl(subtotal)} — ${formatarCrypto(subtotal, form.pagamento as MoedaPagamento)}`}
            </div>
          </div>

          {ePix ? (
            <div className="wallet-box">
              <div className="key-label">PIX — pague lendo o QR Code no app do banco</div>
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <QRCodeSVG
                  value={codigoPix}
                  size={190}
                  bgColor="#0d0d0d"
                  fgColor="#ffffff"
                  level="M"
                />
                <div className="key-value" style={{ marginTop: "10px" }}>
                  {formatarBrl(subtotal)}
                </div>
              </div>
              <div className="key-label">Copia e cola (código EMV)</div>
              <div className="key-value" style={{ wordBreak: "break-all" }}>
                {codigoPix}
              </div>
              <div className="cart-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    void navigator.clipboard?.writeText(codigoPix);
                    toast.success("Código PIX copiado");
                  }}
                >
                  COPIAR CÓDIGO PIX
                </button>
              </div>
              <p className="info-text">
                Pague o valor exato. Depois de pagar, mande o comprovante no suporte{" "}
                <a href="https://t.me/yuminnk" target="_blank" rel="noreferrer">
                  t.me/yuminnk
                </a>{" "}
                para confirmarmos e postar seu pedido.
              </p>
            </div>
          ) : (
            <div className="wallet-box">
              <div className="key-label">Endereço de custódia ({form.pagamento})</div>
              <div className="key-value">{endereco}</div>
              <p className="info-text">
                Envie o valor exato para o endereço. O pedido confirma automaticamente após 2
                confirmações de rede.
              </p>
            </div>
          )}

          {ePix ? (
            <div className="notice-box">
              PIX é menos anônimo que cripto: a transferência sai registrada com seus dados
              bancários e não passa pela custódia automática — quem paga por PIX assume o risco. A
              confirmação é manual, pelo suporte, e o reembolso automático de 10 dias se aplica só a
              pedidos pagos com cripto.
            </div>
          ) : null}

          <div className="secret-box">
            <div className="key-label">Chave secreta (use no Status do Pedido)</div>
            <div className="key-value">{pedido.chave}</div>
          </div>

          <table className="summary-table">
            <tbody>
              <tr>
                <td>
                  <div className="summarydescription">ID do Pedido</div>
                </td>
                <td>
                  <div className="summarydescription2">{pedido.id}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="summarydescription">Itens</div>
                </td>
                <td>
                  <div className="summarydescription2">{itens.length}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="cart-actions">
            <Link to="/status.php" className="btn-rating">
              STATUS DO PEDIDO
            </Link>
            <Link to="/account.php" className="btn-outline">
              MEUS PEDIDOS
            </Link>
          </div>

          <p className="disclaimer">
            Clone de estudo: endereço de custódia e valores são simulados, nenhuma transação real é
            executada.
          </p>
        </div>
      </main>
    );
  }

  if (itens.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-card cart-empty">
          <h1 className="checkout-heading">Checkout</h1>
          <img src="/pic/logo.png" width={180} alt="Checkout" />
          <p className="info-text">Seu carrinho está vazio.</p>
          <Link to="/cat.php" search={{ cat: "drugs" }} className="btn-rating">
            Continuar comprando
          </Link>
        </div>
      </main>
    );
  }

  async function enviar(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setErro(null);
    setErros({});

    const validado = esquema.safeParse(form);
    if (!validado.success) {
      const campos = validado.error.flatten().fieldErrors;
      const mapa: Erros = {};
      for (const [campo, mensagens] of Object.entries(campos)) {
        const primeiro = Array.isArray(mensagens) ? mensagens[0] : undefined;
        if (primeiro) mapa[campo as keyof Erros] = primeiro;
      }
      setErros(mapa);
      return;
    }

    setEnviando(true);
    const resultado = await criarPedido({
      usuarioId: user.id,
      nome: validado.data.nome,
      email: validado.data.email,
      endereco: {
        endereco: validado.data.endereco,
        numero: validado.data.numero,
        complemento: validado.data.complemento ?? "",
        cidade: validado.data.cidade,
        pais: validado.data.pais,
        cep: validado.data.cep,
        telefone: validado.data.telefone,
      },
      pagamento: validado.data.pagamento,
      moeda: validado.data.pagamento,
      observacoes: validado.data.observacoes ?? "",
      itens,
    });
    setEnviando(false);

    if (!resultado.ok) {
      setErro(resultado.mensagem);
      toast.error("Nao foi possivel criar o pedido");
      return;
    }

    setPedido({ id: resultado.id, chave: resultado.chave ?? "", modo: resultado.modo ?? "banco" });
    limpar();
    toast.success(
      form.pagamento === "PIX"
        ? "Pedido criado — pague via PIX no QR gerado"
        : "Pedido criado — endereço de custódia gerado",
    );
  }

  return (
    <main className="checkout-page">
      <form className="checkout-card" onSubmit={enviar}>
        <h1 className="checkout-heading">Checkout</h1>

        <div className="form-group">
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            name="nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
          {erros.nome ? <span className="info-text">{erros.nome}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          {erros.email ? <span className="info-text">{erros.email}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            required
          />
          {erros.telefone ? <span className="info-text">{erros.telefone}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input
            id="endereco"
            name="endereco"
            value={form.endereco}
            onChange={(e) => setForm({ ...form, endereco: e.target.value })}
            required
          />
          {erros.endereco ? <span className="info-text">{erros.endereco}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="numero">Número</label>
          <input
            id="numero"
            name="numero"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            required
          />
          {erros.numero ? <span className="info-text">{erros.numero}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="complemento">Complemento (opcional)</label>
          <input
            id="complemento"
            name="complemento"
            value={form.complemento}
            onChange={(e) => setForm({ ...form, complemento: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            name="cidade"
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            required
          />
          {erros.cidade ? <span className="info-text">{erros.cidade}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="pais">País</label>
          <input
            id="pais"
            name="pais"
            value={form.pais}
            onChange={(e) => setForm({ ...form, pais: e.target.value })}
            required
          />
          {erros.pais ? <span className="info-text">{erros.pais}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            name="cep"
            value={form.cep}
            onChange={(e) => setForm({ ...form, cep: e.target.value })}
            required
          />
          {erros.cep ? <span className="info-text">{erros.cep}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="pagamento">Forma de pagamento</label>
          <select
            id="pagamento"
            name="pagamento"
            value={form.pagamento}
            onChange={(e) => setForm({ ...form, pagamento: e.target.value as FormaPagamento })}
          >
            <option value="BTC">{ROTULO_FORMA.BTC}</option>
            <option value="ETH">{ROTULO_FORMA.ETH}</option>
            <option value="SOL">{ROTULO_FORMA.SOL}</option>
            <option value="PIX">{ROTULO_FORMA.PIX}</option>
          </select>
        </div>

        {form.pagamento === "PIX" ? (
          <div className="notice-box">
            Atenção: o PIX é uma forma a parte, sem custódia automática — quem paga por PIX assume o
            risco do pedido. Ele também é menos anônimo: o banco registra a transferência com os
            seus dados. A confirmação do pagamento é manual, pelo suporte.
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="observacoes">Observações (opcional)</label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={form.observacoes}
            onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
          />
        </div>

        <hr id="grad1" />

        <table className="summary-table">
          <tbody>
            {itens.map((item) => (
              <tr key={item.varianteId}>
                <td>
                  <div className="summarydescription">{item.nome}</div>
                  <div className="summarydescription2">
                    {item.variante} · Qtd {item.quantidade}
                  </div>
                </td>
                <td>
                  <div className="summarydescription">
                    {formatarBrl(item.preco * item.quantidade)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="checkout-total">
          <div className="amount-usd">{formatarBrl(subtotal)}</div>
          {form.pagamento === "PIX" ? (
            <>
              <div className="amount-crypto">pagamento direto via PIX</div>
              <span className="escrow-badge">
                <img src="/pic/verified.png" alt="aviso" /> Risco do comprador — confirmação manual
              </span>
            </>
          ) : (
            <>
              <div className="amount-crypto">{formatarCrypto(subtotal, form.pagamento)}</div>
              <span className="escrow-badge">
                <img src="/pic/verified.png" alt="verificado" /> Custódia MultiSig — 10 dias
              </span>
            </>
          )}
        </div>

        {erro ? <div className="notice-box">{erro}</div> : null}

        <div className="form-actions">
          <button type="submit" className="btn-buy2" disabled={enviando}>
            {enviando ? "PROCESSANDO..." : "FINALIZAR PEDIDO"}
          </button>
          <Link to="/card.php" className="btn-outline">
            Voltar ao carrinho
          </Link>
        </div>

        <p className="disclaimer">
          Clone de estudo: nenhum pagamento real é processado. As carteiras de cripto e a chave PIX
          são de recebimento do próprio site.
        </p>
      </form>
    </main>
  );
}
