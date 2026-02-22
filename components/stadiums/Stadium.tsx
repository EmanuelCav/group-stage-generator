import { Icon, Text } from "react-native-paper"
import { Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { StadiumPropsType } from "@/types/stadiums.types"

const Stadium = ({ stadium, handleUpdateStadium, colors, spacing }: StadiumPropsType) => {
    return (
        <Pressable style={[createStyles.containTeamAdded,
        { borderColor: colors.primary, backgroundColor: colors.tertiary }]}
            onPress={() => handleUpdateStadium(stadium)}>
            <Text variant="bodyLarge" style={{ marginLeft: spacing.w45 }}>
                {stadium.name}
            </Text>
            <Icon source="stadium" size={24} color={colors.primary} />
        </Pressable>
    )
}

export default Stadium