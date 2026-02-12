import { useContext } from "react";
import { Center, Text, Icon } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";

import { AuthContext } from "../contexts/AuthContext";
import Logo from "../assets/images/logo.svg";
import { Button } from "../components/button";

export default function SignIn() {
    const ctx = useContext(AuthContext);
    console.log("AUTH CTX =>", ctx);

  const { signIn } = useContext(AuthContext);

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
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail.
      </Text>
    </Center>
  );
}
