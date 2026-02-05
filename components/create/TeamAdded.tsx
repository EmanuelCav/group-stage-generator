import { Dimensions, Pressable } from "react-native"
import { Avatar, Text } from "react-native-paper"
import i18n from "@/i18n"

import { View } from "@/components/Themed"

import { TeamAddedPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const TeamAdded = ({ team, handleUpdateTeam, colors, index, teams, isManualConfiguration }: TeamAddedPropsType) => {
  return (
    <View style={{ backgroundColor: colors.background }}>
      {
        (index === 0 || teams[index - 1].plot !== team.plot) && isManualConfiguration &&
        <Text variant="bodyMedium">{i18n.t("plot")} {team.plot}</Text>
      }
      <Pressable style={[createStyles.containTeamAdded,
      {
        backgroundColor: colors.tertiary,
        borderColor: colors.primary,
        borderWidth: 2
      }]}
        onPress={() => handleUpdateTeam(team)}>
        <View
          style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.tertiary }}>
          {team.logo ? (
            <Avatar.Image source={{ uri: team.logo }} size={34} />
          ) : (
            <Avatar.Icon icon="shield-outline" style={{ backgroundColor: team.color }} color="#ffffff" size={34} />
          )}
          <Text variant="bodyLarge" style={{
            marginLeft: Dimensions.get("window").width / 45,
            color: colors.surface
          }}>
            {team.name}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default TeamAdded
