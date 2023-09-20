import { LoginForm } from '@/components';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <main className={`flex h-screen items-center bg-background_light dark:bg-background_dark`}>
      <LoginForm />
    </main>
  );
}
