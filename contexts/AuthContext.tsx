import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/api";
import { saveToken, deleteToken } from "../storage/token";
import { saveUser, deleteUser } from "../storage/user";
import * as ImagePicker from "expo-image-picker";

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

  // ✅ upload real
  uploadAvatar: () => Promise<void>;
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

  // ✅ ao abrir o app: sempre começa deslogado
  useEffect(() => {
    setAuthHeader(null);
    setUser(null);
    setIsUserLoading(false);
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
    } catch (err) {
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signUp(name: string | undefined, email: string, password: string) {
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

  // ✅ UPLOAD de avatar (multipart)
  async function uploadAvatar() {
    if (!user) throw new Error("Você precisa estar logado.");

    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      throw new Error("Permissão da galeria negada.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const uri = asset.uri;

    const filename = uri.split("/").pop() || "avatar.jpg";
    const ext = (filename.split(".").pop() || "jpg").toLowerCase();

    const mime =
      ext === "png"
        ? "image/png"
        : ext === "webp"
        ? "image/webp"
        : "image/jpeg";

    const form = new FormData();
    form.append("avatar", {
      uri,
      name: filename,
      type: mime,
    } as any);

    const { data } = await api.post<{ user: UserProps }>("/me/avatar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // atualiza contexto + storage
    await saveUser(data.user);
    setUser(data.user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
        signUp,
        signOut,
        uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}