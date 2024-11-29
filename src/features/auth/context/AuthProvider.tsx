import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/firebase/config";
import { User, UserCredential } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

interface AuthContextType {
  currentUser: User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
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

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  // TODO validation and refactoring
  async function signUp(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
      return userCredential;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  // TODO validation and refactoring
  async function signIn(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    try {
      console.log("User signed in successfully!");
      const userCredential = await signInWithEmailAndPassword(email, password);
      console.log(userCredential);
      return userCredential;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
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
