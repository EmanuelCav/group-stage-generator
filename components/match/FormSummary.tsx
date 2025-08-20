import { useState } from "react"
import { Dimensions } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Icon, IconButton, MD3Colors, Text, TextInput } from "react-native-paper"
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import i18n from '@/i18n'

import ContainerBackground from "../general/ContainerBackground"
import { View } from "../Themed";

import { ICreateSummary } from "@/interface/Team";
import { IMatch } from "@/interface/Match";
import { FormSummaryPropsType } from "@/types/match.types"

import { generalStyles } from "@/styles/general.styles"
import { createStyles } from "@/styles/create.styles";
import { configStyles } from "@/styles/config.styles";
import { statisticsStyles } from "@/styles/statistics.styles";

import { summarySchema } from "@/schema/match.schema";

import { getTeamsName, getPlayerName, generateId } from "@/utils/defaultGroup";
import { labelSummaryEvent } from "@/utils/matchday";

const FormSummary = ({ colors, hideAndShowSummary, summary, match, group, updateMatch, updateMatchGroup, matchday, sureRemoveSummary, isKnockout, round, updateEliminationMatch, updateMatchKnockGroup, router, getSummary }: FormSummaryPropsType) => {

    const [statisticSelected, setStatisticSelected] = useState<string>("")
    const [teamSelected, setTeamSelected] = useState<string>("")
    const [playerSelected, setPlayerSelected] = useState<string>(summary.player?.name ?? "")
    const [secondaryPlayerSelected, setSecondaryPlayerSelected] = useState<string>(summary.secondaryPlayer?.name ?? "")

    const [isFocusEvent, setIsFocusEvent] = useState<boolean>(false)
    const [isFocusTeam, setIsFocusTeam] = useState<boolean>(false)
    const [isFocusPlayer, setIsFocusPlayer] = useState<boolean>(false)
    const [isFocusSecondaryPlayer, setIsFocusSecondaryPlayer] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(summarySchema),
        defaultValues: {
            time: summary.time ?? ""
        }
    })

    const handleAddSummary = (summaryCreated: ICreateSummary) => {

        if (!statisticSelected) {
            Toast.show({
                type: 'error',
                text1: i18n.t("errorSummaryEventTitle"),
                text2: i18n.t("errorSummaryEventDescription")
            });
            return
        }

        if (!playerSelected) {
            Toast.show({
                type: 'error',
                text1: i18n.t("errorSummaryPlayerTitle"),
                text2: i18n.t("errorSummaryPlayerDescription")
            });
            return
        }

        setLoading(true)

        const groupIndex = match.local.team.group! - 1;
        const matchdayIndex = matchday - 1;

        if (summary.id) {

            const editMatch: IMatch = {
                isEdit: match.isEdit,
                local: match.local,
                referee: match.referee!,
                stadium: match.stadium!,
                summary: match.summary.map((s) => s.id === summary.id ?
                    {
                        ...summary, title: statisticSelected, time: summaryCreated.time, player: playerSelected ?
                            group.players?.find((p) => p.name === playerSelected) : s.player,
                        secondaryPlayer: secondaryPlayerSelected ?
                            group.players?.find((p) => p.name === secondaryPlayerSelected) : s.secondaryPlayer
                    } : s),
                players: match.players,
                statistics: match.statistics,
                visitant: match.visitant,
                time: match.time,
                date: match.date
            }

            if (isKnockout) {

                const updatedMatches = group.eliminationMatches!.map((g, gi) =>
                    gi === round ? g.map((m) =>
                        m.local.team.id === match.local.team.id ? { ...editMatch } : m
                    ) : g
                );

                updateMatchKnockGroup(updatedMatches);

                updateEliminationMatch({
                    round,
                    match: { ...editMatch }
                });

            } else {

                const updatedMatches = group.matches!.map((g, gi) =>
                    gi === groupIndex
                        ? g.map((m, mi) =>
                            mi === matchdayIndex
                                ? m.map((matchItem) =>
                                    matchItem.local.team.name === match.local.team.name
                                        ? { ...editMatch }
                                        : matchItem
                                )
                                : m
                        )
                        : g
                );

                updateMatchGroup(updatedMatches)

                updateMatch({
                    match: { ...editMatch },
                    matchday
                })

            }

        } else {

            const createMatch: IMatch = {
                isEdit: match.isEdit,
                local: match.local,
                referee: match.referee!,
                stadium: match.stadium!,
                summary: [...match.summary, {
                    id: generateId(),
                    title: statisticSelected,
                    player: group.players?.find((p) => p.name === playerSelected),
                    time: summaryCreated.time,
                    secondaryPlayer: group.players?.find((p) => p.name === secondaryPlayerSelected),
                }],
                players: match.players,
                statistics: match.statistics,
                visitant: match.visitant,
                time: match.time,
                date: match.date
            }

            if (isKnockout) {

                const updatedMatches = group.eliminationMatches!.map((g, gi) =>
                    gi === round ? g.map((m) =>
                        m.local.team.id === match.local.team.id ? { ...createMatch } : m
                    ) : g
                );

                updateMatchKnockGroup(updatedMatches);

                updateEliminationMatch({
                    round,
                    match: { ...createMatch }
                });

            } else {

                const updatedMatches = group.matches!.map((g, gi) =>
                    gi === groupIndex
                        ? g.map((m, mi) =>
                            mi === matchdayIndex
                                ? m.map((matchItem) =>
                                    matchItem.local.team.name === match.local.team.name
                                        ? { ...createMatch }
                                        : matchItem
                                )
                                : m
                        )
                        : g
                );

                updateMatchGroup(updatedMatches)

                updateMatch({
                    match: { ...createMatch },
                    matchday
                })

            }

            reset()
        }

        setTimeout(() => {
            hideAndShowSummary(false)
            getSummary({})
            setLoading(false)
        }, 300)
    }

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => {
                    hideAndShowSummary(false)
                    getSummary({})
                }}
            />
            {
                group.players?.length! > 0 ?
                    <View style={{ marginTop: Dimensions.get("window").height / 28, backgroundColor: colors.background }}>
                        <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                            <Text variant="labelLarge">
                                {i18n.t("sumarry_select_event")}
                            </Text>
                            <Dropdown
                                style={[
                                    createStyles.dropdownComplete,
                                    { backgroundColor: colors.tertiary },
                                    isFocusEvent && { borderColor: colors.primary },
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
                                data={[{
                                    value: "goal",
                                    label: i18n.t("goal")
                                }, {
                                    value: "yellow card",
                                    label: i18n.t("yellows")
                                }, {
                                    value: "red card",
                                    label: i18n.t("reds")
                                }, {
                                    value: "injury",
                                    label: i18n.t("injury")
                                }, {
                                    value: "substitution",
                                    label: i18n.t("substitution")
                                }]}
                                maxHeight={Dimensions.get("window").height / 3.8}
                                labelField="label"
                                valueField="value"
                                placeholder={String(statisticSelected)}
                                value={statisticSelected}
                                onFocus={() => setIsFocusEvent(true)}
                                onBlur={() => setIsFocusEvent(false)}
                                onChange={item => {
                                    setStatisticSelected(item.value);
                                    setIsFocusEvent(false);
                                }}
                            />
                        </View>

                        <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                            <Text variant="labelLarge">
                                {i18n.t("sumarry_select_team")}
                            </Text>
                            <Dropdown
                                style={[
                                    createStyles.dropdownComplete,
                                    { backgroundColor: colors.tertiary },
                                    isFocusTeam && { borderColor: colors.primary },
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
                                data={getTeamsName([match.local.team, match.visitant.team])}
                                maxHeight={Dimensions.get("window").height / 3.8}
                                labelField="label"
                                valueField="value"
                                placeholder={String(teamSelected)}
                                value={teamSelected}
                                onFocus={() => setIsFocusTeam(true)}
                                onBlur={() => setIsFocusTeam(false)}
                                onChange={item => {
                                    setTeamSelected(item.value);
                                    setPlayerSelected("")
                                    setIsFocusTeam(false);
                                }}
                            />
                        </View>

                        <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                            <Text variant="labelLarge">
                                {labelSummaryEvent(statisticSelected)}
                            </Text>
                            <Dropdown
                                style={[
                                    createStyles.dropdownComplete,
                                    { backgroundColor: colors.tertiary },
                                    isFocusPlayer && { borderColor: colors.primary },
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
                                data={getPlayerName(
                                    group.players?.filter((p) =>
                                        teamSelected
                                            ? p.team?.name === teamSelected
                                            : (p.team?.name === match.local.team.name || p.team?.name === match.visitant.team.name)
                                    )!
                                )}
                                maxHeight={Dimensions.get("window").height / 3.8}
                                labelField="label"
                                valueField="value"
                                placeholder={String(playerSelected)}
                                value={playerSelected}
                                onFocus={() => setIsFocusPlayer(true)}
                                onBlur={() => setIsFocusPlayer(false)}
                                onChange={item => {
                                    setPlayerSelected(item.value);
                                    setIsFocusPlayer(false);
                                }}
                            />
                        </View>

                        {
                            statisticSelected === "goal" &&
                            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                                <Text variant="labelLarge">
                                    {i18n.t("sumarry_select_secondaryPlayerAssist")}
                                </Text>
                                <Dropdown
                                    style={[
                                        createStyles.dropdownComplete,
                                        { backgroundColor: colors.tertiary },
                                        isFocusSecondaryPlayer && { borderColor: colors.primary },
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
                                    data={getPlayerName(
                                        group.players?.filter((p) =>
                                            teamSelected
                                                ? p.team?.name === teamSelected
                                                : (p.team?.name === match.local.team.name || p.team?.name === match.visitant.team.name)
                                        )!
                                    )}
                                    maxHeight={Dimensions.get("window").height / 3.8}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={String(secondaryPlayerSelected)}
                                    value={secondaryPlayerSelected}
                                    onFocus={() => setIsFocusSecondaryPlayer(true)}
                                    onBlur={() => setIsFocusSecondaryPlayer(false)}
                                    onChange={item => {
                                        setSecondaryPlayerSelected(item.value);
                                        setIsFocusSecondaryPlayer(false);
                                    }}
                                />
                            </View>
                        }

                        {
                            statisticSelected === "substitution" &&
                            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                                <Text variant="labelLarge">
                                    {i18n.t("sumarry_select_secondaryPlayerAssist")}
                                </Text>
                                <Dropdown
                                    style={[
                                        createStyles.dropdownComplete,
                                        { backgroundColor: colors.tertiary },
                                        isFocusTeam && { borderColor: colors.primary },
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
                                    data={getPlayerName(
                                        group.players?.filter((p) =>
                                            teamSelected
                                                ? p.team?.name === teamSelected
                                                : (p.team?.name === match.local.team.name || p.team?.name === match.visitant.team.name)
                                        )!
                                    )}
                                    maxHeight={Dimensions.get("window").height / 3.8}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={String(secondaryPlayerSelected)}
                                    value={secondaryPlayerSelected}
                                    onFocus={() => setIsFocusSecondaryPlayer(true)}
                                    onBlur={() => setIsFocusSecondaryPlayer(false)}
                                    onChange={item => {
                                        setSecondaryPlayerSelected(item.value);
                                        setIsFocusSecondaryPlayer(false);
                                    }}
                                />
                            </View>
                        }

                        <View style={[configStyles.labelSettings, { backgroundColor: colors.background }]}>
                            <Text variant="bodyLarge">
                                {i18n.t("sumarry_minute")}
                            </Text>
                            <Controller
                                name="time"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        keyboardType="numeric"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        maxLength={3}
                                        style={[configStyles.inputSettingsNumber, { backgroundColor: colors.tertiary }]}
                                    />
                                )}
                            />
                            {
                                errors.time &&
                                <Text
                                    variant="bodySmall"
                                    style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 185 }}
                                >
                                    {errors.time.message}
                                </Text>
                            }
                        </View>

                        <Button
                            mode="contained"
                            style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                            labelStyle={{ color: "#ffffff" }}
                            onPress={handleSubmit((data) => handleAddSummary(data))}
                        >
                            {summary.id ? i18n.t("general.update") : i18n.t("general.add")}
                        </Button>

                        {
                            summary.id &&
                            <Button
                                mode="contained"
                                style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                                labelStyle={{ color: "#ffffff" }}
                                onPress={() => sureRemoveSummary(true)}
                            >
                                {i18n.t("general.remove")}
                            </Button>
                        }

                    </View>
                    :
                    <View style={{
                        marginTop: Dimensions.get("window").height / 28, justifyContent: 'center',
                        alignItems: 'center', backgroundColor: colors.background
                    }}>
                        <Text variant='titleLarge' style={{ color: colors.primary }}>
                            {i18n.t("statistics")}
                        </Text>
                        <Icon
                            source="chart-bar"
                            color={colors.primary}
                            size={42}
                        />
                        <Text variant='bodyLarge' style={statisticsStyles.titleStatistics}>
                            {i18n.t("addPlayersToDisplayAndVisualizeTournamentStatistics")}
                        </Text>
                        <Button
                            loading={loading}
                            disabled={loading}
                            mode="contained"
                            icon="account-multiple-plus"
                            style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                            labelStyle={{ color: "#ffffff" }}
                            onPress={() => router.replace('/players')}
                        >
                            {i18n.t("addPlayers")}
                        </Button>
                    </View>
            }
        </ContainerBackground>
    );
};

export default FormSummary