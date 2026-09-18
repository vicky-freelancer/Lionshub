import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

let supabaseClient: SupabaseClient | null = null;
let isConfigured = false;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    isConfigured = true;
    console.log('[Supabase] Initialized client with provided credentials.');
  } catch (error) {
    console.error('[Supabase] Failed to initialize Supabase client:', error);
  }
} else {
  console.log('[Supabase] No credentials provided in environment. Active in-memory fallback enabled.');
}

export const getSupabase = (): SupabaseClient | null => supabaseClient;
export const isSupabaseConfigured = (): boolean => isConfigured;
