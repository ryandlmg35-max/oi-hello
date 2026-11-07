import { describe, expect, it } from "vitest";
import { CHAVE_PIX, pixPayloadCopiaCola } from "@/lib/mercado";

function crc16Pix(texto: string): number {
  let crc = 0xffff;
  for (let i = 0; i < texto.length; i += 1) {
    crc ^= texto.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc;
}

describe("pixPayloadCopiaCola", () => {
  it("monta BR Code EMV com chave, valor em BRL e CRC valido", () => {
    const payload = pixPayloadCopiaCola(10);
    expect(payload.startsWith("000201")).toBe(true);
    expect(payload).toContain(CHAVE_PIX);
    expect(payload).toContain("540554.00"); // 10 USD * 5.40 = R$ 54.00

    const semCrc = payload.slice(0, -4);
    const crc = crc16Pix(semCrc).toString(16).toUpperCase().padStart(4, "0");
    expect(payload.slice(-4)).toBe(crc);
  });

  it("embaralha valor diferente para pedido diferente", () => {
    expect(pixPayloadCopiaCola(20)).not.toBe(pixPayloadCopiaCola(10));
  });
});
