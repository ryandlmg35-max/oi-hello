import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/auth-context";
import { atualizarMeuPerfil, buscarMeuPerfil, listarMeusPedidos } from "@/features/pedidos/pedidos";
import { formatarDataHora, formatarBrl, statusDoPedido } from "@/lib/mercado";

export const Route = createFileRoute("/account.php")({
  head: () => ({
    meta: [
      { title: "Meus Pedidos | Black Market 2026" },
      { name: "description", content: "Pedidos da sua conta e status do escrow." },
    ],
  }),
  component: PaginaConta,
});

function PaginaConta() {
  const { user, loading, signOut } = useAuth();
  const [nome, setNome] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const pedidos = useQuery({
    queryKey: ["pedidos", user?.id],
    queryFn: listarMeusPedidos,
    enabled: !!user,
  });

  const perfil = useQuery({
    queryKey: ["perfil", user?.id],
    queryFn: () => buscarMeuPerfil(user!.id),
    enabled: !!user,
  });

  if (loading) {
    return (
      <main className="checkout-page">
        <div className="checkout-card">
          <h1 className="checkout-heading">Meus Pedidos</h1>
          <p className="info-text">Verificando sessão...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="checkout-page">
        <div className="checkout-card cart-empty">
          <h1 className="checkout-heading">Meus Pedidos</h1>
          <img src="/pic/logo.png" width={180} alt="Conta" />
          <p className="info-text">Entre para ver seus pedidos e o status do escrow.</p>
          <Link to="/login.php" search={{ redirect: "/account.php" }} className="btn-rating">
            ENTRAR
          </Link>
        </div>
      </main>
    );
  }

  async function salvarPerfil(event: FormEvent) {
    event.preventDefault();
    if (!user || !nome) return;
    setSalvando(true);
    const resultado = await atualizarMeuPerfil(user.id, nome);
    setSalvando(false);
    if (!resultado.ok) {
      toast.error(resultado.mensagem);
      return;
    }
    toast.success("Perfil atualizado");
    await perfil.refetch();
  }

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-heading">Meus Pedidos</h1>

        <table className="summary-table">
          <tbody>
            <tr>
              <td>
                <div className="summarydescription">E-Mail</div>
              </td>
              <td>
                <div className="summarydescription2">{user.email}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="summarydescription">Membro desde</div>
              </td>
              <td>
                <div className="summarydescription2">{formatarDataHora(user.created_at)}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <form className="form-group" onSubmit={salvarPerfil}>
          <label htmlFor="nome">Nome de exibição</label>
          <input
            id="nome"
            value={nome ?? perfil.data?.nome ?? ""}
            onChange={(e) => setNome(e.target.value)}
            placeholder={perfil.data?.nome ?? "seu nome"}
          />
          <div className="form-actions">
            <button type="submit" className="btn-rating" disabled={salvando}>
              {salvando ? "SALVANDO..." : "SALVAR"}
            </button>
            <button type="button" className="btn-outline" onClick={() => void signOut()}>
              SAIR
            </button>
          </div>
        </form>

        <hr id="grad1" />

        {pedidos.isLoading ? <p className="info-text">Carregando pedidos...</p> : null}

        {pedidos.data?.length === 0 ? <p className="info-text">Nenhum pedido ainda.</p> : null}

        {pedidos.data?.map((pedido) => {
          const status = statusDoPedido(pedido.status);
          return (
            <div key={pedido.id} className="cart-item" style={{ display: "block" }}>
              <div className="cart-info">
                <div className="cart-vendor">{pedido.id.slice(0, 8)}</div>
                <div className="cart-name">{formatarBrl(Number(pedido.valor_total))}</div>
                <div className="cart-meta">
                  <span className="altext">
                    <img src="/pic/verified.png" alt="verificado" /> {status.rotulo}
                  </span>
                  <span className="cart-country">{formatarDataHora(pedido.criado_em)}</span>
                  <span className="cart-country">{pedido.moeda ?? "BTC"}</span>
                </div>
                <table className="summary-table" style={{ marginTop: "8px" }}>
                  <tbody>
                    {pedido.pedido_itens.map((item) => (
                      <tr key={`${item.produto_id}-${item.variante_id ?? item.produto_nome}`}>
                        <td>
                          <div className="vendor-label">{item.vendedor ?? ""}</div>
                          <div className="summarydescription">{item.produto_nome ?? ""}</div>
                          <div className="summarydescription2">
                            {item.variante ?? ""} · Qtd {item.quantidade}
                          </div>
                        </td>
                        <td>
                          <div className="summarydescription">
                            {formatarBrl(Number(item.preco_unitario) * item.quantidade)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="secret-box" style={{ marginTop: "10px" }}>
                  <div className="key-label">Chave secreta</div>
                  <div className="key-value">{pedido.chave_secreta ?? "—"}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
