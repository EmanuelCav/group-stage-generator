import { Icon, Text } from "react-native-paper"
import { Dimensions, Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { StadiumPropsType } from "@/types/stadiums.types"

const Stadium = ({ stadium, handleUpdateStadium, colors }: StadiumPropsType) => {
    return (
        <Pressable style={[createStyles.containTeamAdded, { borderColor: colors.primary }]}
            onPress={() => handleUpdateStadium(stadium)}>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {stadium.name}
            </Text>
            <Icon source="stadium" size={24} color={colors.primary} />
        </Pressable>
    )
}

export default Stadium