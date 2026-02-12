import { Fontisto } from "@expo/vector-icons";
import { Center, Text, Icon } from "native-base";
import Logo from "../assets/images/logo.svg";
import { Button } from "../components/button";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function SignIn() {
  const { signIn, user } = useContext(AuthContext); 

  async function handleSignIn() {
    const ok = await signIn(); 
    if (ok) router.replace("/(tabs)");
  }

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={300} height={200} />

      <Button
        title="ENTRAR COM GOOGLE"
        onPress={handleSignIn}
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
      />

      <Text color="white" textAlign="center" mt={5}>
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação de
        sua conta.
      </Text>
    </Center>
  );
}
