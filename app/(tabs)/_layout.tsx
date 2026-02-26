import { Tabs } from "expo-router";
import { PlusCircle, SoccerBall, CalendarBlank, MagnifyingGlass, House } from "phosphor-react-native";
import { LogoTitle } from "../../components/LogoTitle";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#1a1818f6" },
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center",
        headerShadowVisible: false,

        tabBarShowLabel: true, 
        tabBarActiveTintColor: "#F7DD43",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: { 
          position: "absolute",
          backgroundColor: "#1a1818f6",
          height: 70,
          borderTopWidth: 0 }, 
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="bolão"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="new"
        options={{
          title: "new",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} weight="fill" />,
        }}
      />

      <Tabs.Screen
        name="pools"
        options={{
          title: "bolões",
          tabBarIcon: ({ color, size }) => <SoccerBall color={color} size={size} weight="fill" />,
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "calendar",
          tabBarIcon: ({ color, size }) => <CalendarBlank color={color} size={size} weight="fill" />,
        }}
      />

      <Tabs.Screen
        name="find"
        options={{
          title: "find",
          tabBarIcon: ({ color, size }) => <MagnifyingGlass color={color} size={size} weight="fill" />,
        }}
      />
    </Tabs>
  );
}
