'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Film } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { usePathname } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && pathname !== "/auth/login") {
      router.push('/movies');
    }
  }, [user, pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        router.push('/movies');
      } else {
        setError("Une erreur s'est produite, veuillez réessayer.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Film className="w-12 h-12 mb-4 text-primary" />
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access your movie collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                  </div>
              )}
              <div className="space-y-2">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white-700 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white-700 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full bg-[#800020] hover:bg-[#9b2242] text-white border-white px-6 py-3 rounded-lg">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-[#0a0a0a] hover:text-[#1a1a1a]">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
