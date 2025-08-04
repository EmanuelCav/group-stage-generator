import { Dimensions } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { TeamViewPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

import { groupName } from "@/utils/points"

const TeamView = ({ team, colors }: TeamViewPropsType) => {
    return (
        <View style={[matchStyles.teamView, {  backgroundColor: colors.background }]}>
            {team.team.logo ? (
                <Avatar.Image source={{ uri: team.team.logo }} size={32} />
            ) : (
                <Avatar.Icon icon="shield-outline" color="#ffffff" size={32} style={{ backgroundColor: team.team.color }} />
            )}
            <Text variant="bodyMedium" style={{ marginTop: Dimensions.get("window").height / 106 }}>
                {groupName(team.team.name!)}
            </Text>
        </View>
    )
}

export default TeamView