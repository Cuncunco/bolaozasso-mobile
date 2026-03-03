import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, RefreshControl } from "react-native";
import { FlatList } from "react-native";
import { Avatar, Center, HStack, Text, VStack, useToast } from "native-base";
import { api } from "@/lib/api";
import { Loading } from "@/components/Loading";

type RankingItem = {
  position: number;
  participantId: string;
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  };
  points: number;
  guessesCount: number;
  scoredGuessesCount: number;
};

interface Props {
  poolId: string;
}

function calcAccuracy(points: number, scoredGuessesCount: number) {
  if (!scoredGuessesCount) return null;
  const max = scoredGuessesCount * 3;
  const pct = Math.round((points / max) * 100);
  return Math.max(0, Math.min(100, pct));
}

function medalEmoji(position: number) {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  return null;
}

function medalBg(position: number) {
  if (position === 1) return "yellow.500";
  if (position === 2) return "gray.300";
  if (position === 3) return "orange.500";
  return "gray.700";
}

export function Ranking({ poolId }: Props) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  const anim = useRef(new Animated.Value(0)).current;

  const leader = useMemo(() => ranking[0] ?? null, [ranking]);

  const fetchRanking = useCallback(async () => {
    const { data } = await api.get<{ ranking: RankingItem[] }>(
      `/pools/${poolId}/ranking`
    );
    setRanking(data.ranking ?? []);
  }, [poolId]);

  async function load(initial = false) {
    try {
      if (initial) setIsLoading(true);
      await fetchRanking();

      // animação simples ao carregar
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.log("RANKING ERROR:", error);
      toast.show({
        title: "Não foi possível carregar o ranking",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      if (initial) setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!poolId) return;
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId]);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await load(false);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const listHeader = useMemo(() => {
    if (!leader) {
      return (
        <VStack mb={4}>
          <Text color="gray.200" fontSize="md" fontWeight="bold">
            Ranking
          </Text>
          <Text color="gray.400" fontSize="xs">
            Puxe para atualizar.
          </Text>
        </VStack>
      );
    }

    const acc = calcAccuracy(leader.points, leader.scoredGuessesCount);

    return (
      <VStack mb={4}>
        <Text color="gray.200" fontSize="md" fontWeight="bold">
          Líder do bolão 🏆
        </Text>

        <Animated.View
          style={{
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}
        >
          <HStack
            bgColor="gray.800"
            rounded="sm"
            p={4}
            mt={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" space={3} flex={1}>
              <Center w={10} h={10} rounded="full" bgColor={medalBg(1)}>
                <Text color="gray.900" fontWeight="bold">
                  🥇
                </Text>
              </Center>

              <Avatar
                size="md"
                source={
                  leader.user.avatarUrl ? { uri: leader.user.avatarUrl } : undefined
                }
                bg="gray.600"
              >
                {leader.user.name?.[0]?.toUpperCase() ?? "?"}
              </Avatar>

              <VStack flex={1}>
                <Text color="gray.100" fontWeight="bold" numberOfLines={1}>
                  {leader.user.name ?? "Sem nome"}
                </Text>

                <Text color="gray.400" fontSize="xs">
                  {leader.points} pts • {leader.guessesCount} palpites •{" "}
                  {leader.scoredGuessesCount} com resultado
                </Text>

                <Text color="gray.400" fontSize="xs">
                  Aproveitamento:{" "}
                  <Text color="gray.200" fontWeight="bold">
                    {acc === null ? "-" : `${acc}%`}
                  </Text>
                </Text>
              </VStack>
            </HStack>

            <VStack alignItems="flex-end">
              <Text color="green.400" fontWeight="bold" fontSize="2xl">
                {leader.points}
              </Text>
              <Text color="gray.400" fontSize="xs">
                pontos
              </Text>
            </VStack>
          </HStack>
        </Animated.View>

        <Text color="gray.400" fontSize="xs" mt={3}>
          Regra: 3 pontos no placar exato • 1 ponto no vencedor/empate
        </Text>
      </VStack>
    );
  }, [leader, anim]);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={ranking}
      keyExtractor={(item) => item.participantId}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }}
      ListHeaderComponent={listHeader}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => (
        <Center mt={10}>
          <Text color="gray.300">Nenhum participante no ranking.</Text>
        </Center>
      )}
      renderItem={({ item }) => {
        const medal = medalEmoji(item.position);
        const acc = calcAccuracy(item.points, item.scoredGuessesCount);

        return (
          <Animated.View
            style={{
              opacity: anim,
              transform: [
                {
                  translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [6, 0],
                  }),
                },
              ],
            }}
          >
            <HStack
              bgColor="gray.800"
              rounded="sm"
              p={3}
              mb={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack alignItems="center" space={3} flex={1}>
                <Center
                  w={8}
                  h={8}
                  rounded="full"
                  bgColor={item.position <= 3 ? medalBg(item.position) : "gray.700"}
                >
                  <Text
                    color={item.position <= 3 ? "gray.900" : "gray.200"}
                    fontWeight="bold"
                  >
                    {medal ?? item.position}
                  </Text>
                </Center>

                <Avatar
                  size="sm"
                  source={item.user.avatarUrl ? { uri: item.user.avatarUrl } : undefined}
                  bg="gray.600"
                >
                  {item.user.name?.[0]?.toUpperCase() ?? "?"}
                </Avatar>

                <VStack flex={1}>
                  <Text color="gray.100" fontWeight="bold" numberOfLines={1}>
                    {item.user.name ?? "Sem nome"}
                  </Text>

                  <Text color="gray.400" fontSize="xs">
                    {item.guessesCount} palpites • {item.scoredGuessesCount} com resultado
                    {acc !== null ? ` • ${acc}%` : ""}
                  </Text>
                </VStack>
              </HStack>

              <VStack alignItems="flex-end">
                <Text color="green.400" fontWeight="bold" fontSize="lg">
                  {item.points}
                </Text>
                <Text color="gray.400" fontSize="xs">
                  pontos
                </Text>
              </VStack>
            </HStack>
          </Animated.View>
        );
      }}
    />
  );
}