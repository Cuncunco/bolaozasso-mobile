import { Heading, useToast, VStack } from "native-base";
import { Button } from "../../components/button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Tabs } from "expo-router";
import { useState } from "react";
import { api } from "@/lib/api";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";

export default function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      const cleanCode = code.trim().toUpperCase();

      if (!cleanCode) {
        toast.show({
          title: "Informe o código",
          placement: "top",
          bgColor: "red.500",
        });
        return;
      }

      await api.post("/pools/join", { code: cleanCode });

      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (err) {
      const error = err as AxiosError<any>;

      console.log("JOIN POOL ERROR:", {
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.data?.message === "Pool not found.") {
        toast.show({
          title: "Bolão não encontrado",
          placement: "top",
          bgColor: "red.500",
        });
        return;
      }

      if (
        error.response?.data?.message ===
        "You already joined this pool."
      ) {
        toast.show({
          title: "Você já está nesse bolão",
          placement: "top",
          bgColor: "red.500",
        });
        return;
      }
      if (error.response?.status === 404) {
        return toast.show({
          title: "Bolão não encontrado",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possivel criar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: false,
        }}
      />
      <VStack flex={1} bgColor="gray.900">
        <Header title="Buscar por código" showBackButton onShare={() => {}}/>

        <VStack mt={8} mx={5} alignItems="center">
          <Heading
            color="white"
            fontSize="xl"
            mb={8}
            textAlign="center"
          >
            Encontre um bolão atráves de {"\n"}
            seu código único
          </Heading>

          <Input
            mb={2}
            placeholder="Qual código do bolão?"
            autoCapitalize="characters"
            onChangeText={setCode}
          />

          <Button
            title="BUSCAR BOLÃO"
            isLoading={isLoading}
            onPress={handleJoinPool}
          />
        </VStack>
      </VStack>
    </>
  );
}