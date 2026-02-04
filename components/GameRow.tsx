import { View, Text, StyleSheet } from "react-native"
import type { Game } from "../constants/calendar"
import { Flag } from "./Flag"

export function GameRow({ game }: { game: Game }) {
  return (
    <View style={styles.row}>
      <Flag team={game.player1} variant="round" size={56} />
      <Text style={styles.hour}>{game.hour}</Text>
      <Flag team={game.player2} variant="round" size={56} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  hour: { color: "#fff", fontSize: 18, fontWeight: "900" },
})
