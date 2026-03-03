import { Ranking } from "../../components/Ranking";
import { Header } from "@/components/Header";
import { useLocalSearchParams, useFocusEffect, useRouter } from "expo-router";
import { HStack, useToast, VStack } from "native-base";
import { useCallback, useEffect, useState, useContext } from "react";
import { api } from "@/lib/api";
import { PoolHeader } from "@/components/PoolHeader";
import { EmptyMyPoolList } from "@/components/EmptyMyPoolList";
import { Loading } from "@/components/Loading";
import { Option } from "@/components/Option";
import { Share, Alert } from "react-native";
import { Guesses } from "@/components/Guesses";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/button";

type PoolDetails = {
  id: string;
  title: string;
  code: string;
  owner?: { name: string | null };
  ownerId: string | null;
  participants: Array<{
    id: string;
    user: { avatarUrl: string | null };
  }>;
  _count: { participants: number };
};

export default function Details() {
  const [optionSelected, setOptionSelected] = useState<
    "Seus palpites" | "Ranking do grupo"
  >("Seus palpites");

  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user } = useContext(AuthContext);
  const toast = useToast();
  const router = useRouter();

  const [poolDetails, setPoolDetails] = useState<PoolDetails | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  const isOwner =
    !!user?.id && !!poolDetails?.ownerId && poolDetails.ownerId === user.id;

  function handleBack() {
    // ✅ volta sempre pros bolões
    router.replace("/(tabs)/pools");
  }

  async function handleCodeShare() {
    const code = poolDetails?.code;

    if (!code) {
      toast.show({
        title: "Carregando código do bolão...",
        placement: "top",
        bgColor: "red.500",
      });
      return;
    }

    await Share.share({ message: code });
  }

  async function fetchPoolsDetails(poolId: string) {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log("POOL DETAILS ERROR:", error);

      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmDelete() {
    if (!poolDetails?.id) return;

    Alert.alert(
      "Apagar bolão",
      "Tem certeza que deseja apagar este bolão?\n\nEssa ação é permanente e apagará todos os participantes e palpites.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/pools/${poolDetails.id}`);

              toast.show({
                title: "Bolão apagado com sucesso",
                placement: "top",
                bgColor: "green.500",
              });

              router.replace("/(tabs)/pools");
            } catch (error) {
              console.log("DELETE POOL ERROR:", error);

              toast.show({
                title: "Não foi possível apagar o bolão",
                placement: "top",
                bgColor: "red.500",
              });
            }
          },
        },
      ]
    );
  }

  useEffect(() => {
    if (typeof id === "string" && id) {
      fetchPoolsDetails(id);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  function handleChangeOption(option: "Seus palpites" | "Ranking do grupo") {
    setOptionSelected(option);
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails?.title ?? "Detalhes"}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
        onBack={() => router.replace("/(tabs)/pools")}
      />

      {isLoading ? (
        <Loading />
      ) : poolDetails ? (
        poolDetails._count.participants > 0 ? (
          <VStack px={5} flex={1}>
            <PoolHeader data={poolDetails as any} />

            {isOwner && (
              <Button
                title="Apagar bolão"
                type="SECONDARY"
                onPress={confirmDelete}
                mb={4}
                 isLoading={isDeleting}
                isDisabled={isDeleting}
              />
            )}

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus palpites"
                isSelected={optionSelected === "Seus palpites"}
                onPress={() => handleChangeOption("Seus palpites")}
              />
              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === "Ranking do grupo"}
                onPress={() => handleChangeOption("Ranking do grupo")}
              />
            </HStack>

            {optionSelected === "Seus palpites" ? (
              <Guesses poolId={poolDetails.id} isOwner={isOwner} />
            ) : (
              <Ranking key={`ranking-${refreshKey}`} poolId={poolDetails.id} />
            )}
          </VStack>
        ) : (
          <EmptyMyPoolList code={poolDetails.code} />
        )
      ) : (
        <EmptyMyPoolList code="" />
      )}
    </VStack>
  );
}