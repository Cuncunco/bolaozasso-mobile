import { useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import {
  Center,
  HStack,
  Input,
  Modal,
  Text,
  VStack,
  useToast,
} from "native-base";
import { api } from "@/lib/api";

import { Game } from "./Game";
import { GAMES } from "@/constants/games";
import { Button } from "@/components/button";

interface Props {
  poolId: string;
  isOwner?: boolean;
}

type ScoreMap = Record<
  string,
  { firstTeamPoints: string; secondTeamPoints: string }
>;

type GameResult = {
  gameId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
};

export function Guesses({ poolId, isOwner = false }: Props) {
  const toast = useToast();

  const games = useMemo(() => GAMES, []);

  const [scores, setScores] = useState<ScoreMap>({});

  const [resultsMap, setResultsMap] = useState<Record<string, GameResult>>({});
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [resultFirst, setResultFirst] = useState("");
  const [resultSecond, setResultSecond] = useState("");

 const [loadingGameId, setLoadingGameId] = useState<string | null>(null);

  async function fetchResults() {
    try {
      const { data } = await api.get<{ results: GameResult[] }>(
        `/pools/${poolId}/results`
      );

      const map: Record<string, GameResult> = {};
      for (const r of data.results ?? []) map[r.gameId] = r;
      setResultsMap(map);
    } catch (error) {
      // se a rota não existir ainda, vai cair aqui
      console.log("FETCH RESULTS ERROR:", error);
    }
  }

  useEffect(() => {
    if (poolId) fetchResults();
  }, [poolId]);

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
      setLoadingGameId(gameId);
      if (resultsMap[gameId]) {
        return toast.show({
          title: "Palpites encerrados: resultado já definido.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      const firstTeamPoints = scores[gameId]?.firstTeamPoints ?? "";
      const secondTeamPoints = scores[gameId]?.secondTeamPoints ?? "";

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Informe o placar do palpite",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

        toast.show({ title: "Palpite enviado!", placement: "top", bgColor: "green.500" });
  } catch (e) {
    toast.show({ title: "O jogo já foi finalizado.", placement: "top", bgColor: "red.500" });
  } finally {
    setLoadingGameId(null);
  }
}

  function openResultModal(gameId: string) {
    setSelectedGameId(gameId);

    const existing = resultsMap[gameId];
    setResultFirst(existing ? String(existing.firstTeamPoints) : "");
    setResultSecond(existing ? String(existing.secondTeamPoints) : "");

    setIsResultModalOpen(true);
  }

  async function handleSaveResult() {
    if (!selectedGameId) return;

    try {
      if (resultFirst.trim() === "" || resultSecond.trim() === "") {
        return toast.show({
          title: "Informe o resultado (os dois placares)",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.put(`/pools/${poolId}/games/${selectedGameId}/result`, {
        firstTeamPoints: Number(resultFirst),
        secondTeamPoints: Number(resultSecond),
      });

      toast.show({
        title: "Resultado definido!",
        placement: "top",
        bgColor: "green.500",
      });

      setIsResultModalOpen(false);
      setSelectedGameId(null);
      setResultFirst("");
      setResultSecond("");

      await fetchResults();
    } catch (error: any) {
      console.log("SAVE RESULT ERROR:", error);

      const msg =
        error?.response?.data?.message ?? "Erro ao definir resultado";

      toast.show({
        title: msg,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function handleReopenGame(gameId: string) {
    try {
      await api.delete(`/pools/${poolId}/games/${gameId}/result`);

      toast.show({
        title: "Jogo reaberto! Palpites liberados.",
        placement: "top",
        bgColor: "yellow.500",
      });

      await fetchResults();
    } catch (error: any) {
      console.log("REOPEN ERROR:", error);

      const msg =
        error?.response?.data?.message ?? "Erro ao reabrir o jogo";

      toast.show({
        title: msg,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }


  return (
    <>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const result = resultsMap[item.id];
          const isLocked = !!result;

          return (
            <VStack mb={3}>
              <Game
                data={item as any}
                setFirstTeamPoints={(value) => setFirst(item.id, value)}
                setSecondTeamPoints={(value) => setSecond(item.id, value)}
                onGuessConfirm={() => handleGuessConfirm(item.id)}
                isLocked={isLocked}
                result={
                  result
                    ? {
                        firstTeamPoints: result.firstTeamPoints,
                        secondTeamPoints: result.secondTeamPoints,
                      }
                    : null
                }
              />

              {isOwner && (
                <HStack mt={2} space={2}>
                  <Button
                    title={result ? "Editar resultado" : "Definir resultado"}
                    onPress={() => openResultModal(item.id)}
                  />
                  {result && (
                    <Button
                      title="Reabrir"
                      type="SECONDARY"
                      onPress={() => handleReopenGame(item.id)}
                    />
                  )}
                </HStack>
              )}
            </VStack>
          );
        }}
        ListEmptyComponent={() => (
          <Center mt={10}>
            <Text color="gray.300">Nenhum jogo encontrado.</Text>
          </Center>
        )}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Definir resultado</Modal.Header>

          <Modal.Body>
            <VStack space={3}>
              <Input
                placeholder="Placar time 1"
                keyboardType="numeric"
                value={resultFirst}
                onChangeText={setResultFirst}
              />
              <Input
                placeholder="Placar time 2"
                keyboardType="numeric"
                value={resultSecond}
                onChangeText={setResultSecond}
              />
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <Button title="Salvar" onPress={handleSaveResult} />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}