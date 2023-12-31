import React, { useState } from 'react';

import { Text } from '@/components';
import { SocialMediaSignInButtons } from './SocialMediaSignInButtons';
import { Credentials } from './Credentials';
import { useAuth } from '@/context/auth-context';

export const LoginForm = () => {
  const { message, createUserWEmailAndPassword, signInWithEmailNPassword, forgotPassword } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const hasMessage = message.type != '';
  const messageProps = message.type != 'success' ? 'text-danger' : 'text-primary';

  const setSignUp = () => setIsSigningUp(!isSigningUp);

  const handleRegister = () => {
    createUserWEmailAndPassword(credentials.email, credentials.password);
  };

  const handleLogin = () => {
    signInWithEmailNPassword(credentials.email, credentials.password);
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const label = 'text-secondary_dark block text-sm font-medium dark:text-white';

  return (
    <section
      aria-labelledby='login-id'
      title='login'
      className='center m-auto flex w-11/12 max-w-sm rounded-md bg-white shadow-normal dark:bg-dark_primary_hover'
    >
      <div className='w-full pl-5 pr-5'>
        <header>
          <Text tag='h1' id='login-id' t='body' customClasses='w-full p7 pt-8 pb-5 font-bold tracking-wide text-xl'>
            {isSigningUp ? 'Register your account' : 'Sign in to your account'}
          </Text>
        </header>

        <div className='flex w-full justify-between'>
          <SocialMediaSignInButtons />
        </div>
        <div className='inline-flex w-full items-center justify-center'>
          <hr className='my-8 h-px w-64 border-0 bg-secondary_light dark:bg-gray-700' />
          <span className='absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-secondary_dark dark:bg-dark_primary_hover dark:text-white'>
            or
          </span>
        </div>

        <div className='m-auto w-full pb-5 font-sans'>
          {hasMessage ? (
            <Text t='body' customClasses={`text-center mt-2 mb-3 ${messageProps}`}>
              {message.message}
            </Text>
          ) : null}

          <Credentials handleCredentialsChange={handleCredentialsChange} hasError={hasMessage} />
        </div>

        <div className='flex w-full items-center justify-between pr-6'>
          <span className='flex gap-2 text-sm'>
            <input
              id='remember'
              aria-describedby='remember'
              type='checkbox'
              className='focus:ring-3 mt-0.5 h-4 w-4 rounded border border-none border-secondary_light bg-secondary_light outline-none focus:ring-primary dark:border-secondary_light dark:bg-gray-700 dark:ring-secondary_light dark:focus:ring-primary'
            />
            <label className={label}>Remember me</label>
          </span>
          <button className='text-sm text-primary' onClick={() => forgotPassword(credentials.email)}>
            Forgot password?
          </button>
        </div>

        <div className='m-auto flex w-full justify-center pt-8'>
          <button
            className='m-auto w-full rounded-lg bg-primary p-2 text-white'
            onClick={isSigningUp ? handleRegister : handleLogin}
          >
            {isSigningUp ? 'Register' : 'Sign in'}
          </button>
        </div>

        <div>
          <p className='flex justify-between pb-10 pt-5 text-sm text-secondary_dark'>
            {isSigningUp ? 'Already have an account? ' : "Don't have an account? "}
            <span className='text-primary' onClick={setSignUp}>
              {isSigningUp ? 'Sign in' : 'Register'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
