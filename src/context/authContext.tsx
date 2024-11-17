"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "~/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthStatus, AuthUser, UserRole } from "~/types/auth";

const AuthContext = createContext<AuthStatus>({
  user: null,
  loading: true,
  error: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // Get the ID token with claims
            const tokenResult = await firebaseUser.getIdTokenResult();

            const authUser: AuthUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: (tokenResult.claims.role as UserRole) ?? "guest",
              permissions: (tokenResult.claims.permissions as string[]) ?? [],
            };

            setAuthStatus({
              user: authUser,
              loading: false,
              error: null,
            });
          } else {
            setAuthStatus({
              user: null,
              loading: false,
              error: null,
            });
          }
        } catch (error) {
          setAuthStatus({
            user: null,
            loading: false,
            error: error as Error,
          });
        }
      },
      (error) => {
        setAuthStatus({
          user: null,
          loading: false,
          error: error as Error,
        });
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
