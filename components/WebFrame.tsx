// components/WebFrame.tsx
import { ReactNode } from "react";
import { Platform } from "react-native";
import { Box } from "native-base";

type Props = {
  children: ReactNode;
  maxW?: number;
  withCard?: boolean;
  variant?: "auth" | "tabs";
};

export function WebFrame({
  children,
  maxW = 1100,
  withCard = false,
  variant = "tabs",
}: Props) {
  const isWeb = Platform.OS === "web";
  if (!isWeb) return <>{children}</>;

  const px = 24;
  const py = variant === "auth" ? 32 : 0;

  return (
    <Box flex={1} bg="gray.900" minH="100vh" pb={6}>
     
      <Box flex={1} px={px} py={py}>
     
        <Box w="100%" maxW={maxW} alignSelf="center" flex={1}>
          {withCard ? (
            <Box
              flex={1}
              bg="gray.800"
              borderWidth={1}
              borderColor="gray.700"
              rounded="2xl"
              px={6}
              py={6}
              shadow={6}
            >
              {children}
            </Box>
          ) : (
            <Box flex={1}>{children}</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}