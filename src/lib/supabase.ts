import { createClient } from "@supabase/supabase-js";

// Server-only client. The service role key is a password to the whole
// database — it lives here, on the server, and never ships to the browser.
const supabaseUrl = process.env.SUPABASE_URL || "https://vnrpbeusqdarpewqjjcc.supabase.co";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_key";

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

