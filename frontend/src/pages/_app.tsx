import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@/styles/DatePicker.scss';

import { AuthProvider } from '@/context/auth-context';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
