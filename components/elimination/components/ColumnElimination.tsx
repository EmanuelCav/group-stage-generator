import { Text } from "react-native-paper"

import { View } from "@/components/Themed"
import MatchElimination from "./components/MatchElimination";

import { ColumnEliminationPropsType } from "@/types/elimination.types";

import { eliminationStyles } from "@/styles/elimination.styles";

const ColumnElimination = ({ text, matches, colors, indexElimination, handleGetMatch, group }: ColumnEliminationPropsType) => {
  return (
    <View style={eliminationStyles.column}>
      <Text variant="titleMedium" style={eliminationStyles.roundTitle}>{text}</Text>
      {matches.map((match, index) => (
        <MatchElimination match={match} colors={colors} indexElimination={indexElimination}
        handleGetMatch={handleGetMatch} group={group} key={index} />
      ))}
    </View>
  )
}

export default ColumnElimination