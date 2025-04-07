import { useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { Avatar, Button, IconButton, MD3Colors, Text, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown';
// import { DatePickerModal } from 'react-native-paper-dates';

import { View } from '../Themed'
import ContainerBackground from '../general/ContainerBackground'

import { IMatch } from '@/interface/Match';
import { FormEliminationMatchPropsType } from '@/types/elimination.types';

import { generalStyles } from '@/styles/general.styles'
import { createStyles } from '@/styles/create.styles'
import { matchStyles } from '@/styles/match.styles';

import { getRefereeName, getStadiumsName } from '@/utils/defaultGroup';

const FormEliminationMatch = ({ colors, hideAndShowUpdateMatch, match, group, updateEliminationMatch, updateMatchKnockGroup, round }: FormEliminationMatchPropsType) => {

    const [scoreLocal, setScoreLocal] = useState<string>(match.local.score ? String(match.local.score) : "0")
    const [scoreVisitant, setScoreVisitant] = useState<string>(match.visitant.score ? String(match.visitant.score) : "0")
    const [scoreLocalTrip, setScoreLocalTrip] = useState<string>(match.local.scoreTrip ? String(match.local.scoreTrip) : "0")
    const [scoreVisitantTrip, setScoreVisitantTrip] = useState<string>(match.visitant.scoreTrip ? String(match.visitant.scoreTrip) : "0")
    const [scoreLocalTieBreaker, setScoreLocalTieBreaker] = useState<string>(match.local.scoreTieBreaker ? String(match.local.scoreTieBreaker) : "0")
    const [scoreVisitantTieBreaker, setScoreVisitantTieBreaker] = useState<string>(match.visitant.scoreTieBreaker ? String(match.visitant.scoreTieBreaker) : "0")

    const [stadiumSelected, setStadiumSelected] = useState<string>(match.stadium ? match.stadium : "")
    const [referreSelected, setRefereeSelected] = useState<string>(match.referee ? match.referee : "")
    const [isFocusStadium, setIsFocusStadium] = useState<boolean>(false)
    const [isFocusReferee, setIsFocusReferee] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(match.date ? new Date(match.date) : undefined)

    const handleUpdateMatch = () => {

        const dataUpdated: IMatch = {
            isEdit: true,
            local: { ...match.local, score: Number(scoreLocal), scoreTrip: Number(scoreLocalTrip), scoreTieBreaker: Number(scoreLocalTieBreaker) },
            referee: referreSelected,
            stadium: stadiumSelected,
            statistics: match.statistics,
            players: match.players,
            summary: match.summary,
            visitant: { ...match.visitant, score: Number(scoreVisitant), scoreTrip: Number(scoreVisitantTrip), scoreTieBreaker: Number(scoreLocalTieBreaker) },
            date: match.date
        }

        const updatedMatches = group.eliminationMatches!.map((g, gi) =>
            gi === round ? g.map((m) =>
                m.local.team.id === match.local.team.id ? { ...dataUpdated } : m
            ) : g
        );

        updateMatchKnockGroup(updatedMatches);

        updateEliminationMatch({
            round,
            match: { ...dataUpdated }
        });

        hideAndShowUpdateMatch(false)
    }

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

            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <View style={matchStyles.scoreTeamFormKnockout}>
                        <View style={matchStyles.teamFormKnockout}>
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
                        {
                            group.isRoundTripElimination &&
                            <TextInput
                                inputMode="numeric"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    const formattedText = text.replace(/\D/g, '');
                                    setScoreLocalTrip(formattedText);
                                }}
                                value={scoreLocalTrip}
                                style={createStyles.inputNumberCreate}
                            />
                        }
                        <TextInput
                            inputMode="numeric"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedText = text.replace(/\D/g, '');
                                setScoreLocalTieBreaker(formattedText);
                            }}
                            value={scoreLocalTieBreaker}
                            style={createStyles.inputNumberCreate}
                        />
                        <Text variant="labelMedium">Tiebreaker (optional)</Text>
                    </View>
                    <View style={matchStyles.scoreTeamFormKnockout}>
                        <View style={matchStyles.teamFormKnockout}>
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
                        {
                            group.isRoundTripElimination &&
                            <TextInput
                                inputMode="numeric"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    const formattedText = text.replace(/\D/g, '');
                                    setScoreVisitantTrip(formattedText);
                                }}
                                value={scoreVisitantTrip}
                                style={createStyles.inputNumberCreate}
                            />
                        }
                        <TextInput
                            inputMode="numeric"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedText = text.replace(/\D/g, '');
                                setScoreVisitantTieBreaker(formattedText);
                            }}
                            value={scoreVisitantTieBreaker}
                            style={createStyles.inputNumberCreate}
                        />
                        <Text variant="labelMedium">Tiebreaker (optional)</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={createStyles.selectInputDropdownContain}>

                <Text variant="labelLarge">Select the date's match</Text>
                <TextInput
                    label="Match Date"
                    value={date ? date.toLocaleString() : "Select date"}
                    onFocus={() => setOpen(true)}
                    style={matchStyles.dateInput}
                />

                {/* <DatePickerModal
                locale="en"
                mode="single"
                visible={open}
                onDismiss={() => setOpen(false)}
                date={date}
                onConfirm={(params) => {
                    setDate(params.date);
                    setOpen(false);
                }}
            /> */}
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
                    placeholder={String(referreSelected)}
                    value={referreSelected}
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

export default FormEliminationMatch