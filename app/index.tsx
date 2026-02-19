import { Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";

const DEV_BYPASS_AUTH = true; // <-- mude pra false quando voltar o login

export default function Index() {
  const { user, isUserLoading } = useAuth();

  if (DEV_BYPASS_AUTH) {
    return <Redirect href="/(tabs)/pools" />; // ou "/(tabs)" se quiser abrir a aba
  }

  if (isUserLoading) return null;

  return user ? <Redirect href="/(tabs)/pools" /> : <Redirect href="/signIn" />;
}
