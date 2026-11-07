import { createFileRoute, Link } from "@tanstack/react-router";
import { useCarrinho } from "@/features/carrinho/carrinho-context";
import { formatarBrl, formatarCrypto } from "@/lib/mercado";

export const Route = createFileRoute("/card.php")({
  head: () => ({
    meta: [
      { title: "Carrinho | Black Market 2026" },
      {
        name: "description",
        content: "Seu carrinho — revise os itens e siga para o checkout protegido por escrow.",
      },
    ],
  }),
  component: PaginaCarrinho,
});

function PaginaCarrinho() {
  const { itens, subtotal, definirQuantidade, remover, totalItens } = useCarrinho();

  if (itens.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-card cart-empty">
          <h1 className="checkout-heading">Seu carrinho</h1>
          <img src="/pic/logo.png" width={180} alt="Carrinho" />
          <p className="info-text">Seu carrinho está vazio.</p>
          <Link to="/cat.php" search={{ cat: "drugs" }} className="btn-rating">
            Continuar comprando
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-heading">Seu carrinho</h1>
        <p className="info-text">
          {totalItens} {totalItens === 1 ? "item" : "itens"} — protegido por escrow até a entrega.
        </p>

        {itens.map((item) => (
          <div className="cart-item" key={item.varianteId}>
            <img src={`/${item.img}`} className="picture" alt={item.nome} />

            <div className="cart-info">
              <div className="cart-name">{item.nome}</div>
              <div className="cart-meta">
                <span className="altext">
                  <img src="/pic/verified.png" alt="verificado" /> Escrow
                </span>
                <span className="cart-country">{item.variante}</span>
              </div>
            </div>

            <div className="cart-side">
              <div className="cart-price">
                <span className="price-new">{formatarBrl(item.preco * item.quantidade)}</span>
              </div>

              <label className="cart-qty">
                Qtd
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={item.quantidade}
                  onChange={(event) =>
                    definirQuantidade(item.varianteId, Math.max(1, Number(event.target.value) || 1))
                  }
                />
              </label>

              <button type="button" className="btn-rating" onClick={() => remover(item.varianteId)}>
                Remover
              </button>
            </div>
          </div>
        ))}

        <hr id="grad1" />

        <div className="checkout-total">
          <div className="amount-usd">{formatarBrl(subtotal)}</div>
          <div className="amount-crypto">{formatarCrypto(subtotal, "BTC")}</div>
          <span className="escrow-badge">
            <img src="/pic/verified.png" alt="verificado" /> Protegido por escrow
          </span>
        </div>

        <div className="cart-actions">
          <Link to="/cat.php" search={{ cat: "drugs" }} className="btn-rating">
            Continuar comprando
          </Link>
          <Link to="/checkout.php" className="btn-buy2">
            FINALIZAR
          </Link>
        </div>

        <p className="cart-hint">
          O valor fica travado no escrow MultiSig e é liberado só depois que você confirma a
          entrega.
        </p>
      </div>
    </main>
  );
}
