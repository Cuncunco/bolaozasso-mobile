import { Header } from "@/components/Header";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { Image } from "react-native";
import { Button } from "@/components/button";
import { Center, Text, VStack, useToast } from "native-base";

export default function Profile() {
  const toast = useToast();
  const { user, uploadAvatar, signOut } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload() {
  try {
    setIsUploading(true);
    await uploadAvatar();
    toast.show({ title: "Foto atualizada!", placement: "top", bgColor: "green.500" });
  } catch (e:any) {
    toast.show({ title: e?.message ?? "Erro ao enviar foto", placement: "top", bgColor: "red.500" });
  } finally {
    setIsUploading(false);
  }
}

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Perfil" />

      <VStack px={5} pt={6} space={6}>
        <Center>
          <Image
            source={{
              uri:
                user?.avatarUrl ||
                "https://www.gravatar.com/avatar/?d=mp",
            }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />

          <Text color="gray.100" mt={4} fontSize="lg" fontFamily="heading">
            {user?.name ?? "Usuário"}
          </Text>

          <Text color="gray.400">{user?.email}</Text>
        </Center>

        <Button title="Trocar foto" onPress={handleUpload} isLoading={isUploading} isDisabled={isUploading}/>

        <Button title="Sair da conta" type="SECONDARY" onPress={signOut} />
      </VStack>
    </VStack>
  );
}