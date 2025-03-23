import React from "react";
import { Card, Text, Button, IconButton, MD3Colors } from "react-native-paper";

import { generalStyles } from "@/styles/general.styles";

import { GenerateAgainPropsType } from "@/types/props.types";

import { groupStore } from "@/store/group.store";

import { groupGenerator } from "@/utils/generator";

const GenerateAgain = ({ colors }: GenerateAgainPropsType) => {

    const { updateGenerateAgain, generateMatches, updateTeam, group } = groupStore()

    const generateGroups = () => {

        const groupsMatches = groupGenerator(group)
        generateMatches(groupsMatches)

        for (let i = 0; i < groupsMatches.length; i++) {

            groupsMatches[i][0].forEach((gm) => {

                updateTeam({
                    id: gm.local.team.id,
                    group: gm.local.team.group,
                    logo: gm.local.team.logo,
                    plot: group.teams.find(t => t.id === gm.local.team.id)?.plot,
                    name: gm.local.team.name,
                    points: gm.local.team.points
                })

                updateTeam({
                    id: gm.visitant.team.id,
                    group: gm.visitant.team.group,
                    logo: gm.visitant.team.logo,
                    plot: group.teams.find(t => t.id === gm.visitant.team.id)?.plot,
                    name: gm.visitant.team.name,
                    points: gm.visitant.team.points
                })

            })
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
