import { Dimensions, Pressable } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { TeamAddedPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const TeamAdded = ({ team, handleUpdateTeam, colors }: TeamAddedPropsType) => {
  return (
    <Pressable style={[createStyles.containTeamAdded, { borderColor: colors.primary }]} onPress={() => handleUpdateTeam(team)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {team.logo ? (
          <Avatar.Image source={{ uri: team.logo }} size={50} />
        ) : (
          <Avatar.Icon icon="shield-outline" size={50} />
        )}
        <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
          {team.name}
        </Text>
      </View>
    </Pressable>
  )
}

export default TeamAdded
