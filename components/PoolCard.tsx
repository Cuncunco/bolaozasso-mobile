import { HStack, Text, VStack, Pressable, Avatar } from "native-base";

export interface PoolProps {
  id: string;
  title: string;
  code: string;
  owner?: {
    name: string | null;
  };
  participants: {
    id: string;
    user: {
      avatarUrl: string | null;
    };
  }[];
  _count: {
    participants: number;
  };
}

interface Props {
  data: PoolProps;
  onPress: () => void;
}

export function PoolCard({ data, onPress }: Props) {
  const participants = data.participants ?? [];

  const visibleParticipants = participants.slice(0, 3);
  const extraCount = participants.length - 3;

  return (
    <Pressable
      onPress={onPress}
      bgColor="gray.800"
      rounded="sm"
      borderBottomWidth={2}
      borderBottomColor="yellow.500"
      p={4}
      mb={3}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text color="gray.100" fontSize="md" fontFamily="heading">
            {data.title}
          </Text>

          <Text color="gray.300" fontSize="sm">
            Criado por {data.owner?.name ?? "Desconhecido"}
          </Text>
        </VStack>

        <HStack space={-2}>
          {visibleParticipants.map((participant) => (
            <Avatar
              key={participant.id}
              source={{
                uri:
                  participant.user.avatarUrl ??
                  "https://i.pravatar.cc/100",
              }}
              borderWidth={2}
              borderColor="gray.800"
              size="sm"
            />
          ))}

          {extraCount > 0 && (
            <Avatar
              bg="gray.600"
              size="sm"
              borderWidth={2}
              borderColor="gray.800"
            >
              <Text color="white" fontSize="xs">
                +{extraCount}
              </Text>
            </Avatar>
          )}
        </HStack>
      </HStack>
    </Pressable>
  );
}