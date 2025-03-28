import { useState } from 'react'
import { Dimensions } from 'react-native'
import { Avatar, Button, IconButton, MD3Colors, Text, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown';

import { View } from '../Themed'
import ContainerBackground from '../general/ContainerBackground'

import { IMatch } from '@/interface/Match';
import { FormUpdateMatchPropsType } from '@/types/match.types'

import { generalStyles } from '@/styles/general.styles'
import { createStyles } from '@/styles/create.styles'
import { matchStyles } from '@/styles/match.styles';

import { getRefereeName, getStadiumsName } from '@/utils/defaultGroup';

const FormUpdateMatch = ({ colors, hideAndShowUpdateMatch, match, group, updateMatch, updateMatchGroup, matchday }: FormUpdateMatchPropsType) => {

    const [scoreLocal, setScoreLocal] = useState<string>(match.local.score ? String(match.local.score): "0")
    const [scoreVisitant, setScoreVisitant] = useState<string>(match.visitant.score ? String(match.visitant.score): "0")
    const [stadiumSelected, setStadiumSelected] = useState<string>(match.stadium ? match.stadium : "")
    const [refereSelected, setRefereeSelected] = useState<string>(match.referee ? match.referee : "")
    const [isFocusStadium, setIsFocusStadium] = useState<boolean>(false)
    const [isFocusReferee, setIsFocusReferee] = useState<boolean>(false)


    const handleUpdateMatch = () => {

        const dataUpdated: IMatch = {
            isEdit: true,
            local: { ...match.local, score: Number(scoreLocal) },
            referee: refereSelected,
            stadium: stadiumSelected,
            statistics: match.statistics,
            summary: match.summary,
            visitant: { ...match.visitant, score: Number(scoreVisitant) },
            date: match.date
        };

        const groupIndex = match.local.team.group! - 1;
        const matchdayIndex = matchday - 1;

        const updatedMatches = group.matches!.map((g, gi) =>
            gi === groupIndex
                ? g.map((m, mi) =>
                    mi === matchdayIndex
                        ? m.map((matchItem) =>
                            matchItem.local.team.name === match.local.team.name
                                ? { ...dataUpdated }
                                : matchItem
                        )
                        : m
                )
                : g
        );

        updateMatchGroup(updatedMatches);

        updateMatch({
            matchday,
            match: {...dataUpdated}
        });

        hideAndShowUpdateMatch(false)
    };


    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowUpdateMatch(false)}
            />

            <Text variant="labelLarge" style={{ marginVertical: Dimensions.get("window").height / 28 }}>Team scores</Text>

            <View style={matchStyles.scoreTeamForm}>
                <View style={matchStyles.teamForm}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} />
                    )}
                    <Text variant='bodyMedium' style={{ marginTop: Dimensions.get("window").height / 106 }}>
                        {match.local.team.name}
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setScoreLocal(formattedText);
                    }}
                    value={scoreLocal}
                    style={createStyles.inputNumberCreate}
                />
            </View>

            <View style={[matchStyles.scoreTeamForm, { marginVertical: Dimensions.get("window").height / 74 }]}>
                <View style={matchStyles.teamForm}>
                    {match.visitant.team.logo ? (
                        <Avatar.Image source={{ uri: match.visitant.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} />
                    )}
                    <Text variant='bodyMedium' style={{ marginTop: Dimensions.get("window").height / 106 }}>
                        {match.visitant.team.name}
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setScoreVisitant(formattedText);
                    }}
                    value={scoreVisitant}
                    style={createStyles.inputNumberCreate}
                />
            </View>

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">Select the stadium's match</Text>
                <Dropdown
                    style={[createStyles.dropdownComplete, isFocusStadium && { borderColor: colors.primary }]}
                    placeholderStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    selectedTextStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    data={getStadiumsName(group.stadiums!)}
                    maxHeight={Dimensions.get("window").height / 3.8}
                    labelField="label"
                    valueField="value"
                    placeholder={String(stadiumSelected)}
                    value={stadiumSelected}
                    onFocus={() => setIsFocusStadium(true)}
                    onBlur={() => setIsFocusStadium(false)}
                    onChange={item => {
                        setStadiumSelected(item.value)
                        setIsFocusStadium(false)
                    }}
                />
            </View>

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">Select the referee's match</Text>
                <Dropdown
                    style={[createStyles.dropdownComplete, isFocusReferee && { borderColor: colors.primary }]}
                    placeholderStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    selectedTextStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    data={getRefereeName(group.referees!)}
                    maxHeight={Dimensions.get("window").height / 3.8}
                    labelField="label"
                    valueField="value"
                    placeholder={String(refereSelected)}
                    value={refereSelected}
                    onFocus={() => setIsFocusReferee(true)}
                    onBlur={() => setIsFocusReferee(false)}
                    onChange={item => {
                        setRefereeSelected(item.value)
                        setIsFocusReferee(false)
                    }}
                />
            </View>

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleUpdateMatch}>
                UPDATE
            </Button>
        </ContainerBackground>
    )
}

export default FormUpdateMatch