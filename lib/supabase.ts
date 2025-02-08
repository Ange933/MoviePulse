import { createClient } from '@supabase/supabase-js';
import { NextApiRequest } from "next";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) {
  throw new Error("❌ ERREUR : NEXT_PUBLIC_SUPABASE_URL est manquant dans les variables d'environnement.");
}
if (!supabaseAnonKey) {
  throw new Error("❌ ERREUR : NEXT_PUBLIC_SUPABASE_ANON_KEY est manquant dans les variables d'environnement.");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});


supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("❌ Erreur lors de la récupération de la session :", error);
  } else {
    console.log("🟢 Session actuelle :", data.session);
  }
});


export async function getUser(req: NextApiRequest) {
  const supabaseServer = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: req.headers.authorization || "" } }
  });

  const { data, error } = await supabaseServer.auth.getUser();
  if (error) {
    console.error("❌ Erreur Supabase:", error);
    return null;
  }
  return data?.user || null;
}

