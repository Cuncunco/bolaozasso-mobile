import { createContext, ReactNode, useEffect, useState } from "react";
import { router } from "expo-router";
import { api } from "../lib/api";
import { saveToken, getToken, deleteToken } from "../storage/token";

interface UserProps {
  id: string;
  name?: string | null;
  email: string;
  avatarUrl?: string | null;
}

export interface AuthContextDataProps {
  user: UserProps | null;
  isUserLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string | undefined, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthResponse = {
  user: UserProps;
  token: string;
};

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // 🔄 Verifica se já existe token salvo ao abrir o app
  useEffect(() => {
    async function loadUser() {
      const token = await getToken();

      if (token) {
        try {
          // opcional: você pode criar rota /me no backend
          const { data } = await api.get<UserProps>("/me");
          setUser(data);
        } catch {
          await deleteToken();
        }
      }

      setIsUserLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(email: string, password: string) {
    setIsUserLoading(true);

    try {
      const { data } = await api.post<AuthResponse>("/login", {
        email,
        password,
      });

      await saveToken(data.token);
      setUser(data.user);

      router.replace("/(tabs)/new"); // ajuste se quiser outra rota
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signUp(
    name: string | undefined,
    email: string,
    password: string
  ) {
    setIsUserLoading(true);

    try {
      const { data } = await api.post<AuthResponse>("/register", {
        name,
        email,
        password,
      });

      await saveToken(data.token);
      setUser(data.user);

      router.replace("/(tabs)/new");
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signOut() {
    await deleteToken();
    setUser(null);
    router.replace("/signIn");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
