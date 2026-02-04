import { View, Text, StyleSheet } from "react-native"
import type { Card } from "../constants/calendar"
import { GameRow } from "./GameRow"

export function CardDay({ card }: { card: Card }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {card.date} <Text style={styles.day}>{card.day}</Text>
      </Text>

      <View style={styles.games}>
        {card.games.map((g, i) => (
          <GameRow key={i} game={g} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#090909",
    padding: 18,
    borderRadius: 18,
    borderTopWidth: 4,
    borderTopColor: "rgb(63,172,0)",
    borderBottomWidth: 4,
    borderBottomColor: "rgba(253,216,3,0.676)",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "800",
    color: "rgb(252,215,3)",
    marginBottom: 14,
  },
  day: { color: "#fff", fontSize: 18, fontWeight: "700" },
  games: { gap: 12 },
})
