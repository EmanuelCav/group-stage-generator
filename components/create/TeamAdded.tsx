import { Dimensions, Pressable } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { TeamAddedPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const TeamAdded = ({ team, handleUpdateTeam, colors }: TeamAddedPropsType) => {
  return (
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
          <Avatar.Image source={{ uri: team.logo }} size={50} />
        ) : (
          <Avatar.Icon icon="shield-outline" size={50} />
        )}
        <Text variant="bodyLarge" style={{
          marginLeft: Dimensions.get("window").width / 45,
          color: colors.surface
        }}>
          {team.name}
        </Text>
      </View>
    </Pressable>
  )
}

export default TeamAdded
