'use client';

import { createContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

const AuthContext = createContext<any>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => signInWithPopup(auth, googleProvider);
  const userSignOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        userSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
