/**
 * Schema esperado do projeto DEPOIS da migration `0001_migration.sql`.
 *
 * `src/integrations/supabase/types.ts` e gerado pelo Lovable a partir do banco
 * atual (que ainda nao tem a migration 0001) e nao e editado aqui. Este modulo
 * declara o schema do mercado — `vendedores`, `produtos_variantes` e as colunas
 * novas de `produtos`/`pedidos`/`pedido_itens` — para o clone typecheckar
 * antes da migration ser aplicada. Depois que ela rodar, o types.ts gerado
 * tem exatamente este shape.
 */
import type { Database as Base, Json } from "@/integrations/supabase/types";

export type PedidoStatus =
  Base["public"]["Enums"]["pedido_status"] | "enviado" | "liberado" | "disputa";

type Tabela = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: Base["public"]["Tables"]["produtos"]["Relationships"];
};

export type MercadoDatabase = {
  __InternalSupabase: Base["__InternalSupabase"];
  public: {
    Tables: {
      pedido_itens: {
        Row: {
          id: string;
          pedido_id: string;
          preco_unitario: number;
          produto_id: string;
          quantidade: number;
          variante_id: string | null;
          produto_nome: string | null;
          variante: string | null;
          vendedor: string | null;
        };
        Insert: {
          id?: string;
          pedido_id: string;
          preco_unitario: number;
          produto_id: string;
          quantidade: number;
          variante_id?: string | null;
          produto_nome?: string | null;
          variante?: string | null;
          vendedor?: string | null;
        };
        Update: {
          id?: string;
          pedido_id?: string;
          preco_unitario?: number;
          produto_id?: string;
          quantidade?: number;
          variante_id?: string | null;
          produto_nome?: string | null;
          variante?: string | null;
          vendedor?: string | null;
        };
        Relationships: Base["public"]["Tables"]["pedido_itens"]["Relationships"];
      };
      pedidos: {
        Row: {
          criado_em: string;
          id: string;
          status: PedidoStatus;
          usuario_id: string;
          valor_total: number;
          chave_secreta: string | null;
          pagamento: string | null;
          moeda: string;
          endereco: Json | null;
          observacoes: string | null;
        };
        Insert: {
          criado_em?: string;
          id?: string;
          status?: PedidoStatus;
          usuario_id: string;
          valor_total?: number;
          chave_secreta?: string | null;
          pagamento?: string | null;
          moeda?: string;
          endereco?: Json | null;
          observacoes?: string | null;
        };
        Update: {
          criado_em?: string;
          id?: string;
          status?: PedidoStatus;
          usuario_id?: string;
          valor_total?: number;
          chave_secreta?: string | null;
          pagamento?: string | null;
          moeda?: string;
          endereco?: Json | null;
          observacoes?: string | null;
        };
        Relationships: Base["public"]["Tables"]["pedidos"]["Relationships"];
      };
      produtos: {
        Row: {
          criado_em: string;
          descricao: string | null;
          estoque: number;
          id: string;
          imagem_url: string | null;
          nome: string;
          preco: number;
          categoria: string | null;
          vendedor: string | null;
          vendedor_slug: string | null;
          envio: string | null;
          numero_produto: string | null;
          galeria: string[] | null;
          comentarios: Json;
          vendas: number;
        };
        Insert: {
          criado_em?: string;
          descricao?: string | null;
          estoque?: number;
          id?: string;
          imagem_url?: string | null;
          nome: string;
          preco?: number;
          categoria?: string | null;
          vendedor?: string | null;
          vendedor_slug?: string | null;
          envio?: string | null;
          numero_produto?: string | null;
          galeria?: string[] | null;
          comentarios?: Json;
          vendas?: number;
        };
        Update: {
          criado_em?: string;
          descricao?: string | null;
          estoque?: number;
          id?: string;
          imagem_url?: string | null;
          nome?: string;
          preco?: number;
          categoria?: string | null;
          vendedor?: string | null;
          vendedor_slug?: string | null;
          envio?: string | null;
          numero_produto?: string | null;
          galeria?: string[] | null;
          comentarios?: Json;
          vendas?: number;
        };
        Relationships: Base["public"]["Tables"]["produtos"]["Relationships"];
      };
      produtos_variantes: {
        Row: {
          id: string;
          produto_id: string;
          variante: string;
          preco: number;
          preco_antigo: string | null;
          imagem: string | null;
          ordem: number;
        };
        Insert: {
          id?: string;
          produto_id: string;
          variante: string;
          preco: number;
          preco_antigo?: string | null;
          imagem?: string | null;
          ordem?: number;
        };
        Update: {
          id?: string;
          produto_id?: string;
          variante?: string;
          preco?: number;
          preco_antigo?: string | null;
          imagem?: string | null;
          ordem?: number;
        };
        Relationships: Tabela["Relationships"];
      };
      profiles: Base["public"]["Tables"]["profiles"];
      user_roles: Base["public"]["Tables"]["user_roles"];
      vendedores: {
        Row: {
          id: string;
          slug: string;
          nome: string;
          nivel: string;
          envio: string;
          ativo: boolean;
          vendas: number;
          avaliacao: number;
          capa: string | null;
          logo: string | null;
          destaque: boolean;
          criado_em: string;
        };
        Insert: {
          id?: string;
          slug: string;
          nome: string;
          nivel?: string;
          envio?: string;
          ativo?: boolean;
          vendas?: number;
          avaliacao?: number;
          capa?: string | null;
          logo?: string | null;
          destaque?: boolean;
          criado_em?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          nome?: string;
          nivel?: string;
          envio?: string;
          ativo?: boolean;
          vendas?: number;
          avaliacao?: number;
          capa?: string | null;
          logo?: string | null;
          destaque?: boolean;
          criado_em?: string;
        };
        Relationships: Tabela["Relationships"];
      };
    };
    Views: Base["public"]["Views"];
    Functions: Base["public"]["Functions"];
    Enums: Omit<Base["public"]["Enums"], "pedido_status"> & {
      pedido_status: PedidoStatus;
    };
    CompositeTypes: Base["public"]["CompositeTypes"];
  };
};
