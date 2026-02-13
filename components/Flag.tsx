// components/Flag.tsx
import { View, StyleSheet } from "react-native"
import { getFlag, type FlagVariant } from "../constants/flags"

type Props = {
  team?: string
  variant?: FlagVariant
  size?: number
}

export function Flag({ team, variant = "round", size = 56 }: Props) {
  const SvgFlag = getFlag(team, variant)

  if (!SvgFlag) {
    return (
      <View
        style={[
          styles.empty,
          {
            width: size,
            height: size,
            borderRadius: variant === "round" ? size / 2 : 10,
          },
        ]}
      />
    )
  }

  return <SvgFlag width={size} height={size} />
}

const styles = StyleSheet.create({
  empty: {
    borderWidth: 1,
    borderColor: "rgb(229,195,1)",
    opacity: 0.25,
  },
})
