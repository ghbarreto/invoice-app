import React, { useMemo, useCallback } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

import { firebaseConfig } from '@utils/firebase_helpers';
import { authUser } from '@/apis/registration/user';
import { useRouter } from 'next/navigation';
import { handleError } from '@/utils/firebaseErrors';

type AuthContext = {
  login: (provider: 'google' | 'github') => Promise<UserCredential | void>;
  logout: () => Promise<void>;
  user: User | null | undefined;
  createUserWEmailAndPassword: (email: string, password: string) => Promise<void>;
  signInWithEmailNPassword: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => void;
  token: any;
  message: {
    type: 'error' | 'success' | '';
    message: string;
  };
};

const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const [user, setUser] = useState<User | null>();
  // rm later
  const [token, setIdToken] = useState<string | null>();
  // -----------
  const provider = useCallback(
    (p: 'github' | 'google' = 'google') => (p === 'github' ? new GithubAuthProvider() : new GoogleAuthProvider()),
    []
  );
  const [message, setMessage] = useState({
    type: '' as 'error' | 'success' | '',
    message: '',
  });

  provider().setCustomParameters({
    prompt: 'select_account',
  });

  const login = useCallback(
    async (p: 'google' | 'github') => {
      try {
        return await signInWithPopup(auth, provider(p));
      } catch (err: any) {
        setMessage({
          type: 'error',
          message: handleError(err.code),
        });
      }
    },
    [auth, provider]
  );

  const createUserWEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        setMessage({
          type: 'error',
          message: handleError(err.code),
        });
      }
    },
    [auth]
  );

  const signInWithEmailNPassword = useCallback(
    async (email: string, password: string) => {
      try {
        const p = await signInWithEmailAndPassword(auth, email, password);

        console.log(p);
      } catch (err: any) {
        setMessage({
          type: 'error',
          message: handleError(err.code),
        });
      }
    },
    [auth]
  );

  const forgotPassword = useCallback(
    async (email: string) => {
      if (!email) {
        setMessage({
          type: 'error',
          message: 'Please enter your email address',
        });
        return;
      }

      try {
        setMessage({
          type: 'success',
          message: 'Password reset has been sent',
        });
        return await sendPasswordResetEmail(auth, email);
      } catch (err: any) {
        setMessage({
          type: 'error',
          message: handleError(err.code),
        });
      }
    },
    [auth]
  );

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem('auth_token');
      router.push('/');
      return await signOut(auth);
    } catch (err: any) {
      setMessage({
        type: 'error',
        message: handleError(err.code),
      });
    }
  }, [auth, router]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdToken()
          .then((idToken) => {
            setIdToken(idToken);
            authUser({
              id: user.uid,
              email: user.email,
              provider_id: user.providerData[0].providerId,
            });
            return localStorage.setItem('auth_token', idToken);
          })
          .catch((error) => {
            console.log(error);
            router.push('/');
            return localStorage.removeItem('auth_token');
          });
        setUser({ ...user });
      } else {
        router.push('/');
      }
      console.log(user, auth);
    });
  }, [auth, router]);

  const values = useMemo(
    () => ({
      login,
      logout,
      user,
      token,
      createUserWEmailAndPassword,
      signInWithEmailNPassword,
      message,
      forgotPassword,
    }),
    [login, logout, user, token, createUserWEmailAndPassword, signInWithEmailNPassword, message, forgotPassword]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export const ProtectedRoute = (props: any) => {
  const router = useRouter();
  const { user } = useAuth();

  if (typeof window != 'undefined' && user === null) {
    router.push('/');
  }

  if (!user) return 'Loading';

  return props.children;
};
