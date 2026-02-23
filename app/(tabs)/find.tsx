import { Heading, VStack } from "native-base";
import { Button } from "../../components/button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Tabs } from "expo-router";

export default function Find() {
  return (
    <>
    <Tabs.Screen
        options={{
          headerShown: false,
        }}
      />
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão atráves de {"\n"}
          seu código único
        </Heading>
        <Input mb={2} placeholder="Qual código do bolão?" />
        <Button title="BUSCAR BOLÃO" />
      </VStack>
    </VStack>
    </>
  );
}
