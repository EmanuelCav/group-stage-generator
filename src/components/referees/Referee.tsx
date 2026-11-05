import { memo } from "react"
import { Icon, Text } from "react-native-paper"
import { Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { RefereePropsType } from "@/types/referees.types"

const Referee = memo(({ referee, handleUpdateReferee, colors, spacing }: RefereePropsType) => {
    return (
        <Pressable style={[createStyles.containTeamAdded,
        {
            borderColor: colors.primary,
            backgroundColor: colors.tertiary
        }]}
            onPress={() => handleUpdateReferee(referee)}>
            <Text variant="bodyLarge" style={{ marginLeft: spacing.w45 }}>
                {referee.name}
            </Text>
            <Icon source="whistle" size={24} color={colors.primary} />
        </Pressable>
    )
})

export default Referee