import { Text } from "react-native-paper"

import { View } from "../Themed"

import { PlayersMatchPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const PlayersMatch = ({ player, colors }: PlayersMatchPropsType) => {
    return (
        <View style={[matchStyles.containerPlayersLineup, { backgroundColor: colors.primary }]}>
            {player.playersLocal ? (
                <View style={[matchStyles.lineupContainLocal, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{player.playersLocal?.name}</Text>
                    <Text variant="labelSmall" style={{ color: "#ffffff" }}>{player.playersLocal?.name}</Text>
                </View>
            ) : (
                <View style={[matchStyles.lineupContainLocal, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>-</Text>
                </View>
            )}
            {player.playersVisitant ? (
                <View style={[matchStyles.lineupContainVisitant, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>{player.playersVisitant?.name}</Text>
                    <Text variant="labelSmall" style={{ color: "#ffffff" }}>{player.playersVisitant?.name}</Text>
                </View>
            ) : (
                <View style={[matchStyles.lineupContainVisitant, { backgroundColor: colors.primary }]}>
                    <Text variant="bodyMedium" style={{ color: "#ffffff" }}>-</Text>
                </View>
            )}
        </View>
    );
};


export default PlayersMatch