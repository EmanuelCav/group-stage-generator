import { memo, useCallback } from "react";
import { Pressable } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { View } from "@/components/Themed";

import { MatchEliminationPropsType } from "@/types/elimination.types";

import { eliminationStyles } from "@/styles/elimination.styles";

import { groupName, nameParticipant } from "@/utils/points";

const MatchElimination = memo(({ match, colors, handleGetMatch, indexElimination, group, spacing, isFullName }: MatchEliminationPropsType) => {

    const onPressMatch = useCallback(() => {
        handleGetMatch({ match, round: indexElimination })
    }, [handleGetMatch, match, indexElimination])

    return (
        <Pressable style={[eliminationStyles.match, { borderColor: colors.primary, backgroundColor: colors.tertiary }]}
            onPress={onPressMatch}>
            <View style={[eliminationStyles.teamRow, { backgroundColor: colors.tertiary }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.tertiary }}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" color="#ffffff" style={{ backgroundColor: match.local.team.color }} size={24} />
                    )}
                    {
                        isFullName ? <Text style={{ marginLeft: spacing.w36 }} variant="bodyMedium">{nameParticipant(match.local.team.name!)}</Text> :
                            <Text style={{ marginLeft: spacing.w36 }} variant="bodyMedium">{groupName(match.local.team.name!)}</Text>
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tertiary }}>
                    <Text variant="labelLarge">
                        {match.local.score}
                    </Text>
                    {
                        group.isRoundTripElimination && match.local.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: spacing.w72 }}>
                            {match.local.scoreTrip}
                        </Text>
                    }
                    {
                        group.isRoundTripElimination && match.local.score !== null && match.local.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: spacing.w72 }}>
                            {match.local.score + match.local.scoreTrip!}
                        </Text>
                    }
                    {
                        match.local.score !== null && match.local.scoreTieBreaker !== null &&
                        <Text variant="labelSmall" style={{ marginHorizontal: spacing.w72 }}>
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
                        <Avatar.Icon icon="shield-outline" size={24} color="#ffffff" style={{ backgroundColor: match.visitant.team.color }} />
                    )}
                    {
                        isFullName ? <Text style={{ marginLeft: spacing.w36 }} variant="bodyMedium">{nameParticipant(match.visitant.team.name!)}</Text> :
                            <Text style={{ marginLeft: spacing.w36 }} variant="bodyMedium">{groupName(match.visitant.team.name!)}</Text>
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tertiary }}>
                    <Text variant="labelLarge">
                        {match.visitant.score}
                    </Text>
                    {
                        group.isRoundTripElimination && match.visitant.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: spacing.w72 }}>
                            {match.visitant.scoreTrip}
                        </Text>
                    }
                    {
                        group.isRoundTripElimination && match.visitant.score !== null && match.visitant.scoreTrip !== null && <Text variant="labelLarge"
                            style={{ marginHorizontal: spacing.w72 }}>
                            {match.visitant.score + match.visitant.scoreTrip!}
                        </Text>
                    }
                    {
                        match.visitant.score !== null && match.visitant.scoreTieBreaker !== null &&
                        <Text variant="labelSmall" style={{ marginHorizontal: spacing.w72 }}>
                            ({match.visitant.scoreTieBreaker})
                        </Text>
                    }
                </View>
            </View>
        </Pressable>
    )
})

export default MatchElimination