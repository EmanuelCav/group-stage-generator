import { Button } from "react-native-paper"
import { View } from "react-native"

import { AddTeamPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const AddTeam = ({ openForm, colors, t }: AddTeamPropsType) => {

    return (
        <View style={[createStyles.containerAddTeam, { backgroundColor: colors.background }]}>
            <Button
                mode="contained"
                icon="plus-circle"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={() => openForm(true)}
            >
                {t("groupStage.addTeam")}
            </Button>
        </View>
    )
}

export default AddTeam