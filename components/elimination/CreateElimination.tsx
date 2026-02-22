import { Button, Text } from "react-native-paper"
import { View } from "../Themed"
import i18n from '@/i18n'

import { createStyles } from "@/styles/create.styles"
import { generalStyles } from "@/styles/general.styles"

import { CreateEliminationPropsType } from "@/types/elimination.types"

const CreateElimination = ({ colors, updateCreateElimination, spacing }: CreateEliminationPropsType) => {
    return (
        <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
            <View style={[createStyles.containerAddTeam, { backgroundColor: colors.background }]}>
                <Text variant="titleLarge" style={[createStyles.textHeader, { color: colors.primary }]}>
                    {i18n.t("knockoutStage.title")}
                </Text>
                <Text variant="bodyLarge" style={{ marginVertical: spacing.h106 }}>
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
                <Text variant="bodySmall" style={{ marginTop: spacing.h47 }}>
                    {i18n.t("beforeKnockoutStage")}
                </Text>
            </View>
        </View>
    )
}

export default CreateElimination