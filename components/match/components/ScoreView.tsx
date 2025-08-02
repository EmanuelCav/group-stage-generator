import { Dimensions } from "react-native"
import { Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { ScoreViewPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const ScoreView = ({ match, colors }: ScoreViewPropsType) => {
    return (
        <View style={[matchStyles.scoreView, { backgroundColor: colors.background }]}>
            {
                match.local.score !== null &&
                <Text variant="bodyLarge">{match.local.score + (match.local.scoreTrip ?? 0)}</Text>
            }
            {
                match.local.scoreTieBreaker && <Text variant="bodyLarge" style={{ marginHorizontal: Dimensions.get("window").width / 120 }}>
                    ({match.local.scoreTieBreaker})
                </Text>
            }
            <Text style={{ marginHorizontal: Dimensions.get("window").width / 74 }}>-</Text>
            {
                match.visitant.scoreTieBreaker && <Text variant="bodyLarge" style={{ marginHorizontal: Dimensions.get("window").width / 120 }}>
                    ({match.visitant.scoreTieBreaker})
                </Text>
            }
            {
                match.visitant.score !== null &&
                <Text variant="bodyLarge">{match.visitant.score + (match.visitant.scoreTrip ?? 0)}</Text>
            }
        </View>
    )
}

export default ScoreView