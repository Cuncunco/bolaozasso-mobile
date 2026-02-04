import { ScrollView, Text, StyleSheet } from "react-native"
import { calendar } from "../../constants/calendar"
import { CardDay } from "../../components/CardDay"

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>CALENDÁRIO</Text>
      {calendar.map((card) => (
        <CardDay key={`${card.date}-${card.day}`} card={card} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { padding: 16, gap: 16, paddingBottom: 32 },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
})
