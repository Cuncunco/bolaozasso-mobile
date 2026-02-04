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
    alignItems: "center",
    justifyContent: "center",

    
    backgroundColor: "#09090A", 

    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  text: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
});
