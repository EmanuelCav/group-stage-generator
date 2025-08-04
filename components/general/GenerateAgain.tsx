import { Card, Text, Button, IconButton, MD3Colors } from "react-native-paper";
import Toast from 'react-native-toast-message';
import i18n from '@/i18n'

import { generalStyles } from "@/styles/general.styles";

import { GenerateAgainPropsType } from "@/types/props.types";

import { groupStore } from "@/store/group.store";

import { groupGenerator } from "@/utils/generator";
import { powerRange } from "@/utils/defaultGroup";

const GenerateAgain = ({ colors }: GenerateAgainPropsType) => {

    const { updateGenerateAgain, generateMatches, updateTeam, group } = groupStore()

    const generateGroups = () => {

        try {

            if (group.isManualConfiguration) {

                if (group.teamsPerGroup === 1) {
                    Toast.show({
                        type: 'error',
                        text1: i18n.t("validation.teamsPerGroup.title"),
                        text2: i18n.t("validation.teamsPerGroup.message")
                    });
                    return
                }

                if (Math.ceil(group.amountGroups! / 2) > group.teams.length) {
                    Toast.show({
                        type: 'error',
                        text1: i18n.t("validation.numberOfGroups.title"),
                        text2: i18n.t("validation.numberOfGroups.message")
                    });
                    return
                }

                if ((group.amountGroups! * group.teamsPerGroup!) > group.teams.length) {
                    Toast.show({
                        type: 'error',
                        text1: i18n.t("validation.numberOfTeams.title"),
                        text2: i18n.t("validation.numberOfTeams.message")
                    });
                    return
                }
            }

            const groupsMatches = groupGenerator(group)

            if (group.isManualConfiguration) {
                generateMatches(groupsMatches.groupsMatches, group.teamsPerGroup!, group.amountGroups!, group.amountClassified!)
            } else {
                generateMatches(groupsMatches.groupsMatches, groupsMatches.groupsSorted[groupsMatches.groupsSorted.length - 1].length,
                    groupsMatches.groupsSorted.length, Math.pow(2, powerRange(group.teams.length)))
            }

            for (let i = 0; i < groupsMatches.groupsSorted.length; i++) {
                for (let j = 0; j < groupsMatches.groupsSorted[i].length; j++) {
                    updateTeam({
                        id: groupsMatches.groupsSorted[i][j].id,
                        group: groupsMatches.groupsSorted[i][j].group,
                        color: groupsMatches.groupsSorted[i][j].color,
                        logo: groupsMatches.groupsSorted[i][j].logo,
                        plot: group.teams.find(t => t.id === groupsMatches.groupsSorted[i][j].id)?.plot,
                        name: groupsMatches.groupsSorted[i][j].name
                    })
                }
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <Card style={[generalStyles.containerGenerateAgain, { backgroundColor: colors.tertiary }]}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => updateGenerateAgain(false)}
            />
            <Card.Content style={generalStyles.showGenerateAgain}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>
                    {i18n.t("generateGroupStageAgainQuestion")}
                </Text>
                <Button
                    mode="contained"
                    onPress={generateGroups}
                    style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                >
                    {i18n.t("generateAgainButton")}
                </Button>
            </Card.Content>
        </Card>
    );
};

export default GenerateAgain;
