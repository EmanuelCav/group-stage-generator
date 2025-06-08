import { Button, Text } from "react-native-paper"
import i18n from '@/i18n'

import { View } from "../Themed"

import { AddTeamPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const AddTeam = ({ openForm, colors, length }: AddTeamPropsType) => {

    return (
        <View style={createStyles.containerAddTeam}>
            <Text variant="titleLarge" style={[createStyles.textHeader, { color: colors.primary }]}>
                {length <= 1 ? i18n.t("groupStage.welcome") : i18n.t("groupStage.createStage")}
            </Text>
            <Button
                mode="contained"
                icon="plus-circle"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={() => openForm(true)}
            >
                {i18n.t("groupStage.addTeam")}
            </Button>
        </View>
    )
}

export default AddTeam