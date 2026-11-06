import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loja — Teste de conexão" },
      { name: "description", content: "Página básica de login e listagem de produtos da loja." },
      { property: "og:title", content: "Loja — Teste de conexão" },
      { property: "og:description", content: "Página básica de login e listagem de produtos da loja." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Produto = { id: string; nome: string; preco: number; estoque: number };

function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erroProdutos, setErroProdutos] = useState<string | null>(null);
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null),
    );
    supabase
      .from("produtos")
      .select("id, nome, preco, estoque")
      .order("criado_em")
      .then(({ data, error }) => {
        if (error) setErroProdutos(error.message);
        else setProdutos((data ?? []) as Produto[]);
      });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (modo === "cadastro") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { emailRedirectTo: window.location.origin, data: { nome } },
      });
      if (error) return setMsg(error.message);
      setMsg(data.session ? "Conta criada!" : "Verifique seu email para confirmar o cadastro.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) setMsg(error.message);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 640 }}>
      <h1>Loja</h1>

      <section>
        <h2>Conta</h2>
        {user ? (
          <p>
            Logado como {user.email}{" "}
            <button onClick={() => supabase.auth.signOut()}>Sair</button>
          </p>
        ) : (
          <form onSubmit={enviar}>
            {modo === "cadastro" && (
              <p>
                <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </p>
            )}
            <p>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </p>
            <p>
              <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} />
            </p>
            <button type="submit">{modo === "login" ? "Entrar" : "Cadastrar"}</button>{" "}
            <button type="button" onClick={() => setModo(modo === "login" ? "cadastro" : "login")}>
              {modo === "login" ? "Criar conta" : "Já tenho conta"}
            </button>
            {msg && <p>{msg}</p>}
          </form>
        )}
      </section>

      <section>
        <h2>Produtos</h2>
        {erroProdutos ? (
          <p>Erro: {erroProdutos}</p>
        ) : produtos.length === 0 ? (
          <p>Nenhum produto.</p>
        ) : (
          <ul>
            {produtos.map((p) => (
              <li key={p.id}>
                {p.nome} — R$ {Number(p.preco).toFixed(2)} ({p.estoque} em estoque)
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
