import { Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Center, Icon, Text } from "native-base";
import { useContext } from "react";
import Logo from "../assets/images/logo.svg";
import { Button } from "../components/button";
import { AuthContext } from "../contexts/AuthContext";

export default function SignIn() {
  const router = useRouter();

  const ctx = useContext(AuthContext);
  console.log("AUTH CTX =>", ctx);

  const { signIn } = useContext(AuthContext);

  async function handleSignIn() {
    const ok = await signIn("teste@teste.com", "123456");
    if (ok !== undefined) {
      router.replace("/(tabs)");
    }
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
