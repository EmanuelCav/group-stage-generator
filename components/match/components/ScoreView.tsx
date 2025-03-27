import { Dimensions } from "react-native"
import { Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { IMatch } from "@/interface/Match"

import { matchStyles } from "@/styles/match.styles"

const ScoreView = ({ match }: { match: IMatch }) => {
    return (
        <View style={matchStyles.scoreView}>
            <Text variant="bodyLarge">{match.local.score}</Text>
            <Text style={{ marginHorizontal: Dimensions.get("window").width / 74 }}>-</Text>
            <Text variant="bodyLarge">{match.visitant.score}</Text>
        </View>
    )
}

export default ScoreView