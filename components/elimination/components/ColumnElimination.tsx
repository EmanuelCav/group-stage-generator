import { memo } from "react";
import { Text } from "react-native-paper"

import { View } from "@/components/Themed"
import MatchElimination from "./components/MatchElimination";

import { ColumnEliminationPropsType } from "@/types/elimination.types";

import { eliminationStyles } from "@/styles/elimination.styles";

const ColumnElimination = memo(({ text, matches, colors, indexElimination, handleGetMatch, group, spacing, isFullName }: ColumnEliminationPropsType) => {
  return (
    <View style={[eliminationStyles.column, { backgroundColor: colors.background }]}>
      <Text variant="titleMedium" style={eliminationStyles.roundTitle}>{text}</Text>
      {matches.map((match, index) => (
        <MatchElimination match={match} colors={colors} indexElimination={indexElimination}
        handleGetMatch={handleGetMatch} group={group} spacing={spacing} isFullName={isFullName} key={index} />
      ))}
    </View>
  )
})

export default ColumnElimination