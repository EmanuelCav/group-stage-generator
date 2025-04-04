import { Card, Text, Button, IconButton, MD3Colors } from "react-native-paper";

import { generalStyles } from "@/styles/general.styles";

import { GenerateAgainPropsType } from "@/types/props.types";

import { groupStore } from "@/store/group.store";
import { responseStore } from "@/store/response.store";

import { groupGenerator } from "@/utils/generator";

const GenerateAgain = ({ colors }: GenerateAgainPropsType) => {

    const { updateGenerateAgain, generateMatches, updateTeam, group } = groupStore()
    const { handleLoading } = responseStore()

    const generateGroups = () => {

        handleLoading(true)

        try {

            if (group.isManualConfiguration) {

                if (group.teamsPerGroup === 1) {
                    return
                }

                if (Math.ceil(group.amountGroups! / 2) > group.teams.length) {
                    return
                }

                if ((group.amountGroups! * group.teamsPerGroup!) > group.teams.length) {
                    return
                }
            }

            const groupsMatches = groupGenerator(group)

            if (group.isManualConfiguration) {
                generateMatches(groupsMatches.groupsMatches, group.teamsPerGroup!, group.amountGroups!, group.amountClassified!)
            } else {
                const limitTeams = group.teams.length - (Math.ceil(group.teams.length / 2) / 2)
                const power = Math.floor(Math.floor(limitTeams) / Math.floor(2))
                const amountClassified = Math.pow(power, 2)
                generateMatches(groupsMatches.groupsMatches, groupsMatches.groupsSorted[groupsMatches.groupsSorted.length - 1].length, group.matches?.length!, amountClassified)
            }

            for (let i = 0; i < groupsMatches.groupsSorted.length; i++) {
                for (let j = 0; j < groupsMatches.groupsSorted[i].length; j++) {
                    updateTeam({
                        id: groupsMatches.groupsSorted[i][j].id,
                        group: groupsMatches.groupsSorted[i][j].group,
                        logo: groupsMatches.groupsSorted[i][j].logo,
                        plot: group.teams.find(t => t.id === groupsMatches.groupsSorted[i][j].id)?.plot,
                        name: groupsMatches.groupsSorted[i][j].name
                    })
                }
            }

        } catch (error) {
            console.error(error);
        } finally {
            handleLoading(false)
        }

    }

    return (
        <Card style={generalStyles.containerGenerateAgain}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={updateGenerateAgain}
            />
            <Card.Content style={generalStyles.showGenerateAgain}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>Do you want to generate the group stage again?</Text>
                <Button mode="contained" onPress={generateGroups}
                    style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }} >
                    GENERATE AGAIN
                </Button>
            </Card.Content>
        </Card>
    );
};

export default GenerateAgain;
