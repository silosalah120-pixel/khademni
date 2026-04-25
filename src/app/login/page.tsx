'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { LogIn, Globe } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const { t, isRTL } = useLanguage();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Google sign-in failed');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-black font-heading text-primary tracking-tighter mb-2 inline-block">
            Khademni <span className="text-foreground">خدمني</span>
          </Link>
          <div className="h-1 w-12 bg-primary mx-auto rounded-full" />
        </div>
        
        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pt-10">
            <CardTitle className="text-3xl font-black font-heading">{t.auth.loginTitle}</CardTitle>
            <CardDescription className="font-bold text-muted-foreground">
              {t.auth.loginSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-8">
            <Button variant="outline" onClick={handleGoogleSignIn} className="gap-3 h-14 rounded-2xl border-2 font-bold text-lg hover:bg-secondary/50 transition-all">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t.auth.googleLogin}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                <span className="bg-card px-4 text-muted-foreground">Or connect with email</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t.common.email}</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-14 rounded-2xl bg-secondary/50 border-none px-6 font-bold" />
              </div>
              <div className="grid gap-3">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" title={t.common.password} className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t.common.password}</Label>
                  <Link href="/forgot-password" title="Forgot Password" className="text-xs text-primary font-bold hover:underline">
                    Forgot?
                  </Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-14 rounded-2xl bg-secondary/50 border-none px-6 font-bold" />
              </div>
              <Button type="submit" className="h-14 rounded-2xl font-black text-lg gap-2 premium-gradient shadow-xl shadow-primary/20 mt-2" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
                {t.common.login}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 text-center pb-10">
            <p className="text-sm font-bold text-muted-foreground">
              {t.auth.noAccount}{' '}
              <Link href="/signup" className="text-primary font-black hover:underline ml-1">
                {t.common.signup}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function Loader2(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
}
