import { Text } from "react-native-paper"
import { Dimensions, Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { PlayerPropsType } from "@/types/player.types"
import { groupName } from "@/utils/points"

const Player = ({ player, handleUpdatePlayer, colors }: PlayerPropsType) => {
    return (
        <Pressable style={[createStyles.containTeamAdded, { borderColor: colors.primary }]}
            onPress={() => handleUpdatePlayer(player)}>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {player.name}
            </Text>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {groupName(player.team?.name!)}
            </Text>
        </Pressable>
    )
}

export default Player