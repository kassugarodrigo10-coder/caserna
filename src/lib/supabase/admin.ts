import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Cliente com a service role key — nunca importar de um componente client.
 * Usado só para checar a lista de e-mails autorizados da Diretoria antes do cadastro.
 */
export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
