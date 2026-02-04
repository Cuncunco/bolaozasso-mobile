import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, Center } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from "../../components/Loading";
import { SignIn } from "./signIn"

import { THEME } from "../../theme";

export default function App(){
    const [fontsLoaded] = useFonts ({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})

    return (
        <NativeBaseProvider theme={THEME}>
                {fontsLoaded ? <SignIn /> : <Loading/> }        
        </NativeBaseProvider>
    )
}