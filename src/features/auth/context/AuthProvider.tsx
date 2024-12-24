"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/firebase/config";
import { User, UserCredential } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

interface AuthContextType {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<unknown | undefined>;
  signIn: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  async function signUp(email: string, password: string) {
    try {
      //const user = await registerUser(email, password);
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );

      if (!userCredential) {
        throw new Error("User could not be registered.");
      }

      const user = userCredential.user;
      setCurrentUser(user);
      console.log("User registered successfully:", user);
    } catch (error: unknown) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async function signIn(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    console.log(email, password);
    return undefined;
  }

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
