import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Footer } from "../components/footer";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fbfbfb" },
  content: { flex: 1 },
});
