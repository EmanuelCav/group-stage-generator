import { Button, Text } from "react-native-paper"
import { View } from "react-native"

import { AddTournamentPropsType } from "@/types/index.types"

import { createStyles } from "@/styles/create.styles"

const AddTournament = ({ handleCreateTournament, colors, t }: AddTournamentPropsType) => {

    return (
        <View style={[createStyles.containerAddTeam, { backgroundColor: colors.background }]}>
            <Text variant="titleLarge" style={[createStyles.textHeader, { color: colors.primary }]}>
                {t("groupStage.welcome")}
            </Text>
            <Button
                mode="contained"
                icon="plus-circle"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleCreateTournament}
            >
                {t("groupStage.addTournament")}
            </Button>
        </View>
    )
}

export default AddTournament