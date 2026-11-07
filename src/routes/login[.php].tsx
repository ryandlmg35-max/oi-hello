import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/features/auth/auth-context";

export const Route = createFileRoute("/login.php")({
  head: () => ({
    meta: [
      { title: "Entrar | Black Market 2026" },
      {
        name: "description",
        content: "Acesse sua conta para finalizar pedidos com custódia do site.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : "/account.php",
  }),
  component: PaginaLogin,
});

function PaginaLogin() {
  const { redirect } = Route.useSearch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: redirect });
  }, [loading, user, redirect, navigate]);

  async function enviar(event: FormEvent) {
    event.preventDefault();
    setMensagem(null);
    setEnviando(true);

    if (modo === "cadastro") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { emailRedirectTo: window.location.origin, data: { nome } },
      });
      setEnviando(false);
      if (error) {
        setMensagem(error.message);
        return;
      }
      setMensagem(
        data.session
          ? "Conta criada! Redirecionando..."
          : "Verifique seu email para confirmar o cadastro.",
      );
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setEnviando(false);
    if (error) {
      setMensagem(error.message);
      return;
    }
    navigate({ to: redirect });
  }

  return (
    <main className="checkout-page">
      <form className="checkout-card" onSubmit={enviar}>
        <h1 className="checkout-heading">{modo === "login" ? "Entrar" : "Criar conta"}</h1>

        {modo === "cadastro" ? (
          <div className="form-group">
            <label htmlFor="nome">Nome de usuário</label>
            <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {mensagem ? <div className="notice-box">{mensagem}</div> : null}

        <div className="form-actions">
          <button type="submit" className="btn-buy2" disabled={enviando}>
            {enviando ? "..." : modo === "login" ? "ENTRAR" : "CADASTRAR"}
          </button>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setModo(modo === "login" ? "cadastro" : "login");
              setMensagem(null);
            }}
          >
            {modo === "login" ? "Criar conta" : "Já tenho conta"}
          </button>
        </div>

        <p className="cart-hint">
          As contas ficam no Supabase do projeto. <Link to="/status.php">Status do pedido</Link> usa
          a mesma sessão.
        </p>
      </form>
    </main>
  );
}
