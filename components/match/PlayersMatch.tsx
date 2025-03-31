import { Pressable } from "react-native";
import { Text } from "react-native-paper"

import { View } from "../Themed"

import { PlayersMatchPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const PlayersMatch = ({ player, colors, hideAndShowPlayers }: PlayersMatchPropsType) => {
    return (
        <Pressable style={[matchStyles.containerPlayersLineup, { backgroundColor: colors.primary }]}
            onPress={() => hideAndShowPlayers(true)}>
            {player.playersLocal ? (
                <View style={[matchStyles.lineupContainLocal, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{player.playersLocal.name}</Text>
                    <Text variant="labelSmall" style={{ color: "#ffffff" }}>{player.playersLocal.position ? player.playersLocal.position : ""}</Text>
                </View>
            ) : (
                <View style={[matchStyles.lineupContainLocal, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>-</Text>
                </View>
            )}
            {player.playersVisitant ? (
                <View style={[matchStyles.lineupContainVisitant, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{player.playersVisitant.name}</Text>
                    <Text variant="labelSmall" style={{ color: "#ffffff" }}>{player.playersVisitant.position ? player.playersVisitant.position : ""}</Text>
                </View>
            ) : (
                <View style={[matchStyles.lineupContainVisitant, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>-</Text>
                </View>
            )}
        </Pressable>
    )
}


export default PlayersMatch