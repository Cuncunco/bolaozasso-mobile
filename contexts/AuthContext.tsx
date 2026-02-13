import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps | null;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  
  const redirectUri = "https://auth.expo.io/@cuncunco/bolaozasso-mobile/";
  console.log("REDIRECT URI:", redirectUri);

  const WEB_CLIENT_ID =
    "82318742844-brvpt68o12c1tbh0gjqlota7i6n7h3sf.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    redirectUri,
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      const result = await promptAsync();
      console.log("AUTH RESULT:", result);
    } catch (error) {
      console.log("AUTH ERROR:", error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    async function handleGoogleResponse() {
      console.log("AUTH RESPONSE:", response);

      if (response?.type !== "success") return;

      const accessToken = response.authentication?.accessToken;
      if (!accessToken) return;

      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userInfo = await userInfoResponse.json();

      setUser({
        name: userInfo.name,
        avatarUrl: userInfo.picture,
      });

  
    }

    handleGoogleResponse();
  }, [response]);

  return (
    <AuthContext.Provider value={{ signIn, isUserLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}
