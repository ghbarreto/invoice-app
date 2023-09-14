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
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

import { firebaseConfig } from '@utils/firebase_helpers';
import { authUser } from '@/apis/registration/user';
import { useRouter } from 'next/navigation';
import { handleError } from '@/utils/firebaseErrors';

type AuthContext = {
    loginWithGoogle: () => Promise<UserCredential | void>;
    logout: () => Promise<void>;
    user: User | null | undefined;
    createUserWEmailAndPassword: (email: string, password: string) => Promise<void>;
    signInWithEmailNPassword: (email: string, password: string) => Promise<void>;
    token: any;
    error: string;
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
    const provider = useCallback(() => new GoogleAuthProvider(), []);
    const [error, setError] = useState('');

    provider().setCustomParameters({
        prompt: 'select_account',
    });

    const loginWithGoogle = useCallback(async () => {
        try {
            return await signInWithPopup(auth, provider());
        } catch (err) {
            console.log(err);
        }
    }, [auth, provider]);

    const createUserWEmailAndPassword = useCallback(
        async (email: string, password: string) => {
            try {
                const a = await createUserWithEmailAndPassword(auth, email, password);
            } catch (err: any) {
                setError(handleError(err.code));
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
                setError(handleError(err.code));
            }
        },
        [auth]
    );

    const logout = useCallback(async () => {
        try {
            localStorage.removeItem('auth_token');
            router.push('/');
            return await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    }, [auth, router]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken()
                    .then((idToken) => {
                        setIdToken(idToken);
                        authUser({
                            id: user.uid,
                            email: user.email,
                            provider_id: user.providerId,
                        });
                        router.push('/dashboard');
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
            loginWithGoogle,
            logout,
            user,
            token,
            createUserWEmailAndPassword,
            signInWithEmailNPassword,
            error,
        }),
        [loginWithGoogle, logout, user, token, createUserWEmailAndPassword, signInWithEmailNPassword, error]
    );

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export const AuthCheck = (props: any) => {
    const router = useRouter();
    const { user } = useAuth();

    if (typeof window != 'undefined' && user === null) {
        router.push('/');
    }

    if (!user) return 'Loading';

    return props.children;
};
