import { Heading, VStack } from "native-base";
import Logo from "../../assets/images/logo.svg";
import { Header } from "../../components/Header";

export default function New() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo height={110} width={210}/>

        <Heading
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu proprio bolão da copa e compartilhe entre amigos!
        </Heading>
      </VStack>
    </VStack>
  );
}
