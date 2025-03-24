import { Text } from "react-native-paper"
import { Dimensions, Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { StadiumPropsType } from "@/types/stadiums.types"

const Stadium = ({ stadium, handleUpdateStadium }: StadiumPropsType) => {
    return (
        <Pressable style={createStyles.containTeamAdded} onPress={() => handleUpdateStadium(stadium)}>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {stadium.name?.slice(0, 15)}
            </Text>
        </Pressable>
    )
}

export default Stadium