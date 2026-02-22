import { Button, Text } from "react-native-paper"
import i18n from '@/i18n'

import { View } from "../Themed"

import { AddTournamentPropsType } from "@/types/index.types"

import { createStyles } from "@/styles/create.styles"

const AddTournament = ({ handleCreateTournament, colors }: AddTournamentPropsType) => {

    return (
        <View style={[createStyles.containerAddTeam, { backgroundColor: colors.background }]}>
            <Text variant="titleLarge" style={[createStyles.textHeader, { color: colors.primary }]}>
                {i18n.t("groupStage.welcome")}
            </Text>
            <Button
                mode="contained"
                icon="plus-circle"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleCreateTournament}
            >
                {i18n.t("groupStage.addTournament")}
            </Button>
        </View>
    )
}

export default AddTournament