import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Icon, MD3Colors, Text, TextInput } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import { View } from "react-native";

import ContainerBackground from "../general/ContainerBackground"
import CustomDropdown from "../general/CustomDropdown";

import { ICreateSummary } from "@/interface/Team";
import { IMatch } from "@/interface/Match";
import { FormSummaryPropsType } from "@/types/match.types"

import { generalStyles } from "@/styles/general.styles"
import { createStyles } from "@/styles/create.styles";
import { configStyles } from "@/styles/config.styles";
import { statisticsStyles } from "@/styles/statistics.styles";

import { summarySchema } from "@/schema/match.schema";

import { getTeamsName, getPlayerName, generateId } from "@/utils/defaultGroup";
import { getGroupUpdateTeamMatch, labelSummaryEvent } from "@/utils/matchday";

import { interstitialService } from "@/services/interstitialService";

const FormSummary = ({ colors, hideAndShowSummary, summary, match, group, updateMatch, updateMatchGroup, matchday, sureRemoveSummary, isKnockout, round, updateEliminationMatch, updateMatchKnockGroup, router, getSummary, spacing, premium, t }: FormSummaryPropsType) => {

    const [statisticSelected, setStatisticSelected] = useState<string>(summary.title ?? "")
    const [teamSelected, setTeamSelected] = useState<string>(summary.player?.team?.name ?? "")
    const [playerSelected, setPlayerSelected] = useState<string>(summary.player?.name ?? "")
    const [secondaryPlayerSelected, setSecondaryPlayerSelected] = useState<string>(summary.secondaryPlayer?.name ?? "")

    const [loading, setLoading] = useState<boolean>(false)

    const teamsOptions = useMemo(
        () => getTeamsName([match.local.team, match.visitant.team]),
        [match.local.team.id, match.visitant.team.id]
    )

    const playerOptions = useMemo(
        () => getPlayerName(
            group.players?.filter((p) =>
                teamSelected
                    ? p.team?.name === teamSelected
                    : (p.team?.name === match.local.team.name || p.team?.name === match.visitant.team.name)
            )!
        ), [group.players, teamSelected, match.local.team.id, match.visitant.team.id]
    )

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(summarySchema),
        defaultValues: {
            time: summary.time ?? ""
        }
    })

    const handleAddSummary = async (summaryCreated: ICreateSummary) => {

        if (!statisticSelected) {
            Toast.show({
                type: 'error',
                text1: t("errorSummaryEventTitle"),
                text2: t("errorSummaryEventDescription")
            });
            return
        }

        if (!playerSelected) {
            Toast.show({
                type: 'error',
                text1: t("errorSummaryPlayerTitle"),
                text2: t("errorSummaryPlayerDescription")
            });
            return
        }

        try {

            setLoading(true)

            const matchdayIndex = matchday! - 1;
            const groupIndex = getGroupUpdateTeamMatch(group.matches!, match, isKnockout ? 0 : matchdayIndex)

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

                try {

                    const storedCount = await AsyncStorage.getItem("reviewCount");
                    const count = storedCount ? parseInt(storedCount, 10) : 0;

                    if (match.summary.length !== 0) {
                        if (match.summary.length === 1 || match.summary.length % 7 === 0) {
                            if (interstitialService.isLoaded() && count > 3 && !premium) {
                                interstitialService.show()
                            }
                        }
                    }

                } catch (error) {
                    console.log(error);
                }

            }

            hideAndShowSummary(false)
            getSummary({})
            reset()

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    return (
        <ContainerBackground zIndex={20} onClose={() => {
            hideAndShowSummary(false)
            getSummary({})
        }}>
            {
                group.players?.length! > 0 ?
                    <View style={{ marginTop: spacing.h28, backgroundColor: colors.background }}>
                        <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                            <Text variant="labelLarge">
                                {t("sumarry_select_event")}
                            </Text>
                            <CustomDropdown
                                data={[
                                    { value: "goal", label: t("goal") },
                                    { value: "yellow card", label: t("yellows") },
                                    { value: "red card", label: t("reds") },
                                    { value: "injury", label: t("injury") },
                                    { value: "substitution", label: t("substitution") },
                                ]}
                                value={statisticSelected}
                                colors={colors}
                                onChange={(item) => {
                                    setStatisticSelected(item.value);
                                }}
                            />
                        </View>

                        <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                            <Text variant="labelLarge">
                                {t("sumarry_select_team")}
                            </Text>
                            <CustomDropdown
                                data={teamsOptions}
                                value={teamSelected}
                                colors={colors}
                                onChange={(item) => {
                                    setTeamSelected(item.value);
                                    setPlayerSelected("");
                                }}
                            />
                        </View>

                        <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                            <Text variant="labelLarge">
                                {labelSummaryEvent(statisticSelected, t)}
                            </Text>
                            <CustomDropdown
                                data={playerOptions}
                                value={playerSelected}
                                colors={colors}
                                onChange={(item) => {
                                    setPlayerSelected(item.value);
                                }}
                            />
                        </View>

                        {
                            statisticSelected === "goal" &&
                            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                                <Text variant="labelLarge">
                                    {t("sumarry_select_secondaryPlayerAssist")}
                                </Text>
                                <CustomDropdown
                                    data={playerOptions}
                                    value={secondaryPlayerSelected}
                                    colors={colors}
                                    onChange={(item) => {
                                        setSecondaryPlayerSelected(item.value);
                                    }}
                                />
                            </View>
                        }

                        {
                            statisticSelected === "substitution" &&
                            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                                <Text variant="labelLarge">
                                    {t("sumarry_select_secondaryPlayerAssist")}
                                </Text>
                                <CustomDropdown
                                    data={playerOptions}
                                    value={secondaryPlayerSelected}
                                    colors={colors}
                                    onChange={(item) => {
                                        setSecondaryPlayerSelected(item.value);
                                    }}
                                />
                            </View>
                        }

                        <View style={[configStyles.labelSettings, { backgroundColor: colors.background }]}>
                            <Text variant="bodyLarge">
                                {t("sumarry_minute")}
                            </Text>
                            <Controller
                                name="time"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        inputMode="numeric"
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            const formattedText = text.replace(/\D/g, '');
                                            onChange(formattedText);
                                        }}
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
                                    style={{ color: MD3Colors.error50, marginTop: spacing.h185 }}
                                >
                                    {t(errors.time.message!, { defaultValue: errors.time.message })}
                                </Text>
                            }
                        </View>

                        <Button
                            loading={loading}
                            disabled={loading}
                            mode="contained"
                            style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                            labelStyle={{ color: "#ffffff" }}
                            onPress={handleSubmit((data) => handleAddSummary(data))}
                        >
                            {summary.id ? t("general.update") : t("general.add")}
                        </Button>

                        {
                            summary.id &&
                            <Button
                                disabled={loading}
                                mode="contained"
                                style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                                labelStyle={{ color: "#ffffff" }}
                                onPress={() => sureRemoveSummary(true)}
                            >
                                {t("general.remove")}
                            </Button>
                        }

                    </View>
                    :
                    <View style={{
                        marginTop: spacing.h28, justifyContent: 'center',
                        alignItems: 'center', backgroundColor: colors.background
                    }}>
                        <Text variant='titleLarge' style={{ color: colors.primary }}>
                            {t("statistics")}
                        </Text>
                        <Icon
                            source="chart-bar"
                            color={colors.primary}
                            size={42}
                        />
                        <Text variant='bodyLarge' style={statisticsStyles.titleStatistics}>
                            {t("addPlayersToDisplayAndVisualizeTournamentStatistics")}
                        </Text>
                        <Button
                            mode="contained"
                            icon="account-multiple-plus"
                            style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                            labelStyle={{ color: "#ffffff" }}
                            onPress={() => router.replace(`/(drawer)/teams`)}
                        >
                            {t("addPlayers")}
                        </Button>
                    </View>
            }
        </ContainerBackground>
    );
};

export default FormSummary