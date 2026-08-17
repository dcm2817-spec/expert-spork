// God's Platform — Supabase client
// Single instance, imported as an ES module everywhere data is needed.
// Loaded via Supabase's CDN script tag in each page's <head>:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>

const SUPABASE_URL = 'https://hmemcurrxiktykfwzxxd.supabase.co';
const SUPABASE_ANON_KEY = 'REPLACE_WITH_ANON_KEY'; // safe to expose — public key, RLS enforces access

export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
