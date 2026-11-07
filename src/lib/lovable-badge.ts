/**
 * O widget "Made with Lovable" e injetado pela plataforma em tempo de
 * execucao (no preview e no deploy). O CSS global esconde na hora; este
 * modulo remove o no do DOM pra nao sobrar caixa vazia nem o botao X
 * orfao flutuando no canto da tela.
 */

const SELETORES = [
  "#lovable-badge",
  "[id*='lovable-badge']",
  "[class*='lovable-badge']",
  "[data-lovable-badge]",
  "[id*='lovable']",
  "[class*='lovable']",
];

/** Remove qualquer rastro do widget de branding do Lovable. */
export function removerBadgeLovable(): void {
  if (typeof document === "undefined") return;
  for (const seletor of SELETORES) {
    document.querySelectorAll(seletor).forEach((elemento) => {
      elemento.remove();
    });
  }
}

/**
 * Fica de olho no DOM e apara o widget assim que ele aparece (o script da
 * plataforma roda depois do primeiro paint). Devolve a funcao de limpeza.
 */
export function observarBadgeLovable(): () => void {
  if (typeof document === "undefined") return () => {};

  removerBadgeLovable();

  const observador = new MutationObserver(() => removerBadgeLovable());
  observador.observe(document.documentElement, { childList: true, subtree: true });

  const intervalo = window.setInterval(removerBadgeLovable, 1500);

  return () => {
    observador.disconnect();
    window.clearInterval(intervalo);
  };
}
