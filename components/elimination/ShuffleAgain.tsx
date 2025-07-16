import { Card, Text, Button, IconButton, MD3Colors } from "react-native-paper";
import i18n from '@/i18n'

import { ShuffleAgainPropsType } from "@/types/elimination.types";

import { generalStyles } from "@/styles/general.styles";

import { getElimationTeams } from "@/utils/elimination";

const ShuffleAgain = ({ colors, handleLoading, group, generateElimination, updateShuffledKnockout }: ShuffleAgainPropsType) => {

    const generateKnockoutStage = () => {

        handleLoading(true)

        try {

            generateElimination(getElimationTeams(group, true))

        } catch (error) {
            console.error(error);
        } finally {
            handleLoading(false)
        }

    }

    return (
        <Card style={[generalStyles.containerGenerateAgain, { backgroundColor: colors.tertiary }]}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => updateShuffledKnockout(true)}
            />
            <Card.Content style={generalStyles.showGenerateAgain}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>
                    {i18n.t("drawKnockoutQuestion")}
                </Text>
                <Button
                    mode="contained"
                    onPress={generateKnockoutStage}
                    style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                >
                    {i18n.t("drawButton")}
                </Button>
            </Card.Content>
        </Card>

    );
};

export default ShuffleAgain;
