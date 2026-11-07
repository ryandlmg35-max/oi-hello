import type { Pedido } from "./pedidos";

/**
 * Pedidos salvos no navegador (localStorage).
 *
 * O mirror funciona como clone de estudo: enquanto a migration 0001 nao for
 * aplicada no Supabase, as tabelas `pedidos`/`pedido_itens` nao existem e o
 * checkout nao consegue gravar nada no banco. Nesses casos o pedido e
 * registrado localmente, continua funcionando (QR PIX, chave secreta, status)
 * e some da tela assim que a migration entra — o banco passa a ser a fonte.
 */

const CHAVE_ARMAZENAMENTO = "bm2026:pedidos:v1";
const LIMITE_LOCAL = 50;

export type PedidoLocal = Pedido & { usuario_id: string };

function storage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function lerTodos(): PedidoLocal[] {
  const s = storage();
  if (!s) return [];
  try {
    const bruto = s.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) return [];
    const dados = JSON.parse(bruto) as PedidoLocal[];
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

/** Todos os pedidos locais, do mais novo pro mais antigo. */
export function listarTodosLocais(): PedidoLocal[] {
  return lerTodos().sort((a, b) => (a.criado_em < b.criado_em ? 1 : -1));
}

/** Pedidos locais de um usuario especifico (ou todos, se omitir). */
export function listarPedidosLocais(usuarioId?: string): Pedido[] {
  const todos = listarTodosLocais();
  const filtrados = usuarioId ? todos.filter((p) => p.usuario_id === usuarioId) : todos;
  return filtrados.map(({ usuario_id: _usuarioId, ...pedido }) => pedido);
}

/** Grava (ou sobrescreve) um pedido local. */
export function salvarPedidoLocal(pedido: PedidoLocal): Pedido {
  const s = storage();
  if (!s) return pedido;
  const todos = listarTodosLocais().filter((p) => p.id !== pedido.id);
  todos.unshift(pedido);
  try {
    s.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(todos.slice(0, LIMITE_LOCAL)));
  } catch {
    // cota cheia / modo privado: o checkout segue, so nao persiste
  }
  const { usuario_id: _usuarioId, ...limpo } = pedido;
  return limpo;
}

/** Busca local por id (e chave secreta, se informada). */
export function buscarPedidoLocal(id: string, chave?: string): Pedido | null {
  const achado = listarTodosLocais().find((p) => p.id === id.trim());
  if (!achado) return null;
  if (chave && chave.trim() && achado.chave_secreta !== chave.trim()) return null;
  const { usuario_id: _usuarioId, ...pedido } = achado;
  return pedido;
}
