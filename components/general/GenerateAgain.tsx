import { useState } from "react";
import { Card, Text, Button, IconButton, MD3Colors } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import i18n from '@/i18n'

import { View } from "../Themed";

import { generalStyles } from "@/styles/general.styles";

import { GenerateAgainPropsType } from "@/types/props.types";

import { groupStore } from "@/store/group.store";

import { groupGenerator } from "@/utils/generator";
import { powerRange } from "@/utils/defaultGroup";

const GenerateAgain = ({ colors }: GenerateAgainPropsType) => {

    const { updateGenerateAgain, generateMatches, updateTeam, group } = groupStore()

    const [matchSchedule, setMatchSchedule] = useState<string>("NORMAL")

    const generateGroups = () => {

        try {

            let teamsPerGroupUpdate = Number(group.teamsPerGroup)
            let amountGroupsUpdate = Number(group.amountGroups)

            if (group.isManualConfiguration) {

                if (teamsPerGroupUpdate < 2) {
                    teamsPerGroupUpdate = 2
                }

                if ((amountGroupsUpdate * teamsPerGroupUpdate) > group.teams.length) {
                    while ((amountGroupsUpdate * teamsPerGroupUpdate) > group.teams.length) {
                        if (teamsPerGroupUpdate > 2) {
                            teamsPerGroupUpdate -= 1
                        }

                        if (amountGroupsUpdate > 1) {
                            amountGroupsUpdate -= 1
                        }
                    }
                }
            }

            const groupsMatches = groupGenerator({
                ...group,
                teamsPerGroup: teamsPerGroupUpdate,
                amountGroups: amountGroupsUpdate,
            }, matchSchedule)

            if (group.isManualConfiguration) {
                generateMatches(groupsMatches.groupsMatches, groupsMatches.groupsSorted[groupsMatches.groupsSorted.length - 1].length,
                    groupsMatches.groupsSorted.length, group.amountClassified!)
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
                        groupAssigned: groupsMatches.groupsSorted[i][j].groupAssigned,
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
                <View style={{ width: '100%', borderColor: colors.primary, borderWidth: 1, marginVertical: 7 }}>
                    <Picker
                        selectedValue={matchSchedule}
                        onValueChange={(itemValue) => setMatchSchedule(itemValue)}
                        mode="dropdown"
                        dropdownIconColor={colors.primary}
                        style={{
                            color: colors.surface,
                            backgroundColor: colors.tertiary
                        }}
                    >
                        <Picker.Item label={i18n.t("perGroups")} value="NORMAL" style={{ fontSize: 13 }} />
                        <Picker.Item label={i18n.t("allAgainstAll")} value="ALL" style={{ fontSize: 13 }} />
                        <Picker.Item label={i18n.t("intergroups")} value="CROSS" style={{ fontSize: 13 }} />
                    </Picker>
                </View>
                <Text style={{ textAlign: "center", marginTop: 8 }}>
                    {matchSchedule === "NORMAL" && `${i18n.t("sameGroup")}`}
                    {matchSchedule === "ALL" && `${i18n.t("allAgainstAllDescription")}`}
                    {matchSchedule === "CROSS" && `${i18n.t("intergroupsCrossDescription")}`}
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
        </Card >
    );
};

export default GenerateAgain;