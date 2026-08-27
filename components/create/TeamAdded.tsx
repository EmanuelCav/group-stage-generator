import { memo } from "react"
import { Pressable, View } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { TeamAddedPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const TeamAdded = memo(({ team, handleUpdateTeam, colors, isManualConfiguration, spacing, t }: TeamAddedPropsType) => {
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
              <Avatar.Image source={{ uri: team.logo }} size={42} />
            ) : (
              <Avatar.Icon
                icon="shield-outline"
                style={{ backgroundColor: team.color }}
                color="#ffffff"
                size={42}
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
            {t("group.title")}: {team.group ?? team.groupAssigned ?? t("random")}
          </Text>

          <Text
            variant="bodySmall"
            style={{ color: colors.surface }}
          >
            {t("plot")}: {isManualConfiguration ? team.plot : t("random")}
          </Text>
        </View>
      </Pressable>
    </View>
  )
})

export default TeamAdded