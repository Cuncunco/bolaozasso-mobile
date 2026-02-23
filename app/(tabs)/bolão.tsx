import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "native-base";
import { Loading } from "../../components/Loading";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { Slot, Tabs } from "expo-router";
import Find from "./find";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <>
    <Tabs.Screen
        options={{
          headerShown: false,
        }}
      />
    
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Find /> : <Loading />}
      </AuthContextProvider>
    </>
  );
}
