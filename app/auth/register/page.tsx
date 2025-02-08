'use client';

import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Film } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Check if passwords match before signing up
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await signUp(email, password, confirmPassword);
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Film className="w-12 h-12 mb-4 text-primary" />
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>
              Sign up to start managing your movie collection
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
                />
              </div>
              <div className="space-y-2">
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </div>
              <div className="space-y-2">
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // ✅ Fixed this
                    required
                />
              </div>
              <Button type="submit" className="w-full bg-[#800020] hover:bg-[#9b2242] text-white border-white px-6 py-3 rounded-lg">
                Sign Up
              </Button>

            </form>
            <div className="text-center mt-4">
              <span className="text-gray-400">Already have an account? </span>
              <Link href="/auth/login" className="text-[#0a0a0a] hover:text-[#1a1a1a]">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}

