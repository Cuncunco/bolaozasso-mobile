import { useRouter } from "expo-router";
import { Center, Text, VStack } from "native-base";
import { useContext, useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { Button } from "../../components/button";
import { Input } from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    try {
      setIsLoading(true);

      await signIn(email, password);

      router.replace("/(tabs)/pools");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={300} height={200} />

      <VStack w="100%" mt={8} space={3}>
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <Input
          placeholder="Senha"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <Button
          title="ENTRAR"
          onPress={handleSignIn}
          isLoading={isLoading}
        />

        <Button
          title="CRIAR CONTA"
          type="SECONDARY"
          onPress={() => router.push("./register")}
        />
      </VStack>

      <Text color="gray.400" textAlign="center" mt={6}>
        Use seu e-mail e senha cadastrados.
      </Text>
    </Center>
  );
}