import { Tabs } from "expo-router";
import { LogoTitle } from "../../components/LogoTitle";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#1a1818f6" },
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center",
        headerShadowVisible: false,

        tabBarStyle: { display: "none" }, 
      }}
    />
  );
}
