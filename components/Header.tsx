import { Text, HStack, Box } from "native-base";
import { CaretLeft, Export } from "phosphor-react-native";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

import { ButtonIcon } from "./ButtonIcon";

interface Props {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  onShare?: () => void;
  onBack?: () => void;
}

export function Header({
  title,
  showBackButton = false,
  showShareButton = false,
  onShare,
  onBack,
}: Props) {
  const router = useRouter();

  const EmptyBoxSpace = () => <Box w={6} h={6} />;

  function handleBack() {
    if (onBack) return onBack();
    router.back();
  }

  return (
    <HStack
      w="full"
      bgColor="gray.800"
      px={5}
      // no mobile dá um respiro pro status bar
      // no web fica colado no topo
      pt={Platform.OS === "web" ? 3 : 10}
      pb={3}
      alignItems="center"
    >
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {showBackButton ? (
          <ButtonIcon icon={CaretLeft} onPress={handleBack} />
        ) : (
          <EmptyBoxSpace />
        )}

        <Text
          color="white"
          fontFamily="medium"
          fontSize="md"
          textAlign="center"
          numberOfLines={1}
        >
          {title}
        </Text>

        {showShareButton ? (
          <ButtonIcon icon={Export} onPress={() => onShare?.()} />
        ) : (
          <EmptyBoxSpace />
        )}
      </HStack>
    </HStack>
  );
}