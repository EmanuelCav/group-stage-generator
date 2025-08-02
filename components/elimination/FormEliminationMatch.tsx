import { useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { Avatar, Button, DefaultTheme, IconButton, MD3Colors, PaperProvider, Text, TextInput } from 'react-native-paper'
import { DatePickerModal, enGB, registerTranslation, TimePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import { Dropdown } from 'react-native-element-dropdown';
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

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            surface: "#111",
            background: "#111",
            primary: "#999",
            onSurface: "#999",

        },
    }

    registerTranslation('en-GB', enGB)

    const [scoreLocal, setScoreLocal] = useState<string>(match.local.score !== null ? String(match.local.score) : "")
    const [scoreVisitant, setScoreVisitant] = useState<string>(match.visitant.score !== null ? String(match.visitant.score) : "")
    const [scoreLocalTrip, setScoreLocalTrip] = useState<string>((match.local.scoreTrip !== null && match.local.scoreTrip !== undefined ) ? String(match.local.scoreTrip) : "")
    const [scoreVisitantTrip, setScoreVisitantTrip] = useState<string>((match.visitant.scoreTrip !== null && match.visitant.scoreTrip !== undefined ) ? String(match.visitant.scoreTrip) : "")
    const [scoreLocalTieBreaker, setScoreLocalTieBreaker] = useState<string>((match.local.scoreTieBreaker !== null && match.local.scoreTieBreaker !== undefined ) ? String(match.local.scoreTieBreaker) : "")
    const [scoreVisitantTieBreaker, setScoreVisitantTieBreaker] = useState<string>((match.visitant.scoreTieBreaker !== null && match.visitant.scoreTieBreaker !== undefined ) ? String(match.visitant.scoreTieBreaker) : "")

    const [stadiumSelected, setStadiumSelected] = useState<string>(match.stadium ?? "")
    const [referreSelected, setRefereeSelected] = useState<string>(match.referee ?? "")
    const [isFocusStadium, setIsFocusStadium] = useState<boolean>(false)
    const [isFocusReferee, setIsFocusReferee] = useState<boolean>(false)
    const [date, setDate] = useState<string | undefined>(match.date ?? undefined);
    const [time, setTime] = useState<{ hours: number; minutes: number } | undefined>(match.time ?? undefined);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

    const handleUpdateMatch = () => {

        const dataUpdated: IMatch = {
            isEdit: (scoreLocal !== "" || scoreVisitant !== ""),
            local: { ...match.local, score: scoreLocal !== "" ? Number(scoreLocal) : scoreVisitant !== "" ? 0 : null, scoreTrip: scoreLocalTrip !== "" ? Number(scoreLocalTrip) : scoreVisitantTrip !== "" ? 0 : null, scoreTieBreaker: scoreLocalTieBreaker !== "" ? Number(scoreLocalTieBreaker) : scoreVisitantTieBreaker !== "" ? 0 : null },
            referee: referreSelected,
            stadium: stadiumSelected,
            statistics: match.statistics,
            players: match.players,
            summary: match.summary,
            visitant: { ...match.visitant, score: scoreVisitant !== "" ? Number(scoreVisitant) : scoreLocal !== "" ? 0 : null, scoreTrip: scoreVisitantTrip !== "" ? Number(scoreVisitantTrip) : scoreLocalTrip !== "" ? 0 : null, scoreTieBreaker: scoreVisitantTieBreaker !== "" ? Number(scoreVisitantTieBreaker) : scoreLocalTieBreaker !== "" ? 0 : null },
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: colors.background }}>
                    <View style={[matchStyles.scoreTeamFormKnockout, { backgroundColor: colors.background }]}>
                        <View style={[matchStyles.teamFormKnockout, { backgroundColor: colors.background }]}>
                            {match.local.team.logo ? (
                                <Avatar.Image source={{ uri: match.local.team.logo }} size={32} />
                            ) : (
                                <Avatar.Icon icon="shield-outline" size={32} />
                            )}
                            <Text variant='bodyMedium' style={{ marginTop: Dimensions.get("window").height / 106 }}>
                                {match.local.team.name}
                            </Text>
                        </View>
                        {
                            group.isRoundTripElimination &&
                            <Text variant="labelMedium" style={{ marginVertical: Dimensions.get("window").height / 106 }}>
                                {i18n.t("home")}
                            </Text>
                        }
                        <TextInput
                            inputMode="numeric"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedText = text.replace(/\D/g, '');
                                setScoreLocal(formattedText);
                            }}
                            value={scoreLocal}
                            style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                            maxLength={3}
                        />
                        {group.isRoundTripElimination && (
                            <>
                                <Text variant="labelMedium" style={{ marginVertical: Dimensions.get("window").height / 106 }}>
                                    {i18n.t("away")}
                                </Text>
                                <TextInput
                                    inputMode="numeric"
                                    keyboardType="numeric"
                                    onChangeText={(text) => {
                                        const formattedText = text.replace(/\D/g, '');
                                        setScoreLocalTrip(formattedText);
                                    }}
                                    value={scoreLocalTrip}
                                    style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                                />
                            </>
                        )}
                        <Text variant="labelMedium" style={{ marginVertical: Dimensions.get("window").height / 106 }}>
                            {i18n.t("tiebreakerOptional")}
                        </Text>
                        <TextInput
                            inputMode="numeric"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedText = text.replace(/\D/g, '');
                                setScoreLocalTieBreaker(formattedText);
                            }}
                            value={scoreLocalTieBreaker}
                            style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                            maxLength={3}
                        />
                    </View>

                    <View style={[matchStyles.scoreTeamFormKnockout, { backgroundColor: colors.background }]}>
                        <View style={[matchStyles.teamFormKnockout, { backgroundColor: colors.background }]}>
                            {match.visitant.team.logo ? (
                                <Avatar.Image source={{ uri: match.visitant.team.logo }} size={32} />
                            ) : (
                                <Avatar.Icon icon="shield-outline" size={32} />
                            )}
                            <Text variant='bodyMedium' style={{ marginTop: Dimensions.get("window").height / 106 }}>
                                {match.visitant.team.name}
                            </Text>
                        </View>
                        {
                            group.isRoundTripElimination &&
                            <Text variant="labelMedium" style={{ marginVertical: Dimensions.get("window").height / 106 }}>
                                {i18n.t("home")}
                            </Text>
                        }
                        <TextInput
                            inputMode="numeric"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedText = text.replace(/\D/g, '');
                                setScoreVisitant(formattedText);
                            }}
                            value={scoreVisitant}
                            style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                            maxLength={3}
                        />
                        {group.isRoundTripElimination && (
                            <>

                                <Text variant="labelMedium" style={{ marginVertical: Dimensions.get("window").height / 106 }}>
                                    {i18n.t("away")}
                                </Text>
                                <TextInput
                                    inputMode="numeric"
                                    keyboardType="numeric"
                                    onChangeText={(text) => {
                                        const formattedText = text.replace(/\D/g, '');
                                        setScoreVisitantTrip(formattedText);
                                    }}
                                    value={scoreVisitantTrip}
                                    style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                                />
                            </>
                        )}
                        <Text variant="labelMedium" style={{ marginVertical: Dimensions.get("window").height / 106 }}>
                            {i18n.t("tiebreakerOptional")}
                        </Text>
                        <TextInput
                            inputMode="numeric"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedText = text.replace(/\D/g, '');
                                setScoreVisitantTieBreaker(formattedText);
                            }}
                            value={scoreVisitantTieBreaker}
                            style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={[createStyles.selectInputDropdownContain,
            { backgroundColor: colors.background }]}>
                <Text variant="labelLarge">{i18n.t("select_match_date")}</Text>

                <Button onPress={() => setShowDatePicker(true)}>
                    {date ?? i18n.t("select_date")}
                </Button>

                <Button onPress={() => setShowTimePicker(true)}>
                    {time?.hours ? `${time.hours < 10 ? "0" : ""}${time.hours}:${time.minutes < 10 ? "0" : ""}${time.minutes}` : i18n.t("select_hour")}
                </Button>

                <PaperProvider theme={theme}>
                    <DatePickerModal
                        locale="en-GB"
                        mode="single"
                        visible={showDatePicker}
                        onDismiss={() => setShowDatePicker(false)}
                        onConfirm={(d: { date: CalendarDate }) => {
                            setShowDatePicker(false);
                            setDate(d.date?.toISOString().split("T")[0]);
                        }}
                    />
                </PaperProvider>

                <TimePickerModal
                    visible={showTimePicker}
                    onDismiss={() => setShowTimePicker(false)}
                    onConfirm={(t) => {
                        setShowTimePicker(false);
                        setTime(t);
                    }}
                    hours={time?.hours}
                    minutes={time?.minutes}
                    locale="en"
                />
            </View>

            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                <Text variant="labelLarge">{i18n.t("selectMatchStadiumLabel")}</Text>
                <Dropdown
                    style={[createStyles.dropdownComplete, { backgroundColor: colors.tertiary }, isFocusStadium && { borderColor: colors.primary }]}
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

            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                <Text variant="labelLarge">{i18n.t("selectMatchRefereeLabel")}</Text>
                <Dropdown
                    style={[createStyles.dropdownComplete, { backgroundColor: colors.tertiary }, isFocusReferee && { borderColor: colors.primary }]}
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