import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.800"
      h={14}
      px={4}
      borderWidth={1}
      borderColor="gray.600"
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      // ✅ foco somente com borda (números)
      _focus={{
        bg: "gray.800",
        borderColor: "yellow.500",
        borderWidth: 1,
      }}
      {...rest}
    />
  );
}