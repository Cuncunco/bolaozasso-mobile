import { Button, HStack, Text, useTheme, VStack } from "native-base";
import { X, Check, LockSimple } from "phosphor-react-native";
import { getName } from "country-list";

import { Team } from "./Team";

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
  isLoading?: boolean;
}

type ResultProps = {
  firstTeamPoints: number;
  secondTeamPoints: number;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;

  // ✅ novas props
  isLocked?: boolean;
  result?: ResultProps | null;
}

export function Game({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
  isLocked = false,
  result = null,
}: Props) {
  const { colors, sizes } = useTheme();

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor={isLocked ? "gray.600" : "yellow.500"}
      mb={3}
      p={4}
      opacity={isLocked ? 0.9 : 1}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
      </Text>

      {/* se você tiver data no data.date depois, dá pra formatar certinho */}
      <Text color="gray.200" fontSize="xs">
        22 de Novembro de 2022 às 16:00h
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          // ✅ trava input quando encerrado
          isDisabled={isLocked}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          // ✅ trava input quando encerrado
          isDisabled={isLocked}
        />
      </HStack>

      {/* ✅ Mostra resultado oficial */}
      {result && (
        <HStack mt={3} alignItems="center" space={2}>
          <LockSimple color={colors.gray[300]} size={sizes[4]} />
          <Text color="yellow.400" fontSize="xs" fontFamily="heading">
            Resultado oficial: {result.firstTeamPoints} x {result.secondTeamPoints}
          </Text>
        </HStack>
      )}

      {/* ✅ Bloqueado: não mostra confirmar */}
      {isLocked ? (
        <Text color="gray.400" fontSize="xs" mt={3}>
          Palpites encerrados.
        </Text>
      ) : (
        // Só mostra confirmar se ainda não tem palpite salvo e não está bloqueado
        !data.guess && (
          <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={onGuessConfirm} >
            <HStack alignItems="center">
              <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
                CONFIRMAR PALPITE
              </Text>
              <Check color={colors.white} size={sizes[4]} />
            </HStack>
          </Button>
        )
      )}
    </VStack>
  );
}