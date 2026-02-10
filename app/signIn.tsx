import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from "native-base";
import Logo from '../assets/images/logo.svg';
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";


export default function SignIn(){
    const { signIn, user } = useAuth();


    return (
            <Center flex={1} bgColor="gray.900" p={7}>
                     
              <Logo width={212} height={200}/>

              <Button 
                title="ENTRAR COM GOOGLE"
                leftIcon={<Icon as ={ Fontisto } name="google" color="white" size="md"/>}
                type="SECONDARY"
                mt={12}
                onPress={signIn}
              />

              <Text color="white" textAlign="center" mt={4}>
                Não utilizaremos nenhuma informação além{'\n'} do seu e-mail para a criação de sua conta.
              </Text>
                
            </Center>
         )
}