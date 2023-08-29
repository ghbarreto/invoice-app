import React, { useMemo, useCallback } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

import { firebaseConfig } from '@utils/firebase_helpers';

type AuthContext = {
    login: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    user: User | null | undefined;
};

const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [user, setUser] = useState<User | null>();

    const provider = useCallback(() => new GoogleAuthProvider(), []);

    provider().setCustomParameters({
        prompt: 'select_account',
    });

    const login = useCallback(async () => {
        return await signInWithPopup(auth, provider());
    }, [auth, provider]);

    const logout = useCallback(async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('auth_token');
        } catch (err) {
            console.log(err);
        }
    }, [auth]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                user.getIdToken()
                    .then(idToken => {
                        return localStorage.setItem('auth_token', idToken);
                    })
                    .catch(error => {
                        console.log(error);
                        return localStorage.removeItem('auth_token');
                    });
                setUser({ ...user });
            } else {
                setUser(null);
            }
        });
    }, [auth]);

    const values = useMemo(
        () => ({
            login,
            logout,
            user,
        }),
        [login, logout, user]
    );

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
