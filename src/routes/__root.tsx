import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/features/auth/auth-context";
import { CarrinhoProvider } from "@/features/carrinho/carrinho-context";
import { Navegacao } from "@/components/mercado/navegacao";
import { Rodape } from "@/components/mercado/rodape";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="maincontainer" style={{ marginTop: "3em" }}>
      <h1 style={{ textAlign: "center", color: "#fff" }}>404</h1>
      <h2 style={{ textAlign: "center" }}>Página não encontrada</h2>
      <p style={{ textAlign: "center" }}>A página que você procura não existe ou foi movida.</p>
      <div style={{ textAlign: "center" }}>
        <Link to="/" className="details-button2">
          Ir para a home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="maincontainer" style={{ marginTop: "3em" }}>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Esta página não carregou</h1>
      <p style={{ textAlign: "center" }}>
        Algo deu errado do nosso lado. Tente atualizar ou volte para a home.
      </p>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn-rating"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Tentar de novo
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Black Market 2026 | Loja Oficial" },
      {
        name: "description",
        content:
          "Medical / Drugs direto do nosso estoque. Escrow MultiSig, 10 dias de proteção ao comprador, BTC e ETH.",
      },
      { property: "og:title", content: "Black Market 2026 | Loja Oficial" },
      {
        property: "og:description",
        content:
          "Medical / Drugs direto do nosso estoque. Escrow MultiSig, 10 dias de proteção ao comprador.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "/css/font.css" },
      { rel: "stylesheet", href: "/css/main.css" },
      { rel: "stylesheet", href: "/css/nav2.css" },
      { rel: "stylesheet", href: "/css/card2.css" },
      { rel: "stylesheet", href: "/css/gallery.css" },
      { rel: "stylesheet", href: "/css/checkout.css" },
      { rel: "icon", href: "/pic/symbol.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CarrinhoProvider>
          <Navegacao />
          <Outlet />
          <Rodape />
          <Toaster position="top-center" richColors />
        </CarrinhoProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
