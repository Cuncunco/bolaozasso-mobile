import { HStack, Text, VStack } from "native-base";
import { ParticipantsAvatars } from "./ParticipantsAvatars";

type PoolHeaderData = {
  title: string;
  code: string;
  participants: Array<{
    id: string; // id do participant
    user: {
      avatarUrl: string | null;
      // se você tiver name/id no user, melhor ainda:
      id?: string;
      name?: string | null;
    };
  }>;
  _count: { participants: number };
};

interface Props {
  data: PoolHeaderData;
}

export function PoolHeader({ data }: Props) {
  // ✅ transforma participants em array de users pro componente
  const users = (data.participants ?? []).map((p, index) => ({
    id: p.user.id ?? p.id ?? String(index),
    avatarUrl: p.user.avatarUrl,
    name: p.user.name ?? null,
  }));

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      mb={5}
    >
      <VStack>
        <Text color="white" fontFamily="heading" fontSize="md">
          {data.title}
        </Text>

        <Text color="gray.200" fontSize="sm">
          Código:{" "}
          <Text color="gray.100" fontFamily="heading">
            {data.code}
          </Text>
        </Text>
      </VStack>

      {/* ✅ 3 avatares + excedentes */}
      <ParticipantsAvatars users={users} max={3} />
    </HStack>
  );
}