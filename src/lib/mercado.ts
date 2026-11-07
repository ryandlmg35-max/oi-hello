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

/** Formas de pagamento do site: 3 criptos + PIX (a parte, risco do comprador). */
export type FormaPagamento = MoedaPagamento | "PIX";

export const ROTULO_FORMA: Record<FormaPagamento, string> = {
  ...ROTULO_MOEDA,
  PIX: "PIX (QR Code)",
};

/** Chave PIX fixa de recebimento do site. */
export const CHAVE_PIX = "71578786150";

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

/** Endereco/chave de custodia da forma escolhida (fixo do site). */
export function enderecoEscrow(moeda: FormaPagamento): string {
  return moeda === "PIX" ? CHAVE_PIX : (CARTEIRAS[moeda] ?? CARTEIRAS.BTC);
}

const pixCampo = (id: string, valor: string) =>
  id + valor.length.toFixed(0).padStart(2, "0") + valor;

export function crc16Pix(texto: string): number {
  let crc = 0xffff;
  for (let i = 0; i < texto.length; i += 1) {
    crc ^= texto.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc;
}

/**
 * Payload EMV "copia e cola" do BR Code estatico da chave PIX do site, com
 * o valor do pedido em reais embutido (tag 54) e CRC16-CCITT (tag 63).
 */
export function pixPayloadCopiaCola(valorUsd: number): string {
  // Tag 26: 00 = GUI (br.gov.bcb.pix), 01 = chave. Usar 00 na chave (ou
  // pular a GUI) faz o app do banco recusar o QR como "não é PIX".
  const chavePix = pixCampo("00", "br.gov.bcb.pix") + pixCampo("01", CHAVE_PIX);
  const partes = [
    pixCampo("00", "01"),
    pixCampo("26", chavePix),
    pixCampo("52", "0000"),
    pixCampo("53", "986"),
    pixCampo("54", (valorUsd * TAXA_BRL).toFixed(2)),
    pixCampo("58", "BR"),
    pixCampo("59", "BLACK MARKET"),
    pixCampo("60", "Sao Paulo"),
    pixCampo("62", pixCampo("05", "***")),
  ];
  const semCrc = `${partes.join("")}6304`;
  return `${semCrc}${crc16Pix(semCrc).toString(16).toUpperCase().padStart(4, "0")}`;
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
