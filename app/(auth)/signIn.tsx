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

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();
  const { signIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isWeb = Platform.OS === "web";

  async function handleSignIn() {
    try {
      setIsLoading(true);

      await signIn(email, password);

      router.replace("/(tabs)/pools");
    } catch (error) {
      toast.show({
        title: "E-mail ou senha inválidos",
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
      <Box w="100%" maxW={1500} alignSelf="center" flex={1}>
        <Center flex={1}>
          <Logo width={300} height={200} />

          <VStack w="100%" mt={8} space={3} maxW={520}>
            <Input
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />

            <Input
              placeholder="Senha"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
              rightIcon={showPassword ? "eye-off" : "eye"}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
            />

            <Button
              title="ENTRAR"
              onPress={handleSignIn}
              isLoading={isLoading}
              isDisabled={isLoading}
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
      </Box>
    </ScrollView>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isWeb ? content : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {content}
        </TouchableWithoutFeedback>
      )}
    </KeyboardAvoidingView>
  );
}