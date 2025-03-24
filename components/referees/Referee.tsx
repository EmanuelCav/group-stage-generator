import { Text } from "react-native-paper"
import { Dimensions, Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { RefereePropsType } from "@/types/referees.types"

const Referee = ({ referee, handleUpdateReferee }: RefereePropsType) => {
    return (
        <Pressable style={createStyles.containTeamAdded} onPress={() => handleUpdateReferee(referee)}>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {referee.name?.slice(0, 15)}
            </Text>
        </Pressable>
    )
}

export default Referee