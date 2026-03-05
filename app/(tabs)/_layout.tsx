import { Tabs } from "expo-router";
import {
  PlusCircle,
  SoccerBall,
  CalendarBlank,
  MagnifyingGlass,
  UserCircle,
} from "phosphor-react-native";
import { Platform } from "react-native";
import { Box } from "native-base";

import { LogoTitle } from "../../components/LogoTitle";

function TabsNavigator() {
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
          // no web deixa relative pra não sobrepor footer
          position: Platform.OS === "web" ? "relative" : "absolute",
          backgroundColor: "#1a1818f6",
          height: 70,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <UserCircle color={color} size={size} weight="fill" />
          ),
        }}
      />

      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="bolão" options={{ href: null }} />

      <Tabs.Screen
        name="new"
        options={{
          title: "Criar",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <PlusCircle color={color} size={size} weight="fill" />
          ),
        }}
      />

      <Tabs.Screen
        name="pools"
        options={{
          title: "Bolões",
          tabBarIcon: ({ color, size }) => (
            <SoccerBall color={color} size={size} weight="fill" />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendario",
          tabBarIcon: ({ color, size }) => (
            <CalendarBlank color={color} size={size} weight="fill" />
          ),
        }}
      />

      <Tabs.Screen
        name="find"
        options={{
          title: "Encontrar",
          tabBarIcon: ({ color, size }) => (
            <MagnifyingGlass color={color} size={size} weight="fill" />
          ),
        }}
      />

      <Tabs.Screen name="details" options={{ href: null }} />
    </Tabs>
  );
}

export default function TabsLayout() {
  // ✅ MOBILE: ocupa a tela toda (full width)
  if (Platform.OS !== "web") {
    return <TabsNavigator />;
  }

  // ✅ WEB: “app em frame” + tabbar reduzida junto
  return (
    <Box flex={1} bg="gray.900" minH="100vh" px={6} pb={8}>
      <Box
        flex={1}
        w="100%"
        maxW={1500}        // 👈 largura estilo celular (mude se quiser)
        alignSelf="center"
        rounded="2xl"
        overflow="hidden" // 👈 corta bordas (header/tabbar ficam dentro)
        
        bg="gray.900"
        shadow={6}
      >
        <TabsNavigator />
      </Box>
    </Box>
  );
}