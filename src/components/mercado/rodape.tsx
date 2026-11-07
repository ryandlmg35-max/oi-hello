import { Link } from "@tanstack/react-router";

export function Rodape() {
  return (
    <>
      <nav className="footer-nav">
        <ul>
          <li>
            <Link to="/escrow-overview.php">Escrow</Link>
          </li>
          <li>
            <Link to="/account.php">My Orders</Link>
          </li>
          <li>
            <Link to="/login.php" search={{ redirect: "/account.php" }}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/status.php">Order Status</Link>
          </li>
          <li>
            <Link to="/contact.php">Contact</Link>
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
