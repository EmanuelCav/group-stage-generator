import { Pressable } from "react-native"
import { Icon, Text } from "react-native-paper"
import i18n from "@/i18n"

import { View } from "../Themed"

import { SummaryPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"
import { iconEvent } from "@/utils/matchday"

const Summary = ({ summary, match, colors, handleUpdateSummary }: SummaryPropsType) => {
    return (
        <Pressable style={[matchStyles.summaryDesign, { borderColor: "#ffffff", backgroundColor: colors.primary }]}
            onPress={() => handleUpdateSummary(summary)} >
            <View style={[matchStyles.containerSummary,
            { alignSelf: summary.player?.team?.name === match.local.team.name ? "flex-start" : "flex-end", backgroundColor: colors.primary }]}>
                {
                    summary.player?.team?.name === match.local.team.name ?
                        <>
                            <View style={{ backgroundColor: colors.primary }}>
                                <Icon source={iconEvent(summary.title!)} size={24}
                                    color={summary.title === i18n.t("red") ? "#f00" : (summary.title === i18n.t("yellow") ? "#ff0" : "#fff")} />
                                <Text variant="labelSmall" style={{ color: "#ffffff" }}>{summary.player?.name}</Text>
                            </View>
                            <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{summary.time}'</Text>
                        </> : <>
                            <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{summary.time}'</Text>
                            <View style={{ backgroundColor: colors.primary, alignItems: 'flex-end' }}>
                                <Icon source={iconEvent(summary.title!)} size={24}
                                    color={summary.title === i18n.t("red") ? "#f00" : (summary.title === i18n.t("yellow") ? "#ff0" : "#fff")} />
                                <Text variant="labelSmall" style={{ color: "#ffffff" }}>{summary.player?.name}</Text>
                            </View>
                        </>
                }
            </View>
        </Pressable>
    )
}

export default Summary