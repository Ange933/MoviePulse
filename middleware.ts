import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  console.log("🔍 Middleware : Vérification de la session...");

  // ✅ Récupère la session mais ne redirige plus automatiquement
  const { data: sessionData } = await supabase.auth.getSession();
  console.log("🟢 Middleware - Session actuelle :", sessionData?.session ? "✅ Connecté" : "❌ Pas de session");

  return res; // ✅ Ne redirige pas, laisse l'utilisateur accéder à `/movies`
}

export const config = {
  matcher: ['/movies/:path*', '/auth/:path*'],
};
