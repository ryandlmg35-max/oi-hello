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
      <h2 style={{ textAlign: "center" }}>Page not found</h2>
      <p style={{ textAlign: "center" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ textAlign: "center" }}>
        <Link to="/" className="details-button2">
          Go home
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
      <h1 style={{ textAlign: "center", color: "#fff" }}>This page didn&apos;t load</h1>
      <p style={{ textAlign: "center" }}>
        Something went wrong on our end. You can try refreshing or head back home.
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
          Try again
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
      { title: "Black Market 2026 | Escrow Marketplace" },
      {
        name: "description",
        content:
          "Escrow marketplace clone — Medical / Drugs. MultiSig escrow, 10 days buyer protection, BTC & ETH.",
      },
      { property: "og:title", content: "Black Market 2026 | Escrow Marketplace" },
      {
        property: "og:description",
        content:
          "Escrow marketplace clone — Medical / Drugs. MultiSig escrow, 10 days buyer protection.",
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
    <html lang="en">
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
