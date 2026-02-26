import { useRouter } from "expo-router";
import { Center, Heading, Text, VStack, useToast } from "native-base";
import { useContext, useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { Button } from "../../components/button";
import { Input } from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
  const router = useRouter();
  const toast = useToast();
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      setIsLoading(true);

      await signUp(name.trim() ? name.trim() : undefined, email, password);

      toast.show({
        title: "Conta criada com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      router.replace("/(tabs)/pools");
    } catch (error: any) {
      console.log("REGISTER ERROR:", error?.response?.data || error);

      // Mantendo simples: mostra mensagem padrão
      toast.show({
        title: "Não foi possível criar sua conta",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={300} height={200} />

      <Heading color="white" mt={6} mb={6}>
        Criar conta
      </Heading>

      <VStack w="100%" space={3}>
        <Input
          placeholder="Nome (opcional)"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />

        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Senha (mínimo 6)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="CRIAR CONTA" isLoading={isLoading} onPress={handleRegister} />

        <Button
          title="JÁ TENHO CONTA"
          type="SECONDARY"
          onPress={() => router.replace("/(auth)/signIn")}
        />
      </VStack>

      <Text color="gray.400" textAlign="center" mt={6}>
        Ao criar a conta, você poderá entrar em bolões com código.
      </Text>
    </Center>
  );
}