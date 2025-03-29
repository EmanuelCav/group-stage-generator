import { Text } from "react-native-paper"

import { View } from "../Themed"

import { StatisticMatchPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const StatisticMatch = ({ statistic, colors }: StatisticMatchPropsType) => {
    return (
        <View style={matchStyles.containerStatisticMatch}>
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
        </View>
    )
}

export default StatisticMatch

