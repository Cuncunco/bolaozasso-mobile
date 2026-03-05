import { Avatar, Box, HStack, Text } from "native-base";

type UserMini = {
  id: string;
  avatarUrl?: string | null;
  name?: string | null;
};

type Props = {
  users: UserMini[];
  max?: number; // padrão 3
};

export function ParticipantsAvatars({ users, max = 3 }: Props) {
  const shown = users.slice(0, max);
  const extra = Math.max(0, users.length - max);

  return (
    <HStack alignItems="center">
      {shown.map((u, idx) => (
        <Avatar
          key={u.id}
          size="sm"
          source={u.avatarUrl ? { uri: u.avatarUrl } : undefined}
          bg="gray.600"
          borderWidth={2}
          borderColor="gray.900"
          ml={idx === 0 ? 0 : -3} // sobrepõe
        >
          {(u.name?.[0] ?? "?").toUpperCase()}
        </Avatar>
      ))}

      {extra > 0 && (
        <Box
          ml={-3}
          w={8}
          h={8}
          rounded="full"
          bg="gray.700"
          borderWidth={2}
          borderColor="gray.900"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="xs" fontFamily="heading">
            +{extra}
          </Text>
        </Box>
      )}
    </HStack>
  );
}