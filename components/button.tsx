import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface Props extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}

export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  const isSecondary = type === "SECONDARY";

  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={isSecondary ? "red.500" : "yellow.500"}

      _hover={{
        bg: isSecondary ? "red.600" : "yellow.600" // 👈 hover mais escuro
      }}

      _pressed={{
        bg: isSecondary ? "red.700" : "yellow.700",
      }}

      _loading={{
        _spinner: { color: "black" },
      }}

      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={isSecondary ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}