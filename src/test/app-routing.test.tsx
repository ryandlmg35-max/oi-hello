import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  // O mirror do site original usa URLs .php — o clone precisa responder nelas.
  it.each([
    "/cat.php",
    "/product.php",
    "/vendor.php",
    "/card.php",
    "/checkout.php",
    "/login.php",
    "/status.php",
    "/escrow-overview.php",
    "/contact.php",
    "/account.php",
    "/admin.php",
  ])("matches a real route for %s", (caminho) => {
    const matches = router.matchRoutes(caminho);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    expect(matches.at(-1)?.fullPath).toBe(caminho);
  });
});
