import { useRouter } from "expo-router";
import { Box, Center, Text, VStack, useToast, ScrollView } from "native-base";
import { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import Logo from "../../assets/images/logo.svg";
import { Button } from "../../components/button";
import { Input } from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
  const router = useRouter();
  const toast = useToast();
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isWeb = Platform.OS === "web";

  async function handleRegister() {
    try {
      setIsLoading(true);

      await signUp(name, email, password);

      router.replace("/(tabs)/pools");
    } catch (error: any) {
      toast.show({
        title: "Não foi possível criar a conta",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const content = (
    <ScrollView
      flex={1}
      bgColor="gray.900"
      contentContainerStyle={{ flexGrow: 1, padding: 28 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* frame igual tabs: limita largura e centraliza */}
      <Box w="100%" maxW={1500} alignSelf="center" flex={1}>
        <Center flex={1}>
          <Logo width={300} height={200} />

          <VStack w="100%" mt={8} space={3} maxW={520}>
            <Input placeholder="Nome" value={name} onChangeText={setName} />

            <Input
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              placeholder="Senha"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              rightIcon={showPassword ? "eye-off" : "eye"}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
            />

            <Button
              title="CRIAR CONTA"
              onPress={handleRegister}
              isLoading={isLoading}
              isDisabled={isLoading}
            />

            <Button
              title="JÁ TENHO CONTA"
              type="SECONDARY"
              onPress={() => router.push("/(auth)/signIn")}
            />
          </VStack>

          <Text color="gray.400" textAlign="center" mt={6}>
            Crie sua conta para entrar nos bolões.
          </Text>
        </Center>
      </Box>
    </ScrollView>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* no web NÃO use TouchableWithoutFeedback (ele tira foco do input) */}
      {isWeb ? content : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {content}
        </TouchableWithoutFeedback>
      )}
    </KeyboardAvoidingView>
  );
}