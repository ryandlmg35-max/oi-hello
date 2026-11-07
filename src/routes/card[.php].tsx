import { createFileRoute, Link } from "@tanstack/react-router";
import { useCarrinho } from "@/features/carrinho/carrinho-context";
import { formatarCrypto, formatarUsd } from "@/lib/mercado";

export const Route = createFileRoute("/card.php")({
  head: () => ({
    meta: [
      { title: "Cart | Black Market 2026" },
      {
        name: "description",
        content: "Your shopping cart — review items and proceed to escrow-protected checkout.",
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
          <h1 className="checkout-heading">Your Cart</h1>
          <img src="/pic/logo.png" width={180} alt="Cart" />
          <p className="info-text">Your cart is empty.</p>
          <Link to="/cat.php" search={{ cat: "drugs" }} className="btn-rating">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-heading">Your Cart</h1>
        <p className="info-text">
          {totalItens} item{totalItens === 1 ? "" : "s"} — escrow protected until delivery.
        </p>

        {itens.map((item) => (
          <div className="cart-item" key={item.varianteId}>
            <img src={`/${item.img}`} className="picture" alt={item.nome} />

            <div className="cart-info">
              <div className="cart-vendor">{item.vendor}</div>
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
                <span className="price-new">{formatarUsd(item.preco * item.quantidade)}</span>
              </div>

              <label className="cart-qty">
                Qty
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
                Remove
              </button>
            </div>
          </div>
        ))}

        <hr id="grad1" />

        <div className="checkout-total">
          <div className="amount-usd">{formatarUsd(subtotal)}</div>
          <div className="amount-crypto">{formatarCrypto(subtotal, "BTC")}</div>
          <span className="escrow-badge">
            <img src="/pic/verified.png" alt="verificado" /> Escrow protected
          </span>
        </div>

        <div className="cart-actions">
          <Link to="/cat.php" search={{ cat: "drugs" }} className="btn-rating">
            Continue Shopping
          </Link>
          <Link to="/checkout.php" className="btn-buy2">
            CHECKOUT
          </Link>
        </div>

        <p className="cart-hint">
          Funds are locked in MultiSig escrow and released after you confirm delivery.
        </p>
      </div>
    </main>
  );
}
