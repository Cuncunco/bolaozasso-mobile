import { StyleSheet, Text, View } from "react-native";

export function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2026 - Bolãozasso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 250, 250, 0)",
    backgroundColor: "#ffffff00",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    opacity: 0.7,
  },
});
