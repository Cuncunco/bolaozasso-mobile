import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/api";
import { saveToken, getToken, deleteToken } from "../storage/token";
import { saveUser, getUser, deleteUser } from "../storage/user";

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
  signUp: (
    name: string | undefined,
    email: string,
    password: string
  ) => Promise<void>;
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

function setAuthHeader(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // 🔥 BOOTSTRAP
  useEffect(() => {
    async function bootstrap() {
      try {
        const token = await getToken();
        const storedUser = await getUser();

        if (token && storedUser) {
          setAuthHeader(token);
          setUser(storedUser);
        }
      } finally {
        setIsUserLoading(false);
      }
    }

    bootstrap();
  }, []);

  async function signIn(email: string, password: string) {
    setIsUserLoading(true);

    try {
      const { data } = await api.post<AuthResponse>("/login", {
        email,
        password,
      });

      await saveToken(data.token);
      await saveUser(data.user);

      setAuthHeader(data.token);
      setUser(data.user);
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
      await saveUser(data.user);

      setAuthHeader(data.token);
      setUser(data.user);
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signOut() {
    await deleteToken();
    await deleteUser();

    setAuthHeader(null);
    setUser(null);
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