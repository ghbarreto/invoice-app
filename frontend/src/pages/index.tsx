import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { LoginForm } from '@/components';
import { useAuth } from '@/context/auth-context';

export default function Home() {
  const { user, loadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user && !loadingUser) {
    return (
      <main className={`flex h-screen items-center bg-background_light dark:bg-background_dark`}>
        <LoginForm />
      </main>
    );
  }
}
