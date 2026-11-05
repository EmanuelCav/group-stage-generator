import { Button, Text } from "react-native-paper"
import { View } from "react-native"

import { createStyles } from "@/styles/create.styles"
import { generalStyles } from "@/styles/general.styles"

import { CreateEliminationPropsType } from "@/types/elimination.types"

const CreateElimination = ({ colors, updateCreateElimination, spacing, t }: CreateEliminationPropsType) => {
    return (
        <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
            <View style={[createStyles.containerAddTeam, { backgroundColor: colors.background }]}>
                <Text variant="titleLarge" style={[createStyles.textHeader, { color: colors.primary }]}>
                    {t("knockoutStage.title")}
                </Text>
                <Text variant="bodyLarge" style={{ marginVertical: spacing.h106 }}>
                    {t("knockoutStage.description")}
                </Text>
                <Button
                    mode="contained"
                    icon="hammer"
                    style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => updateCreateElimination(true)}
                >
                    {t("generate")}
                </Button>
                <Text variant="bodySmall" style={{ marginTop: spacing.h47 }}>
                    {t("beforeKnockoutStage")}
                </Text>
            </View>
        </View>
    )
}

export default CreateElimination