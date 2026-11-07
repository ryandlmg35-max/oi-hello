import { Link } from "@tanstack/react-router";

export function Rodape() {
  return (
    <>
      <nav className="footer-nav">
        <ul>
          <li>
            <Link to="/escrow-overview.php">Segurança</Link>
          </li>
          <li>
            <Link to="/account.php">Meus Pedidos</Link>
          </li>
          <li>
            <Link to="/login.php" search={{ redirect: "/account.php" }}>
              Entrar
            </Link>
          </li>
          <li>
            <Link to="/status.php">Status do Pedido</Link>
          </li>
          <li>
            <Link to="/contact.php">Contato</Link>
          </li>
        </ul>
      </nav>
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <img src="/pic/logo.png" width={140} style={{ opacity: 0.5 }} alt="Black Market 2026" />
        </Link>
      </div>
      &nbsp;
    </>
  );
}
