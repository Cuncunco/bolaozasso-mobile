import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from "native-base";
import { Loading } from "../../components/Loading";
import  SignIn  from "../signIn";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { THEME } from "../../theme";
import  New  from './new';

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

    return (
        <NativeBaseProvider theme={THEME}>
            <AuthContextProvider>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded ? <New /> : <Loading />}
            </AuthContextProvider>
        </NativeBaseProvider>
    )
}