import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/auth-context";
import { useCarrinho } from "@/features/carrinho/carrinho-context";
import { criarPedido } from "@/features/pedidos/pedidos";
import { enderecoEscrow, formatarBrl, formatarCrypto } from "@/lib/mercado";

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
  pagamento: z.enum(["BTC", "ETH"]),
  observacoes: z.string().optional(),
});

type Erros = Partial<Record<keyof z.infer<typeof esquema>, string>>;

export const Route = createFileRoute("/checkout.php")({
  head: () => ({
    meta: [
      { title: "Checkout | Black Market 2026" },
      { name: "description", content: "Checkout protegido por escrow MultiSig." },
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
  const [pedido, setPedido] = useState<{ id: string; chave: string } | null>(null);

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
    pagamento: "BTC" as "BTC" | "ETH",
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
            Entre na sua conta para gerar o endereço de escrow e finalizar o pedido.
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
    const endereco = enderecoEscrow(pedido.id, form.pagamento);
    return (
      <main className="checkout-page">
        <div className="checkout-card">
          <h1 className="checkout-heading">Pedido criado</h1>

          <div className="status-box awaiting">
            <div className="status-label">Aguardando pagamento</div>
            <div className="status-value">
              {formatarBrl(subtotal)} — {formatarCrypto(subtotal, form.pagamento)}
            </div>
          </div>

          <div className="wallet-box">
            <div className="key-label">Endereço escrow ({form.pagamento})</div>
            <div className="key-value">{endereco}</div>
            <p className="info-text">
              Envie o valor exato para o endereço. O pedido confirma automaticamente após 2
              confirmações de rede.
            </p>
          </div>

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
            Clone de estudo: endereço de escrow e valores são simulados, nenhuma transação real é
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

    setPedido({ id: resultado.id, chave: resultado.chave ?? "" });
    limpar();
    toast.success("Pedido criado — endereço de escrow gerado");
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
            onChange={(e) => setForm({ ...form, pagamento: e.target.value as "BTC" | "ETH" })}
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
          </select>
        </div>

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
                  <div className="vendor-label">{item.vendor}</div>
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
          <div className="amount-crypto">{formatarCrypto(subtotal, form.pagamento)}</div>
          <span className="escrow-badge">
            <img src="/pic/verified.png" alt="verificado" /> Escrow MultiSig — 10 dias
          </span>
        </div>

        {erro ? <div className="notice-box">{erro}</div> : null}

        <div className="form-actions">
          <button type="submit" className="btn-buy2" disabled={enviando}>
            {enviando ? "PROCESSANDO..." : "FINALIZAR PEDIDO (ESCROW)"}
          </button>
          <Link to="/card.php" className="btn-outline">
            Voltar ao carrinho
          </Link>
        </div>

        <p className="disclaimer">
          Clone de estudo: nenhum pagamento real é processado. O endereço de escrow é gerado a
          partir do id do pedido.
        </p>
      </form>
    </main>
  );
}
