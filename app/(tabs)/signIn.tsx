import { Center, Text, Icon } from "native-base";
import Logo from '.../assets/logo.svg'
import { Button } from "../../components/button";
import { Fontisto } from '@expo/vector-icons'

export function SignIn(){
    return (
            <Center flex={1} bgColor="gray.900" p={7}>
                     
              <Logo width={212} height={40}/>

              <Button 
                title="ENTRAR COM GOOGLE"
                leftIcon={<Icon as ={ Fontisto } name="google" color="white" size="md"/>}
                type="SECONDARY"
                isLoading= {true}
                mt={12}
              />

              <Text color="white" textAlign="center" mt={4}>
                Não utilizaremos nenhuma informação além{'/n'} do seu e-mail para a criação de sua conta.
              </Text>
                
            </Center>
         )
}