import { Slot, useRouter, useSegments } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";

import { THEME } from "../theme";
import { Footer } from "../components/footer";
import { AuthContext, AuthContextProvider } from "@/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

function RouteGuard() {
  const { user, isUserLoading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return;

    const firstSegment = segments?.[0];
    const inAuthGroup = firstSegment === "(auth)";
    const inTabsGroup = firstSegment === "(tabs)";

    // Se não está logado, força ir para o fluxo de auth (register)
    if (!user && !inAuthGroup) {
      router.replace("/(auth)/register");
      return;
    }

    // Se está logado, não deixa ficar no fluxo de auth
    if (user && inAuthGroup) {
      router.replace("/(tabs)/pools");
      return;
    }

    // Se está logado e caiu fora das tabs (ex: "/"), manda para tabs
    if (user && !inTabsGroup) {
      router.replace("/(tabs)/pools");
      return;
    }
  }, [user, isUserLoading, segments]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <RouteGuard />

        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Slot />
          </View>
          <Footer />
        </SafeAreaView>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090A" },
  content: { flex: 1 },
});