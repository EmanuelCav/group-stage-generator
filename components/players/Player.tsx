import { Avatar, Text } from "react-native-paper"
import { Dimensions, Pressable } from "react-native"
import { View } from "../Themed"

import { createStyles } from "@/styles/create.styles"

import { PlayerPropsType } from "@/types/player.types"

const Player = ({ player, handleUpdatePlayer }: PlayerPropsType) => {
    return (
        <Pressable style={createStyles.containTeamAdded} onPress={() => handleUpdatePlayer(player)}>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {player.name?.slice(0, 15)}
            </Text>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {player.team!.name?.slice(0, 15)}
            </Text>
        </Pressable>
    )
}

export default Player