import { ScrollView, Text, VStack } from "native-base";
import { calendar } from "../../constants/calendar";
import { CardDay } from "../../components/CardDay";

export default function Calendar() {
  return (
    <ScrollView flex={1} bg="gray.950">
      <VStack px={4} space={4} pb={8}>
        <Text
          color="white"
          fontSize="xl"
          fontFamily="heading"
          textAlign="center"
          mt={4}
          mb={2}
        >
          CALENDÁRIO
        </Text>

        {calendar.map((card) => (
          <CardDay key={`${card.date}-${card.day}`} card={card} />
        ))}
      </VStack>
    </ScrollView>
  );
}
