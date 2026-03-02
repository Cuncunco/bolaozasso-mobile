import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Center, Text, useToast } from "native-base";
import { api } from "@/lib/api";

import { Game } from "./Game";
import { Loading } from "@/components/Loading";
import { GAMES } from "@/constants/games";

interface Props {
  poolId: string;
}

type ScoreMap = Record<
  string,
  { firstTeamPoints: string; secondTeamPoints: string }
>;

export function Guesses({ poolId }: Props) {
  const toast = useToast();

  // lista fixa (por enquanto)
  const games = useMemo(() => GAMES, []);

  // placar por jogo
  const [scores, setScores] = useState<ScoreMap>({});

  const isLoading = false;
  if (isLoading) return <Loading />;

  function setFirst(gameId: string, value: string) {
    setScores((prev) => ({
      ...prev,
      [gameId]: {
        firstTeamPoints: value,
        secondTeamPoints: prev[gameId]?.secondTeamPoints ?? "",
      },
    }));
  }

  function setSecond(gameId: string, value: string) {
    setScores((prev) => ({
      ...prev,
      [gameId]: {
        firstTeamPoints: prev[gameId]?.firstTeamPoints ?? "",
        secondTeamPoints: value,
      },
    }));
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      const firstTeamPoints = scores[gameId]?.firstTeamPoints ?? "";
      const secondTeamPoints = scores[gameId]?.secondTeamPoints ?? "";

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Informe o placar do palpite",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(
  `/pools/${poolId}/games/${gameId}/guesses`,
  {
    firstTeamPoints: Number(firstTeamPoints),
    secondTeamPoints: Number(secondTeamPoints),
  },

)

      toast.show({
        title: "Palpite enviado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possivel enviar o palpite",
        placement: "top",
        bgColor: "red.500",
      });
      
    }
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item as any}
          setFirstTeamPoints={(value) => setFirst(item.id, value)}
          setSecondTeamPoints={(value) => setSecond(item.id, value)}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => (
        <Center mt={10}>
          <Text color="gray.300">Nenhum jogo encontrado.</Text>
        </Center>
      )}
      contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
}