import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";

import { THEME } from "../theme";
import { Footer } from "../components/footer";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;

  SplashScreen.hideAsync();

  return (
    <NativeBaseProvider theme={THEME}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Slot />
        </View>
        <Footer />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090A" },
  content: { flex: 1 },
});
