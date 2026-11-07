import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { buscarPedidoPorChave } from "@/data/mercado/servidor";
import { useAuth } from "@/features/auth/auth-context";
import { listarMeusPedidos, type Pedido } from "@/features/pedidos/pedidos";
import { formatarCrypto, formatarDataHora, formatarUsd, statusDoPedido } from "@/lib/mercado";

export const Route = createFileRoute("/status.php")({
  head: () => ({
    meta: [
      { title: "Order Status | Black Market 2026" },
      {
        name: "description",
        content: "Consulte o status do seu pedido pelo Order ID e Secret Key.",
      },
    ],
  }),
  component: PaginaStatus,
});

function PaginaStatus() {
  const { user, loading } = useAuth();
  const [orderId, setOrderId] = useState("");
  const [chave, setChave] = useState("");
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);

  async function consultar(event: FormEvent) {
    event.preventDefault();
    setAviso(null);
    setPedido(null);
    setBuscando(true);

    // 1) servidor: id + chave secreta (service role, quando existir no runtime)
    const resposta = await buscarPedidoPorChave({
      data: { id: orderId.trim(), chave: chave.trim() },
    });
    if (resposta.pedido) {
      setPedido(resposta.pedido as Pedido);
      setBuscando(false);
      return;
    }

    // 2) sessão do dono do pedido (RLS do projeto)
    if (user) {
      const meus = await listarMeusPedidos();
      const achado = meus.find((p) => p.id === orderId.trim());
      if (achado && (!chave.trim() || achado.chave_secreta === chave.trim())) {
        setPedido(achado);
        setBuscando(false);
        return;
      }
    }

    setAviso(
      resposta.disponivel
        ? "Order not found — check the Order ID and Secret Key."
        : "Order lookup by secret key requires the server service role. Log in with the account that created the order.",
    );
    setBuscando(false);
  }

  return (
    <main className="checkout-page">
      <form className="checkout-card" onSubmit={consultar}>
        <h1 className="checkout-heading">Order Status</h1>

        <div className="form-group">
          <label htmlFor="order-id">Order ID</label>
          <input
            id="order-id"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="uuid do pedido"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="secret">Secret Key</label>
          <input
            id="secret"
            value={chave}
            onChange={(e) => setChave(e.target.value)}
            placeholder="chave de 12 caracteres"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-buy2" disabled={buscando || loading}>
            {buscando ? "CHECKING..." : "CHECK STATUS"}
          </button>
          {!user ? (
            <Link to="/login.php" search={{ redirect: "/status.php" }} className="btn-outline">
              LOGIN
            </Link>
          ) : null}
        </div>

        {aviso ? <div className="notice-box">{aviso}</div> : null}

        {pedido ? (
          <>
            <hr id="grad1" />
            <div className={`status-box ${statusDoPedido(pedido.status).classe}`}>
              <div className="status-label">{statusDoPedido(pedido.status).rotulo}</div>
              <div className="status-value">
                {formatarUsd(Number(pedido.valor_total))} ·{" "}
                {formatarCrypto(
                  Number(pedido.valor_total),
                  (pedido.moeda as "BTC" | "ETH") ?? "BTC",
                )}
              </div>
            </div>

            <table className="summary-table">
              <tbody>
                <tr>
                  <td>
                    <div className="summarydescription">Order ID</div>
                  </td>
                  <td>
                    <div className="summarydescription2">{pedido.id}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="summarydescription">Created</div>
                  </td>
                  <td>
                    <div className="summarydescription2">{formatarDataHora(pedido.criado_em)}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="summarydescription">Payment</div>
                  </td>
                  <td>
                    <div className="summarydescription2">
                      {pedido.pagamento ?? "—"} {pedido.moeda ?? ""}
                    </div>
                  </td>
                </tr>
                {pedido.pedido_itens.map((item) => (
                  <tr key={`${item.produto_id}-${item.variante_id ?? item.produto_nome}`}>
                    <td>
                      <div className="vendor-label">{item.vendedor ?? ""}</div>
                      <div className="summarydescription">{item.produto_nome ?? ""}</div>
                      <div className="summarydescription2">
                        {item.variante ?? ""} · Qty {item.quantidade}
                      </div>
                    </td>
                    <td>
                      <div className="summarydescription">
                        {formatarUsd(Number(item.preco_unitario) * item.quantidade)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="secret-box">
              <div className="key-label">Secret key</div>
              <div className="key-value">{pedido.chave_secreta ?? "—"}</div>
            </div>
          </>
        ) : null}
      </form>
    </main>
  );
}
