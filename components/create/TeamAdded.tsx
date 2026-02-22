import { memo } from "react"
import { Pressable } from "react-native"
import { Avatar, Text } from "react-native-paper"
import i18n from "@/i18n"

import { View } from "@/components/Themed"

import { TeamAddedPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const TeamAdded = memo(({ team, handleUpdateTeam, colors, isManualConfiguration, spacing }: TeamAddedPropsType) => {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Pressable
        style={[
          createStyles.containTeamAdded,
          {
            backgroundColor: colors.tertiary,
            borderColor: colors.primary,
            borderWidth: 2,
          },
        ]}
        onPress={() => handleUpdateTeam(team)}
      >
        <View
          style={{
            backgroundColor: colors.tertiary,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.tertiary
            }}
          >
            {team.logo ? (
              <Avatar.Image source={{ uri: team.logo }} size={34} />
            ) : (
              <Avatar.Icon
                icon="shield-outline"
                style={{ backgroundColor: team.color }}
                color="#ffffff"
                size={34}
              />
            )}

            <Text
              variant="bodyLarge"
              style={{
                marginLeft: spacing.w45,
                color: colors.surface,
              }}
            >
              {team.name}
            </Text>
          </View>

          <Text
            variant="bodySmall"
            style={{
              marginTop: 6,
              color: colors.surface,
            }}
          >
            {i18n.t("group.title")}: {team.group ?? team.groupAssigned ?? i18n.t("random")}
          </Text>

          <Text
            variant="bodySmall"
            style={{ color: colors.surface }}
          >
            {i18n.t("plot")}: {isManualConfiguration ? team.plot : i18n.t("random")}
          </Text>
        </View>
      </Pressable>
    </View>
  )
})

export default TeamAdded