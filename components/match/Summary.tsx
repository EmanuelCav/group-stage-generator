import { Text } from "react-native-paper"

import { View } from "../Themed"

import { SummaryPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const Summary = ({ summary, match, colors }: SummaryPropsType) => {
    return (
        <View style={[matchStyles.summaryDesign, { borderColor: "#ffffff", backgroundColor: colors.primary }]}>
            <View style={[matchStyles.containerSummary,
            { alignSelf: summary.player?.team?.name === match.local.team ? "flex-start" : "flex-end", backgroundColor: colors.primary }]}>
                {
                    summary.player?.team?.name === match.local.team ?
                        <>
                            <View style={{ backgroundColor: colors.primary }}>
                                <Text variant="bodySmall" style={{ color: "#ffffff" }}>{summary.title}</Text>
                                <Text variant="labelSmall" style={{ color: "#ffffff" }}>{summary.player?.name}</Text>
                            </View>
                            <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{summary.time}'</Text>
                        </> : <>
                            <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{summary.time}'</Text>
                            <View style={{ backgroundColor: colors.primary, alignItems: 'flex-end' }}>
                                <Text variant="bodySmall" style={{ color: "#ffffff" }}>{summary.title}</Text>
                                <Text variant="labelSmall" style={{ color: "#ffffff" }}>{summary.player?.name}</Text>
                            </View>
                        </>
                }
            </View>
        </View>
    )
}

export default Summary