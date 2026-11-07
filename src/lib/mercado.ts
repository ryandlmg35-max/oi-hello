/** Utilitarios do mercado (formatacao BRL/crypto e rotulos de pedido). */

/**
 * Cogra fixa usada so para exibicao: produtos ficam cotados em USD no banco/
 * catalogo e o mirror mostra o equivalente em reais.
 */
export const TAXA_BRL = 5.4;
export const TAXA_BTC_ESTIMADA = 50000;
export const TAXA_ETH_ESTIMADA = 2500;
export const TAXA_SOL_ESTIMADA = 150;

/** Criptos aceitas no pagamento. */
export type MoedaPagamento = "BTC" | "ETH" | "SOL";

/** Carteiras fixationas de recebimento (nao derivadas, nao trocam por pedido). */
export const CARTEIRAS: Record<MoedaPagamento, string> = {
  BTC: "bc1qh0m2g0te34h5v2qdsw89vndym9h4e8u8aqfevf",
  ETH: "0xD3F04Fe3a27C67C0ce23e8E1d026B9A4c063C564",
  SOL: "HPf2DFvk4xJWKx9mA3grsc1dmboQju8PdPHYy46HTsc",
};

export const ROTULO_MOEDA: Record<MoedaPagamento, string> = {
  BTC: "Bitcoin (BTC)",
  ETH: "Ethereum (ETH)",
  SOL: "Solana (SOL)",
};

const formatoBrl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarBrl(valorUsd: number): string {
  return formatoBrl.format(valorUsd * TAXA_BRL);
}

export function formatarCrypto(valorUsd: number, moeda: MoedaPagamento): string {
  const taxa =
    moeda === "BTC" ? TAXA_BTC_ESTIMADA : moeda === "ETH" ? TAXA_ETH_ESTIMADA : TAXA_SOL_ESTIMADA;
  const quantidade = valorUsd / taxa;
  return `≈ ${quantidade.toFixed(6)} ${moeda}`;
}

/** Carteira de custodia da moeda: endereco do proprio site, fixo. */
export function enderecoEscrow(moeda: MoedaPagamento): string {
  return CARTEIRAS[moeda] ?? CARTEIRAS.BTC;
}

export const STATUS_PEDIDO: Record<string, { rotulo: string; classe: string }> = {
  pendente: { rotulo: "Aguardando pagamento", classe: "awaiting" },
  enviado: { rotulo: "Enviado", classe: "confirmed" },
  pago: { rotulo: "Pago", classe: "confirmed" },
  liberado: { rotulo: "Liberado", classe: "confirmed" },
  cancelado: { rotulo: "Cancelado", classe: "canceled" },
  disputa: { rotulo: "Em disputa", classe: "underpaid" },
};

export function statusDoPedido(status: string) {
  return STATUS_PEDIDO[status] ?? { rotulo: status, classe: "awaiting" };
}

/**
 * Remove linhas de contato de terceiros ( emails do mirror original ) e
 * retorna o envio pronto para exibicao, pq aqui quem envia e o proprio site.
 */
export function envioLimpo(texto: string): string {
  if (!texto) return "Envio discreto, com rastreio";
  const linhas = texto
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => {
      if (!l) return false;
      if (/^(Contact|Contato):/i.test(l)) return false;
      if (/@x-mail\.pro/i.test(l)) return false;
      return true;
    });
  return linhas.join(" · ") || "Envio discreto, com rastreio";
}

export function formatarDataHora(iso: string | null | undefined): string {
  if (!iso) return "—";
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}
