import { describe, expect, it } from "vitest";
import { CHAVE_PIX, crc16Pix, pixPayloadCopiaCola } from "@/lib/mercado";

describe("pixPayloadCopiaCola", () => {
  it("monta BR Code EMV estatico com GUI, chave na sub-tag 01 e valor em BRL", () => {
    const payload = pixPayloadCopiaCola(10);
    expect(payload.startsWith("000201")).toBe(true);
    // GUI + chave: a chave PRECISA ser a sub-tag 01 dentro da tag 26,
    // senao o app do banco recusa o QR ("nao e um codigo QR PIX").
    expect(payload).toContain("0014br.gov.bcb.pix");
    expect(payload).toContain(`0111${CHAVE_PIX}`);
    expect(payload).not.toContain(`0011${CHAVE_PIX}`);
    expect(payload).toContain("52040000"); // MCC
    expect(payload).toContain("5303986"); // BRL
    expect(payload).toContain("540554.00"); // 10 USD * 5.40 = R$ 54.00
    expect(payload).toContain("5802BR");
    expect(payload).toContain("62070503***"); // txid estatico
    expect(payload).toContain("6304"); // tag do CRC
  });

  it("calcula o CRC16-CCITT igual a implementacao de referencia", () => {
    // Payload gerado pela lib de referencia (pix-utils) para a mesma chave.
    const referencia =
      "00020126330014br.gov.bcb.pix011171578786150520400005303986540554.005802BR5912BLACK MARKET6009SAO PAULO62070503***63047927";
    const prefixo = referencia.slice(0, -4);
    expect(crc16Pix(prefixo).toString(16).toUpperCase().padStart(4, "0")).toBe("7927");
    expect(referencia.slice(-4)).toBe(
      crc16Pix(prefixo).toString(16).toUpperCase().padStart(4, "0"),
    );
  });

  it("embaralha valor diferente para pedido diferente", () => {
    expect(pixPayloadCopiaCola(20)).not.toBe(pixPayloadCopiaCola(10));
  });
});
