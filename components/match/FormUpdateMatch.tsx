import { useState } from 'react'
import { enGB, registerTranslation, DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import { Dimensions } from 'react-native'
import { Avatar, Button, IconButton, MD3Colors, PaperProvider, Text, TextInput, DefaultTheme } from 'react-native-paper'
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import { Dropdown } from 'react-native-element-dropdown';
import i18n from '@/i18n'

import { View } from '../Themed'
import ContainerBackground from '../general/ContainerBackground'

import { IMatch } from '@/interface/Match';
import { FormUpdateMatchPropsType } from '@/types/match.types'

import { generalStyles } from '@/styles/general.styles'
import { createStyles } from '@/styles/create.styles'
import { matchStyles } from '@/styles/match.styles';

import { getRefereeName, getStadiumsName } from '@/utils/defaultGroup';
import { groupName } from '@/utils/points';

const FormUpdateMatch = ({ colors, hideAndShowUpdateMatch, match, group, updateMatch, updateMatchGroup, matchday }: FormUpdateMatchPropsType) => {

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

    const [scoreLocal, setScoreLocal] = useState<string>(match.local.score ? String(match.local.score) : "")
    const [scoreVisitant, setScoreVisitant] = useState<string>(match.visitant.score ? String(match.visitant.score) : "")
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
            local: { ...match.local, score: scoreLocal !== "" ? Number(scoreLocal) : scoreVisitant !== "" ? 0 : null },
            referee: referreSelected,
            stadium: stadiumSelected,
            statistics: match.statistics,
            players: match.players,
            summary: match.summary,
            visitant: { ...match.visitant, score: scoreVisitant !== "" ? Number(scoreVisitant) : scoreLocal !== "" ? 0 : null },
            date,
            time: time?.hours ? {
                hours: time.hours,
                minutes: time.minutes
            } : undefined
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

            <Text variant="labelLarge" style={{ marginVertical: Dimensions.get("window").height / 28 }}>
                {i18n.t("team_scores")}
            </Text>

            <View style={[matchStyles.scoreTeamForm, { backgroundColor: colors.background }]}>
                <View style={[matchStyles.teamForm, { backgroundColor: colors.background }]}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} />
                    )}
                    <Text variant='bodyMedium' style={{
                        marginTop: Dimensions.get("window").height / 106,
                        color: colors.surface
                    }}>
                        {groupName(match.local.team.name!)}
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setScoreLocal(formattedText);
                    }}
                    value={String(scoreLocal)}
                    style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                    maxLength={3}
                />
            </View>

            <View style={[matchStyles.scoreTeamForm, {
                marginVertical: Dimensions.get("window").height / 74,
                backgroundColor: colors.background
            }]}>
                <View style={[matchStyles.teamForm, { backgroundColor: colors.background }]}>
                    {match.visitant.team.logo ? (
                        <Avatar.Image source={{ uri: match.visitant.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} />
                    )}
                    <Text variant='bodyMedium' style={{
                        marginTop: Dimensions.get("window").height / 106,
                        color: colors.surface
                    }}>
                        {groupName(match.visitant.team.name!)}
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setScoreVisitant(formattedText);
                    }}
                    value={String(scoreVisitant)}
                    style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                    maxLength={3}
                />
            </View>

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
                <Text variant="labelLarge" style={{ color: colors.surface }}>{i18n.t("select_stadium")}</Text>
                <Dropdown
                    style={[
                        createStyles.dropdownComplete,
                        { backgroundColor: colors.tertiary },
                        isFocusStadium && { borderColor: colors.primary },
                    ]}
                    placeholderStyle={{
                        fontSize: Dimensions.get("window").height / 47,
                        color: colors.surface,
                        backgroundColor: colors.tertiary
                    }}
                    selectedTextStyle={{
                        fontSize: Dimensions.get("window").height / 47,
                        color: colors.surface,
                        backgroundColor: colors.tertiary
                    }}
                    itemTextStyle={{
                        color: colors.surface
                    }}
                    containerStyle={{
                        backgroundColor: colors.tertiary,
                    }}
                    activeColor={colors.primary}
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

            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                <Text variant="labelLarge" style={{ color: colors.surface }}>{i18n.t("select_referee")}</Text>
                <Dropdown
                    style={[
                        createStyles.dropdownComplete,
                        { backgroundColor: colors.tertiary },
                        isFocusReferee && { borderColor: colors.primary },
                    ]}
                    placeholderStyle={{
                        fontSize: Dimensions.get("window").height / 47,
                        color: colors.surface,
                        backgroundColor: colors.tertiary
                    }}
                    selectedTextStyle={{
                        fontSize: Dimensions.get("window").height / 47,
                        color: colors.surface,
                        backgroundColor: colors.tertiary
                    }}
                    itemTextStyle={{
                        color: colors.surface
                    }}
                    containerStyle={{
                        backgroundColor: colors.tertiary,
                    }}
                    activeColor={colors.primary}
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

            <Button
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleUpdateMatch}
            >
                {i18n.t("update")}
            </Button>
        </ContainerBackground>
    )
}

export default FormUpdateMatch