import { Octicons } from "@expo/vector-icons";
import { Icon, VStack } from "native-base";
import { Button } from "../../components/button";
import { Header } from "../../components/Header";

export default function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" />}
        />
      </VStack>
    </VStack>
  );
}
