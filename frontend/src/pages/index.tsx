import { LoginForm } from '@/components';

export default function Home() {
  return (
    <>
      <main className={`flex h-screen items-center bg-background_light dark:bg-background_dark`}>
        <LoginForm />
      </main>
    </>
  );
}
