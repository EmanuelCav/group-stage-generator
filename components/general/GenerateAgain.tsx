import { useState } from "react";
import { View } from "react-native";
import { Card, Text, Button, IconButton, MD3Colors } from "react-native-paper";

import CustomDropdown from "./CustomDropdown";

import { generalStyles } from "@/styles/general.styles";

import { GenerateAgainPropsType } from "@/types/props.types";

import { useGroupStore } from "@/store/group.store";

import { groupGenerator } from "@/utils/generator";
import { powerRange } from "@/utils/defaultGroup";

import { useLanguage } from "@/hooks/useLanguageContext";

const GenerateAgain = ({ colors }: GenerateAgainPropsType) => {

    const { updateGenerateAgain, generateMatches, updateTeam, group } = useGroupStore()
    const { t } = useLanguage()

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

            groupsMatches.groupsSorted = groupsMatches.groupsSorted.map(subGroup =>
                subGroup.filter(team => Object.keys(team).length > 0)
            );

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
            <View style={{ alignItems: 'flex-end' }}>
                <IconButton
                    icon="close"
                    iconColor={MD3Colors.error50}
                    size={24}
                    onPress={() => updateGenerateAgain(false)}
                />
            </View>
            <Card.Content style={generalStyles.showGenerateAgain}>
                <Text variant="titleSmall" style={{ textAlign: 'center' }}>
                    {t("generateGroupStageAgainQuestion")}
                </Text>
                <>
                    <View style={{ width: '100%', borderColor: colors.primary, borderWidth: 1, marginVertical: 7 }}>
                        <CustomDropdown
                            data={[{
                                label: t("perGroups"),
                                value: "NORMAL"
                            }, {
                                label: t("allAgainstAll"),
                                value: "ALL"
                            }, {
                                label: t("intergroups"),
                                value: "CROSS"
                            }]}
                            value={matchSchedule}
                            colors={colors}
                            onChange={(item) => {
                                setMatchSchedule(item.value);
                            }}
                        />
                    </View>
                    <Text style={{ textAlign: "center", marginTop: 8 }}>
                        {matchSchedule === "NORMAL" && `${t("sameGroup")}`}
                        {matchSchedule === "ALL" && `${t("allAgainstAllDescription")}`}
                        {matchSchedule === "CROSS" && `${t("intergroupsCrossDescription")}`}
                    </Text>
                </>
                <Button
                    mode="contained"
                    onPress={generateGroups}
                    style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                >
                    {t("generateAgainButton")}
                </Button>
            </Card.Content>
        </Card >
    );
};

export default GenerateAgain;