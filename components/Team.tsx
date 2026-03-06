import { HStack, Text } from "native-base";
import CountryFlag from "react-native-country-flag";

import { Input } from "./Input";

interface Props {
  code: string;
  position: "left" | "right";
  onChangeText?: (value: string) => void;
  isDisabled?: boolean;
  value?: string;
  showInput?: boolean;
}

export function Team({
  code,
  position,
  onChangeText,
  isDisabled = false,
  value,
  showInput = true,
}: Props) {
  return (
    <HStack alignItems="center">
      {position === "left" && (
        <CountryFlag
          isoCode={code}
          size={40}
          style={{ marginRight: 12 }}
        />
      )}

      {showInput ? (
        <Input
          w={12}
          h={10}
          textAlign="center"
          fontSize="sm"
          keyboardType="numeric"
          onChangeText={onChangeText}
          isDisabled={isDisabled}
          borderWidth={2}
          borderColor="gray.500"
          bg="gray.900"
          _focus={{
            borderColor: "yellow.500",
          }}
        />
      ) : (
        <Text
          w={12}
          textAlign="center"
          fontSize="2xl"
          fontFamily="heading"
          color="white"
        >
          {value ?? "-"}
        </Text>
      )}

      {position === "right" && (
        <CountryFlag
          isoCode={code}
          size={40}
          style={{ marginLeft: 12 }}
        />
      )}
    </HStack>
  );
}