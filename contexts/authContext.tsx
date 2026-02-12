import { createContext, ReactNode, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps | null;
  isUserLoading: boolean;
  signIn: () => Promise<boolean>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "SEU_CLIENT_ID",
    scopes: ["profile", "email"],
  });

  async function signIn(): Promise<boolean> {
    try {
      setIsUserLoading(true);

      const result = await promptAsync();

      if (result.type !== "success") return false;

      const token = result.authentication?.accessToken;
      if (!token) return false;

      const res = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();

      setUser({
        name: data.name,
        avatarUrl: data.picture,
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      setIsUserLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
