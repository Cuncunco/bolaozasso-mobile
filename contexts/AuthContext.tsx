import * as ImagePicker from "expo-image-picker";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api, withRetry } from "../lib/api";
import { deleteToken, getToken, saveToken } from "../storage/token";
import { deleteUser, getUser, saveUser } from "../storage/user";

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

  useEffect(() => {
    async function loadAuth() {
      try {
        const token = await getToken();
        const storedUser = await getUser();

        if (token) setAuthHeader(token);
        if (storedUser) setUser(storedUser);
      } finally {
        setIsUserLoading(false);
      }
    }

    loadAuth();
  }, []);

  async function signIn(email: string, password: string) {
    setIsUserLoading(true);

    try {
      const { data } = await withRetry(
        () =>
          api.post<AuthResponse>("/login", {
            email,
            password,
          }),
        { retries: 2, delayMs: 1400 }
      );

      await saveToken(data.token);
      await saveUser(data.user);

      setAuthHeader(data.token);
      setUser(data.user);
    } catch (err: any) {
      console.log("SIGN IN ERROR:", {
        status: err?.response?.status,
        data: err?.response?.data,
        message: err?.message,
      });
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signUp(name: string | undefined, email: string, password: string) {
    setIsUserLoading(true);

    try {
      // No seu backend o cadastro é /register (pelo print do Insomnia)
      await withRetry(
        () =>
          api.post("/register", {
            name,
            email,
            password,
          }),
        { retries: 2, delayMs: 1400 }
      );

      await signIn(email, password);
    } catch (err: any) {
      console.log("SIGN UP ERROR:", {
        status: err?.response?.status,
        data: err?.response?.data,
        message: err?.message,
      });
      throw err;
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

    const { data } = await withRetry(
      () =>
        api.post<{ user: UserProps }>("/me/avatar", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      { retries: 2, delayMs: 1400 }
    );

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