/** Utilitarios do mercado (formatacao BRL/crypto e rotulos de pedido). */

/**
 * Cogra fixa usada so para exibicao: produtos ficam cotados em USD no banco/
 * catalogo e o mirror mostra o equivalente em reais.
 */
export const TAXA_BRL = 5.4;
export const TAXA_BTC_ESTIMADA = 50000;
export const TAXA_ETH_ESTIMADA = 2500;

const formatoBrl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarBrl(valorUsd: number): string {
  return formatoBrl.format(valorUsd * TAXA_BRL);
}

export function formatarCrypto(valorUsd: number, moeda: "BTC" | "ETH"): string {
  const taxa = moeda === "BTC" ? TAXA_BTC_ESTIMADA : TAXA_ETH_ESTIMADA;
  const quantidade = valorUsd / taxa;
  return `≈ ${quantidade.toFixed(6)} ${moeda}`;
}

/** Endereco de escrow ficticio derivado do id do pedido (demo). */
export function enderecoEscrow(orderId: string, moeda: string): string {
  const prefixo = moeda === "ETH" ? "0x" : "bc1";
  let hash = 0;
  for (let i = 0; i < orderId.length; i += 1)
    hash = (hash * 31 + orderId.charCodeAt(i)) % 0xffffffff;
  const corpo = Math.abs(hash).toString(16).padStart(8, "0").repeat(6).slice(0, 42);
  return `${prefixo}${corpo}`;
}

export const STATUS_PEDIDO: Record<string, { rotulo: string; classe: string }> = {
  pendente: { rotulo: "Aguardando pagamento", classe: "awaiting" },
  enviado: { rotulo: "Enviado", classe: "confirmed" },
  pago: { rotulo: "Pago", classe: "confirmed" },
  liberado: { rotulo: "Liberado ao vendedor", classe: "confirmed" },
  cancelado: { rotulo: "Cancelado", classe: "canceled" },
  disputa: { rotulo: "Em disputa", classe: "underpaid" },
};

export function statusDoPedido(status: string) {
  return STATUS_PEDIDO[status] ?? { rotulo: status, classe: "awaiting" };
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
