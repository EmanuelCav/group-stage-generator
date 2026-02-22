import { memo } from "react"
import { Text } from "react-native-paper"
import { Pressable } from "react-native"

import { PlayerPropsType } from "@/types/player.types"

import { createStyles } from "@/styles/create.styles"

const Player = memo(({ player, handleUpdatePlayer, colors }: PlayerPropsType) => {
    return (
        <Pressable style={[createStyles.containTeamAdded, {
            borderColor: colors.primary,
            backgroundColor: colors.tertiary
        }]}
            onPress={() => handleUpdatePlayer(player)}>
            <Text variant="bodyLarge">
                {player.name}
            </Text>
        </Pressable>
    )
})

export default Player