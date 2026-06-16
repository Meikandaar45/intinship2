import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only client. The service role key is a password to the whole
// database — it lives here, on the server, and never ships to the browser.
const supabaseUrl = process.env.SUPABASE_URL || "https://vnrpbeusqdarpewqjjcc.supabase.co";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Only create a real client if we have both URL and key
let supabase: SupabaseClient;
if (supabaseUrl && supabaseServiceRoleKey && supabaseServiceRoleKey !== "placeholder_key") {
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
} else {
  // Create a dummy client that will fail gracefully
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey || "dummy_key_for_build");
}

/**
 * Check if Supabase is properly configured with real credentials.
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseServiceRoleKey && supabaseServiceRoleKey !== "placeholder_key" && supabaseServiceRoleKey !== "dummy_key_for_build");
}

export { supabase };
