import { Dimensions, Pressable } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { View } from "@/components/Themed";

import { MatchEliminationPropsType } from "@/types/elimination.types";

import { eliminationStyles } from "@/styles/elimination.styles";

const MatchElimination = ({ match, colors, handleGetMatch, indexElimination, group }: MatchEliminationPropsType) => {

    return (
        <Pressable style={[eliminationStyles.match, { borderColor: colors.primary }]} onPress={() => handleGetMatch({ match, round: indexElimination })}>
            <View style={eliminationStyles.teamRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={24} />
                    )}
                    <Text style={{ marginLeft: Dimensions.get("window").width / 36 }} variant="bodyMedium">{match.local.team.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text variant="labelLarge">{match.local.score && match.local.score}</Text>
                    {
                        group.isRoundTripElimination && match.local.scoreTrip && <Text variant="labelLarge">{match.local.scoreTrip}</Text>
                    }
                    {
                        match.local.scoreTieBreaker && <Text variant="labelLarge">{match.local.scoreTieBreaker}</Text>
                    }
                </View>
            </View>
            <View style={eliminationStyles.teamRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {match.visitant.team.logo ? (
                        <Avatar.Image source={{ uri: match.visitant.team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={24} />
                    )}
                    <Text style={{ marginLeft: Dimensions.get("window").width / 36, }} variant="bodyMedium">{match.visitant.team.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text variant="labelLarge">{match.visitant.score && match.visitant.score}</Text>
                    {
                        group.isRoundTripElimination && match.visitant.scoreTrip && <Text variant="labelLarge">{match.visitant.scoreTrip}</Text>
                    }
                    {
                        match.visitant.scoreTieBreaker && <Text variant="labelLarge">{match.visitant.scoreTieBreaker}</Text>
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default MatchElimination