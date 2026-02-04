import { StyleSheet, View } from "react-native";
import Logo from "../assets/images/logo.svg";

export function LogoTitle() {
  return (
    <View style={styles.wrap}>
      <Logo width={280} height={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 40, justifyContent: "center" },
});
