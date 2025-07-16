import { Dimensions } from "react-native"
import { Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { ScoreViewPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const ScoreView = ({ match, colors }: ScoreViewPropsType) => {
    return (
        <View style={[matchStyles.scoreView, { backgroundColor: colors.background }]}>
            <Text variant="bodyLarge">{match.local.score}</Text>
            <Text style={{ marginHorizontal: Dimensions.get("window").width / 74 }}>-</Text>
            <Text variant="bodyLarge">{match.visitant.score}</Text>
        </View>
    )
}

export default ScoreView