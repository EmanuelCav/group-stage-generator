import { useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { Avatar, Button, IconButton, MD3Colors, Text, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown';
// import { DatePickerModal } from 'react-native-paper-dates';
import i18n from '@/i18n'

import { View } from '../Themed'
import ContainerBackground from '../general/ContainerBackground'

import { IMatch } from '@/interface/Match';
import { FormEliminationMatchPropsType } from '@/types/elimination.types';

import { generalStyles } from '@/styles/general.styles'
import { createStyles } from '@/styles/create.styles'
import { matchStyles } from '@/styles/match.styles';

import { getRefereeName, getStadiumsName } from '@/utils/defaultGroup';
import { isScoreElimination, winner } from '@/utils/elimination';

const FormEliminationMatch = ({ colors, hideAndShowUpdateMatch, match, group, updateEliminationMatch, updateMatchKnockGroup, round }: FormEliminationMatchPropsType) => {

    const [scoreLocal, setScoreLocal] = useState<string>((match.local.score || match.local.score === 0) ? String(match.local.score) : "")
    const [scoreVisitant, setScoreVisitant] = useState<string>((match.visitant.score || match.visitant.score === 0) ? String(match.visitant.score) : "")
    const [scoreLocalTrip, setScoreLocalTrip] = useState<string>((match.local.scoreTrip || match.local.scoreTrip === 0) ? String(match.local.scoreTrip) : "")
    const [scoreVisitantTrip, setScoreVisitantTrip] = useState<string>((match.visitant.scoreTrip || match.visitant.scoreTrip === 0) ? String(match.visitant.scoreTrip) : "")
    const [scoreLocalTieBreaker, setScoreLocalTieBreaker] = useState<string>((match.local.scoreTieBreaker || match.local.scoreTieBreaker === 0) ? String(match.local.scoreTieBreaker) : "")
    const [scoreVisitantTieBreaker, setScoreVisitantTieBreaker] = useState<string>((match.visitant.scoreTieBreaker || match.visitant.scoreTieBreaker === 0) ? String(match.visitant.scoreTieBreaker) : "")

    const [stadiumSelected, setStadiumSelected] = useState<string>(match.stadium ? match.stadium : "")
    const [referreSelected, setRefereeSelected] = useState<string>(match.referee ? match.referee : "")
    const [isFocusStadium, setIsFocusStadium] = useState<boolean>(false)
    const [isFocusReferee, setIsFocusReferee] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(match.date ? new Date(match.date) : undefined)

    const handleUpdateMatch = () => {

        const dataUpdated: IMatch = {
            isEdit: true,
            local: { ...match.local, score: scoreLocal ? Number(scoreLocal) : 0, scoreTrip: scoreLocalTrip ? Number(scoreLocalTrip) : 0, scoreTieBreaker: scoreLocalTieBreaker ? Number(scoreLocalTieBreaker) : 0 },
            referee: referreSelected,
            stadium: stadiumSelected,
            statistics: match.statistics,
            players: match.players,
            summary: match.summary,
            visitant: { ...match.visitant, score: scoreVisitant ? Number(scoreVisitant) : 0, scoreTrip: scoreVisitantTrip ? Number(scoreVisitantTrip) : 0, scoreTieBreaker: scoreVisitantTieBreaker ? Number(scoreVisitantTieBreaker) : 0 },
            date: match.date
        }

        let indexMatch: number;

        const updatedMatches = group.eliminationMatches!.map((g, gi) => {
            if (gi === round) {
                return g.map((m, miu) => {
                    if (m.local.team.id === match.local.team.id) {
                        indexMatch = miu
                        return { ...dataUpdated };
                    }
                    return m
                });
            } else if (gi === round + 1 && round < group.eliminationMatches!.length - 1 && isScoreElimination(dataUpdated, group.isRoundTripElimination!)) {
                return g.map((m, mi) =>
                    indexMatch % 2 === 0
                        ? indexMatch / 2 === mi
                            ? {
                                ...m,
                                isEdit: false,
                                local: {
                                    team: winner(dataUpdated, group.isRoundTripElimination!).team,
                                    score: null,
                                },
                                players: [],
                                referee: m.referee,
                                stadium: m.stadium,
                                statistics: [],
                                summary: [],
                                visitant: m.visitant
                            }
                            : m
                        : Math.floor(indexMatch / 2) === mi
                            ? {
                                ...m,
                                isEdit: false,
                                local: m.local,
                                players: [],
                                referee: m.referee,
                                stadium: m.stadium,
                                statistics: [],
                                summary: [],
                                visitant: {
                                    team: winner(dataUpdated, group.isRoundTripElimination!).team,
                                    score: null,
                                }
                            }
                            : m
                );
            } else {
                return g;
            }
        });

        updateMatchKnockGroup(updatedMatches);

        updateEliminationMatch({
            round,
            match: { ...dataUpdated }
        })

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

            <Text variant="labelLarge" style={{ marginVertical: Dimensions.get("window").height / 28 }}>
                {i18n.t("teamScores")}
            </Text>

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
                        {group.isRoundTripElimination && (
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
                        )}
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
                        <Text variant="labelMedium">{i18n.t("tiebreakerOptional")}</Text>
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
                        {group.isRoundTripElimination && (
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
                        )}
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
                        <Text variant="labelMedium">{i18n.t("tiebreakerOptional")}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">{i18n.t("selectMatchDateLabel")}</Text>
                <TextInput
                    label={i18n.t("matchDateLabel")}
                    value={date ? date.toLocaleString() : i18n.t("selectDatePlaceholder")}
                    onFocus={() => setOpen(true)}
                    style={matchStyles.dateInput}
                />
                {/* <DatePickerModal ... /> */}
            </View>

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">{i18n.t("selectMatchStadiumLabel")}</Text>
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
                        setStadiumSelected(item.value);
                        setIsFocusStadium(false);
                    }}
                />
            </View>

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">{i18n.t("selectMatchRefereeLabel")}</Text>
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
                        setRefereeSelected(item.value);
                        setIsFocusReferee(false);
                    }}
                />
            </View>

            <Button
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleUpdateMatch}
            >
                {i18n.t("updateButton")}
            </Button>
        </ContainerBackground>
    )
}

export default FormEliminationMatch