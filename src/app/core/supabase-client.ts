import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { environment } from '../../environments/environment';

/**
 * Aplikacja działa w trybie demo (dane w pamięci), dopóki w środowisku
 * nie zostaną ustawione prawdziwe dane projektu Supabase.
 */
export function isSupabaseConfigured(): boolean {
  return (
    !environment.supabaseUrl.includes('YOUR-PROJECT') &&
    !environment.supabaseAnonKey.startsWith('YOUR_')
  );
}

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  client ??= createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  return client;
}
