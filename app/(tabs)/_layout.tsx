import { Tabs } from "expo-router";
import { LogoTitle } from "../../components/LogoTitle";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffffc9" },
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center",
        headerShadowVisible: false,

        tabBarStyle: { display: "none" }, 
      }}
    />
  );
}
