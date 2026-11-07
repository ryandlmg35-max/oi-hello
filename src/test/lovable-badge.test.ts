import { describe, expect, it } from "vitest";
import { removerBadgeLovable } from "@/lib/lovable-badge";

describe("badge do Lovable", () => {
  it("remove o container #lovable-badge inteiro", () => {
    document.body.innerHTML = `
      <div id="lovable-badge">
        <a href="https://lovable.dev">Made with Lovable</a>
        <button aria-label="close">✕</button>
      </div>
      <main id="conteudo">site</main>
    `;

    removerBadgeLovable();

    expect(document.getElementById("lovable-badge")).toBeNull();
    expect(document.getElementById("conteudo")).not.toBeNull();
  });

  it("remove o botao X orfao (fora do container)", () => {
    document.body.innerHTML = `
      <button class="lovable-badge-close" aria-label="close">✕</button>
      <main id="conteudo">site</main>
    `;

    removerBadgeLovable();

    expect(document.querySelector(".lovable-badge-close")).toBeNull();
    expect(document.getElementById("conteudo")).not.toBeNull();
  });
});
