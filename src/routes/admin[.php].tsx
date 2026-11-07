import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { mercadoSupabase as supabase } from "@/data/mercado/client";
import { useAuth } from "@/features/auth/auth-context";
import { formatarBrl } from "@/lib/mercado";

type LinhaProduto = {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  vendedor: string | null;
  categoria: string | null;
};

type LinhaVariante = {
  id: string;
  produto_id: string;
  variante: string;
  preco: number;
};

export const Route = createFileRoute("/admin.php")({
  head: () => ({
    meta: [
      { title: "Admin | Black Market 2026" },
      { name: "description", content: "Gestão de anúncios e variantes (admin)." },
    ],
  }),
  component: PaginaAdmin,
});

function PaginaAdmin() {
  const { user, loading, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const [preco, setPreco] = useState<Record<string, string>>({});
  const [estoque, setEstoque] = useState<Record<string, string>>({});
  const [precoVariante, setPrecoVariante] = useState<Record<string, string>>({});

  const produtos = useQuery({
    queryKey: ["admin", "produtos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("id, nome, preco, estoque, vendedor, categoria")
        .neq("categoria", "arquivados")
        .order("nome");
      if (error) throw new Error(error.message);
      return (data ?? []) as LinhaProduto[];
    },
    enabled: !!user && isAdmin,
  });

  const variantes = useQuery({
    queryKey: ["admin", "variantes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos_variantes")
        .select("id, produto_id, variante, preco")
        .order("ordem");
      if (error) throw new Error(error.message);
      return (data ?? []) as LinhaVariante[];
    },
    enabled: !!user && isAdmin,
  });

  const salvarProduto = useMutation({
    mutationFn: async (linha: LinhaProduto) => {
      const { error } = await supabase
        .from("produtos")
        .update({
          preco: Number(preco[linha.id] ?? linha.preco),
          estoque: Number(estoque[linha.id] ?? linha.estoque),
        })
        .eq("id", linha.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Anúncio atualizado");
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (erro: Error) => toast.error(erro.message),
  });

  const salvarVariante = useMutation({
    mutationFn: async (linha: LinhaVariante) => {
      const { error } = await supabase
        .from("produtos_variantes")
        .update({ preco: Number(precoVariante[linha.id] ?? linha.preco) })
        .eq("id", linha.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Variante atualizada");
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (erro: Error) => toast.error(erro.message),
  });

  const removerProduto = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("produtos").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      toast.success("Anúncio removido");
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (erro: Error) => toast.error(erro.message),
  });

  if (loading) {
    return (
      <main className="checkout-page">
        <div className="checkout-card">
          <h1 className="checkout-heading">Admin</h1>
          <p className="info-text">Verificando sessão...</p>
        </div>
      </main>
    );
  }

  if (!user || !isAdmin) {
    return (
      <main className="checkout-page">
        <div className="checkout-card">
          <h1 className="checkout-heading">Admin</h1>
          <p className="info-text">
            Esta área exige uma conta com papel <strong>admin</strong> no projeto Supabase.
          </p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.78rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            {`insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email = 'seu@email.com'
on conflict (user_id, role) do nothing;`}
          </pre>
          <div className="cart-actions">
            <Link to="/login.php" search={{ redirect: "/admin.php" }} className="btn-rating">
              ENTRAR
            </Link>
            <Link to="/" className="btn-outline">
              Voltar aos vendedores
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-heading">Admin — Anúncios</h1>
        <p className="info-text">
          {user.email} · papel admin confirmado por <code>user_roles</code>
        </p>

        {produtos.isLoading ? <p className="info-text">Carregando anúncios...</p> : null}

        {produtos.data?.length === 0 ? (
          <p className="info-text">
            Nenhum anúncio sincronizado. Aplique a migration <code>0001_migration.sql</code> no
            Supabase do projeto.
          </p>
        ) : null}

        {produtos.data?.map((linha) => (
          <div className="cart-item" key={linha.id} style={{ display: "block" }}>
            <div className="cart-info">
              <div className="cart-vendor">{linha.vendedor ?? ""}</div>
              <div className="cart-name">{linha.nome}</div>
              <div className="cart-meta">
                <span className="cart-country">
                  preço:{" "}
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={preco[linha.id] ?? String(linha.preco)}
                    onChange={(e) => setPreco({ ...preco, [linha.id]: e.target.value })}
                    style={{ width: "100px", marginLeft: "6px" }}
                  />
                </span>
                <span className="cart-country">
                  estoque:{" "}
                  <input
                    type="number"
                    min="0"
                    value={estoque[linha.id] ?? String(linha.estoque)}
                    onChange={(e) => setEstoque({ ...estoque, [linha.id]: e.target.value })}
                    style={{ width: "80px", marginLeft: "6px" }}
                  />
                </span>
              </div>
            </div>
            <div className="cart-actions" style={{ justifyContent: "flex-start" }}>
              <button
                type="button"
                className="btn-rating"
                onClick={() => salvarProduto.mutate(linha)}
              >
                SALVAR
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => removerProduto.mutate(linha.id)}
              >
                EXCLUIR
              </button>
            </div>
          </div>
        ))}

        <hr id="grad1" />

        <h2 className="checkout-heading" style={{ fontSize: "1.2rem" }}>
          Variantes
        </h2>

        {variantes.data?.map((linha) => (
          <div className="cart-item" key={linha.id}>
            <div className="cart-info">
              <div className="cart-name">{linha.variante}</div>
              <div className="cart-meta">
                <span className="cart-country">
                  {formatarBrl(Number(linha.preco))} ·{" "}
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={precoVariante[linha.id] ?? String(linha.preco)}
                    onChange={(e) =>
                      setPrecoVariante({ ...precoVariante, [linha.id]: e.target.value })
                    }
                    style={{ width: "100px", marginLeft: "6px" }}
                  />
                </span>
              </div>
            </div>
            <div className="cart-side">
              <button
                type="button"
                className="btn-rating"
                onClick={() => salvarVariante.mutate(linha)}
              >
                SALVAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
