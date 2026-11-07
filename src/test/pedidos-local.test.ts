import { beforeEach, describe, expect, it } from "vitest";
import {
  buscarPedidoLocal,
  listarPedidosLocais,
  salvarPedidoLocal,
} from "@/features/pedidos/pedidos-local";

function pedidoLocal(id: string, usuarioId = "u1") {
  return {
    id,
    status: "pendente",
    valor_total: 54,
    criado_em: new Date().toISOString(),
    chave_secreta: "CHAVE123456",
    pagamento: "PIX",
    moeda: "PIX",
    endereco: { cidade: "Sao Paulo" },
    observacoes: null,
    pedido_itens: [],
    usuario_id: usuarioId,
  };
}

describe("pedidos locais (fallback sem migration)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("salva e recupera o pedido por id", () => {
    salvarPedidoLocal(pedidoLocal("abc"));
    expect(buscarPedidoLocal("abc")?.id).toBe("abc");
  });

  it("confere a chave secreta quando ela vem no formulário", () => {
    salvarPedidoLocal(pedidoLocal("abc"));
    expect(buscarPedidoLocal("abc", "CHAVE123456")).not.toBeNull();
    expect(buscarPedidoLocal("abc", "OUTRACHAVE")).toBeNull();
  });

  it("filtra por usuario e ordena do mais novo pro mais antigo", () => {
    salvarPedidoLocal(pedidoLocal("antigo"));
    salvarPedidoLocal(pedidoLocal("novo"));
    salvarPedidoLocal(pedidoLocal("outro", "u2"));

    expect(
      listarPedidosLocais("u1")
        .map((p) => p.id)
        .sort(),
    ).toEqual(["antigo", "novo"]);
    expect(listarPedidosLocais("u2").map((p) => p.id)).toEqual(["outro"]);
    expect(listarPedidosLocais()).toHaveLength(3);
  });
});
