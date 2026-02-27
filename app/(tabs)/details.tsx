import { Header } from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PoolHeader } from "@/components/PoolHeader";
import { EmptyMyPoolList } from "@/components/EmptyMyPoolList";
import { Loading } from "@/components/Loading";
import { Option } from "@/components/Option";
import { Share } from "react-native";
import { Guesses } from "@/components/Guesses";

type PoolDetails = {
  id: string;
  title: string;
  code: string;
  owner?: { name: string | null };
  participants: Array<{
    id: string;
    user: { avatarUrl: string | null };
  }>;
  _count: { participants: number };
};

export default function Details() {
  const [optionSelected, setOptionSelected] = useState<'Seus palpites' | 'Ranking do grupo'>('Seus palpites')
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [poolDetails, setPoolDetails] = useState<PoolDetails | null>(null);

  const { id } = useLocalSearchParams<{ id: string }>();

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

  useEffect(() => {
    if (typeof id === "string" && id) {
      fetchPoolsDetails(id);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails?.title ?? "Detalhes"}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      


      {isLoading ? (
        <Loading />
      ) : poolDetails ? (
        poolDetails._count.participants > 0 ? (
          <VStack px={5} flex={1}>
           
            <PoolHeader data={poolDetails as any} />
            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option 
            title="Seus palpites"
            isSelected={optionSelected === 'Seus palpites'}
            onPress={() => setOptionSelected('Seus palpites')}
            />
            <Option 
            title="Ranking do grupo" 
            isSelected={optionSelected === 'Ranking do grupo'}
            onPress={() => setOptionSelected('Ranking do grupo')}
            />
            </HStack>
            <Guesses poolId={poolDetails.id}/>
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