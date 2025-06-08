import { Icon, Text } from "react-native-paper"
import { Dimensions, Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { RefereePropsType } from "@/types/referees.types"

const Referee = ({ referee, handleUpdateReferee, colors }: RefereePropsType) => {
    return (
        <Pressable style={[createStyles.containTeamAdded, { borderColor: colors.primary }]}
        onPress={() => handleUpdateReferee(referee)}>
            <Text variant="bodyLarge" style={{ marginLeft: Dimensions.get("window").width / 45 }}>
                {referee.name}
            </Text>
            <Icon source="whistle" size={24} color={colors.primary} />
        </Pressable>
    )
}

export default Referee