import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { MercadoDatabase } from "./db-tipos";

/**
 * Mesmo cliente gerado pelo Lovable (mesma sessao, mesma auth e mesmo
 * storage), porem tipado com o schema do mercado — que so existe no banco
 * depois da migration `0001_migration.sql`.
 */
export const mercadoSupabase = supabase as unknown as SupabaseClient<MercadoDatabase>;
