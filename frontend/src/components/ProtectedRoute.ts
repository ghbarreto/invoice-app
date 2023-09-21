import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';

export const ProtectedRoute = (props: any) => {
  const router = useRouter();
  const { user } = useAuth();

  if (typeof window != 'undefined' && user === null) {
    router.push('/');
  }

  if (!user) return 'Loading';

  return props.children;
};
