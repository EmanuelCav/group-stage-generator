import { Button } from "react-native-paper"
import i18n from '@/i18n'

import { View } from "../Themed"

import { AddTeamPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const AddTeam = ({ openForm, colors }: AddTeamPropsType) => {

    return (
        <View style={[createStyles.containerAddTeam, { backgroundColor: colors.background }]}>
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