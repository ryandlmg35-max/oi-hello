import { Link } from "@tanstack/react-router";
import { useCarrinho } from "@/features/carrinho/carrinho-context";
import { useAuth } from "@/features/auth/auth-context";

/**
 * Navegacao glass do site original (nav2.css).
 * Escopo do clone: apenas a categoria Medical / Drugs.
 */
export function Navegacao() {
  const { totalItens } = useCarrinho();
  const { user, signOut } = useAuth();

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <img src="/pic/logo.png" className="headerpic" alt="Black Market 2026" />
        </Link>
      </div>

      <nav className="sticky-nav">
        <input type="checkbox" id="nav-toggle" className="nav-toggle-checkbox" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          ☰
        </label>
        <ul>
          <li>
            <Link to="/" activeProps={{ className: "active" }}>
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/cat.php"
              search={{ cat: "drugs" }}
              activeProps={{ className: "specialactive" }}
            >
              Produtos
            </Link>
          </li>
          <li className="dropdown">
            <a href="#">Categorias</a>
            <ul className="dropdown-content">
              <li>
                <Link to="/cat.php" search={{ cat: "drugs" }}>
                  Medical / Drugs
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/status.php" activeProps={{ className: "active" }}>
              Status do Pedido
            </Link>
          </li>
          <li>
            <Link to="/escrow-overview.php" activeProps={{ className: "active" }}>
              Segurança
            </Link>
          </li>
          <li>
            <Link to="/card.php" activeProps={{ className: "active" }}>
              [{totalItens}] Carrinho
            </Link>
          </li>
          <li>
            {user ? (
              <>
                <Link to="/account.php" activeProps={{ className: "active" }}>
                  Conta
                </Link>
              </>
            ) : (
              <Link
                to="/login.php"
                search={{ redirect: "/account.php" }}
                activeProps={{ className: "active" }}
              >
                Entrar
              </Link>
            )}
          </li>
          {user ? (
            <li>
              <button
                type="button"
                className="btn-rating"
                style={{
                  padding: "8px 14px",
                  minHeight: 0,
                  border: "none",
                  background: "transparent",
                }}
                onClick={() => void signOut()}
              >
                Sair
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </>
  );
}
