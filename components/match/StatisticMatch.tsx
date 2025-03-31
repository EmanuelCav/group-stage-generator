import { Text } from "react-native-paper"

import { View } from "../Themed"

import { StatisticMatchPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"
import { Pressable } from "react-native"

const StatisticMatch = ({ statistic, colors, handleUpdateStatistic }: StatisticMatchPropsType) => {
    return (
        <Pressable style={matchStyles.containerStatisticMatch} onPress={() => handleUpdateStatistic(statistic)}>
            <Text variant="bodyLarge">{statistic.title}</Text>
            <View style={matchStyles.containerBarStatisticMatch}>
                <Text variant="bodyLarge">{statistic.teamLocal?.value}</Text>
                <View style={matchStyles.containStatistic}>
                    <View style={[{ height: '100%' },
                    { flex: statistic.teamLocal?.value, backgroundColor: "#3366FF" }]} />
                    <View style={[{ height: '100%' },
                    { flex: statistic.teamVisitant?.value, backgroundColor: colors.secondary }]} />
                </View>
                <Text variant="bodyLarge">{statistic.teamVisitant?.value}</Text>
            </View>
        </Pressable>
    )
}

export default StatisticMatch

