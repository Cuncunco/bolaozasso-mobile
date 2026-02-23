import { Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";

const DEV_BYPASS_AUTH = true; 

export default function Index() {
  const { user, isUserLoading } = useAuth();

  if (DEV_BYPASS_AUTH) {
    return <Redirect href="/(tabs)/new" />; 
  }

  if (isUserLoading) return null;

  return user ? <Redirect href="/(tabs)/new" /> : <Redirect href="/signIn" />;
}
