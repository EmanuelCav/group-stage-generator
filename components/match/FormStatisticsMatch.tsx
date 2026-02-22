import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TestIds } from "react-native-google-mobile-ads";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, IconButton, MD3Colors, Text, TextInput } from "react-native-paper"
import i18n from '@/i18n'

import { FormStatisticsMatchPropsType } from "@/types/match.types"

import { View } from "../Themed"
import ContainerBackground from "../general/ContainerBackground"

import { IMatch } from "@/interface/Match";
import { ICreateStatistic } from "@/interface/Team";

import { generalStyles } from "@/styles/general.styles"
import { matchStyles } from "@/styles/match.styles"
import { createStyles } from "@/styles/create.styles"

import { statisticSchema } from "@/schema/statistic.schema";

import { groupName, nameParticipant } from "@/utils/points";
import { generateId } from "@/utils/defaultGroup";

import { useInterstitialAd } from "@/hooks/useInterstitialAd";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_EVENTS}`;

const FormStatisticsMatch = ({ colors, hideAndShowStatistics, match, group, statistic, matchday, updateMatch, updateMatchGroup, sureRemoveStatistic, isKnockout, round, updateEliminationMatch, updateMatchKnockGroup, getStatistic, spacing, isFullName, premium }: FormStatisticsMatchPropsType) => {

    const [valueLocal, setValueLocal] = useState<string>(statistic.teamLocal?.value !== undefined ? String(statistic.teamLocal.value) : "")
    const [valueVisitant, setValueVisitant] = useState<string>(statistic.teamVisitant?.value !== undefined ? String(statistic.teamVisitant.value) : "")
    const [loading, setLoading] = useState<boolean>(false)

    const { interstitial, isLoaded: isInterstitialLoaded } = useInterstitialAd(premium ? null : adUnitId)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(statisticSchema),
        defaultValues: {
            title: statistic.title ?? ""
        }
    })

    const handleAddStatistic = async (statisticCreated: ICreateStatistic) => {

        const groupIndex = match.local.team.group === undefined ? 0 : match.local.team.group - 1;
        const matchdayIndex = matchday - 1;

        setLoading(true)

        if (statistic.id) {

            const editMatch: IMatch = {
                isEdit: match.isEdit,
                local: match.local,
                referee: match.referee!,
                stadium: match.stadium!,
                statistics: match.statistics.map((s) => s.id === statistic.id ?
                    {
                        ...statistic, title: statisticCreated.title, teamLocal: {
                        team: match.local.team,
                        value: valueLocal ? Number(valueLocal) : 0
                    },
                    teamVisitant: {
                        team: match.visitant.team,
                        value: valueVisitant ? Number(valueVisitant) : 0
                    }
                    } : s),
                players: match.players,
                summary: match.summary,
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
                summary: match.summary,
                players: match.players,
                statistics: [...match.statistics, {
                    id: generateId(),
                    title: statisticCreated.title,
                    teamLocal: {
                        team: match.local.team,
                        value: valueLocal ? Number(valueLocal) : 0
                    },
                    teamVisitant: {
                        team: match.visitant.team,
                        value: valueVisitant ? Number(valueVisitant) : 0
                    }
                }],
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

                if (interstitial) {
                    if (match.statistics.length !== 0) {
                        if (match.statistics.length === 1 || match.statistics.length % 8 === 0) {
                            if ((interstitial.loaded || isInterstitialLoaded) && count > 3 && !premium) {
                                interstitial.show()
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }

            reset()
        }

        setTimeout(() => {
            hideAndShowStatistics(false)
            getStatistic({})
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
                    getStatistic({})
                    hideAndShowStatistics(false)
                }}
            />

            <Controller
                name="title"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={i18n.t('statistic.title')}
                        mode="outlined"
                        style={[createStyles.inputGeneralCreate,
                        { backgroundColor: colors.tertiary }]}
                        maxLength={16}
                    />
                )}
            />

            {errors.title?.message && (
                <Text
                    variant="labelMedium"
                    style={{
                        color: MD3Colors.error50,
                        marginTop: spacing.h106,
                    }}
                >
                    {errors.title.message}
                </Text>
            )}

            <Text
                variant="labelLarge"
                style={{ marginVertical: spacing.h74 }}
            >
                {i18n.t('statistic.value')}
            </Text>

            <View style={[matchStyles.scoreTeamForm, { backgroundColor: colors.background }]}>
                <View style={[matchStyles.teamForm, { backgroundColor: colors.background, alignItems: isFullName ? 'flex-start' : 'center' }]}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} color="#ffffff" style={{ backgroundColor: match.local.team.color }} />
                    )}
                    <Text
                        variant="bodyMedium"
                        style={{ marginTop: spacing.h106 }}
                    >
                        {
                            isFullName ? nameParticipant(match.local.team.name!) : groupName(match.local.team.name!)
                        }
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setValueLocal(formattedText);
                    }}
                    value={valueLocal}
                    maxLength={4}
                    style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                />
            </View>

            <View style={[matchStyles.scoreTeamForm, { backgroundColor: colors.background }]}>
                <View style={[matchStyles.teamForm, { backgroundColor: colors.background, alignItems: isFullName ? 'flex-start' : 'center' }]}>
                    {match.visitant.team.logo ? (
                        <Avatar.Image source={{ uri: match.visitant.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} color="#ffffff" style={{ backgroundColor: match.visitant.team.color }} />
                    )}
                    <Text
                        variant="bodyMedium"
                        style={{ marginTop: spacing.h106 }}
                    >
                        {
                            isFullName ? nameParticipant(match.visitant.team.name!) : groupName(match.visitant.team.name!)
                        }
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setValueVisitant(formattedText);
                    }}
                    maxLength={4}
                    value={valueVisitant}
                    style={[createStyles.inputNumberCreate, { backgroundColor: colors.tertiary }]}
                />
            </View>

            <Button
                loading={loading}
                disabled={loading}
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: '#ffffff' }}
                onPress={handleSubmit((data) => handleAddStatistic(data))}
            >
                {statistic.id ? i18n.t('statistic.update') : i18n.t('statistic.add')}
            </Button>

            {statistic.id && (
                <Button
                    mode="contained"
                    style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: '#ffffff' }}
                    onPress={() => sureRemoveStatistic(true)}
                >
                    {i18n.t('statistic.remove')}
                </Button>
            )}
        </ContainerBackground>
    )
}

export default FormStatisticsMatch