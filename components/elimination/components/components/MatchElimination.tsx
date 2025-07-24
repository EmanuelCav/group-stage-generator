import { Dimensions, Pressable } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { View } from "@/components/Themed";

import { MatchEliminationPropsType } from "@/types/elimination.types";

import { eliminationStyles } from "@/styles/elimination.styles";

import { groupName } from "@/utils/points";

const MatchElimination = ({ match, colors, handleGetMatch, indexElimination, group }: MatchEliminationPropsType) => {

    return (
        <Pressable style={[eliminationStyles.match, { borderColor: colors.primary, backgroundColor: colors.tertiary }]}
            onPress={() => handleGetMatch({ match, round: indexElimination })}>
            <View style={[eliminationStyles.teamRow, { backgroundColor: colors.tertiary }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.tertiary }}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={24} />
                    )}
                    <Text style={{ marginLeft: Dimensions.get("window").width / 36 }} variant="bodyMedium">{groupName(match.local.team.name!)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text variant="labelLarge">
                        {match.local.score}
                    </Text>
                    {
                        group.isRoundTripElimination && match.local.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: Dimensions.get("window").width / 72 }}>
                            {match.local.scoreTrip}
                        </Text>
                    }
                    {
                        group.isRoundTripElimination && match.local.score !== null && match.local.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: Dimensions.get("window").width / 72 }}>
                            {match.local.score + match.local.scoreTrip!}
                        </Text>
                    }
                    {
                        match.local.score !== null && match.local.scoreTieBreaker !== null &&
                        <Text variant="labelSmall" style={{ marginHorizontal: Dimensions.get("window").width / 72 }}>
                            ({match.local.scoreTieBreaker})
                        </Text>
                    }
                </View>
            </View>
            <View style={[eliminationStyles.teamRow, { backgroundColor: colors.tertiary }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.tertiary }}>
                    {match.visitant.team.logo ? (
                        <Avatar.Image source={{ uri: match.visitant.team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={24} />
                    )}
                    <Text style={{ marginLeft: Dimensions.get("window").width / 36, }} variant="bodyMedium">{groupName(match.visitant.team.name!)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text variant="labelLarge">
                        {match.visitant.score}
                    </Text>
                    {
                        group.isRoundTripElimination && match.visitant.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: Dimensions.get("window").width / 72 }}>
                            {match.visitant.scoreTrip}
                        </Text>
                    }
                    {
                        group.isRoundTripElimination && match.visitant.score !== null && match.visitant.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: Dimensions.get("window").width / 72 }}>
                            {match.visitant.score + match.visitant.scoreTrip!}
                        </Text>
                    }
                    {
                        match.visitant.score !== null && match.visitant.scoreTieBreaker !== null &&
                        <Text variant="labelSmall" style={{ marginHorizontal: Dimensions.get("window").width / 72 }}>
                            ({match.visitant.scoreTieBreaker})
                        </Text>
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default MatchElimination