import {
  Input as NativeBaseInput,
  IInputProps,
  Icon,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

interface Props extends IInputProps {
  rightIcon?: "eye" | "eye-off";
  onTogglePassword?: () => void;
}

export function Input({
  rightIcon,
  onTogglePassword,
  ...rest
}: Props) {
  return (
    <NativeBaseInput
      bg="gray.800"
      h={14}
      px={4}
      borderWidth={0}
      rounded="sm"
      fontSize="md"
      color="gray.100"
      placeholderTextColor="gray.400"
      _focus={{
        bg: "gray.700",
      }}
      InputRightElement={
        rightIcon ? (
          <TouchableOpacity onPress={onTogglePassword}>
            <Icon
              as={rightIcon === "eye" ? Eye : EyeSlash}
              color="gray.400"
              mr={3}
            />
          </TouchableOpacity>
        ) : undefined
      }
      {...rest}
    />
  );
}