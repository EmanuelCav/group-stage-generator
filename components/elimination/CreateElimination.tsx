import { Dimensions } from "react-native"
import { Button, Text } from "react-native-paper"
import { View } from "../Themed"
import i18n from '@/i18n'

import { createStyles } from "@/styles/create.styles"
import { generalStyles } from "@/styles/general.styles"

import { CreateEliminationPropsType } from "@/types/elimination.types"

const CreateElimination = ({ colors, updateCreateElimination }: CreateEliminationPropsType) => {
    return (
        <View style={generalStyles.containerGeneral}>
            <View style={createStyles.containerAddTeam}>
                <Text variant="titleLarge" style={[createStyles.textHeader, { color: colors.primary }]}>
                    {i18n.t("knockoutStage.title")}
                </Text>
                <Text variant="bodyLarge" style={{ marginVertical: Dimensions.get("window").height / 106 }}>
                    {i18n.t("knockoutStage.description")}
                </Text>
                <Button
                    mode="contained"
                    icon="hammer"
                    style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => updateCreateElimination(true)}
                >
                    {i18n.t("generate")}
                </Button>
            </View>
        </View>
    )
}

export default CreateElimination