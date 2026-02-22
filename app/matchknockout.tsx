import { useCallback, useEffect, useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router"
import { FlatList } from "react-native"
import { Button, IconButton, SegmentedButtons, Text, useTheme } from "react-native-paper"
import { TestIds } from 'react-native-google-mobile-ads';
import i18n from '@/i18n'

import { View } from "@/components/Themed"
import { columnTitle, isScoreElimination, winner } from "@/utils/elimination"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import ScoreTeams from "@/components/match/ScoreTeams"
import Information from "@/components/match/Information"
import Summary from "@/components/match/Summary"
import StatisticMatch from "@/components/match/StatisticMatch"
import PlayersMatch from "@/components/match/PlayersMatch"
import AddAction from "@/components/general/AddAction"
import FormLineUp from "@/components/match/FormLineUp"
import FormEliminationMatch from "@/components/elimination/FormEliminationMatch"
import FormStatisticsMatch from "@/components/match/FormStatisticsMatch"
import FormSummary from "@/components/match/FormSummary"
import Sure from "@/components/general/Sure"
import MainScreen from "@/components/general/MainScreen"

import { IMatch, IMatchStatistic, ISummary } from "@/interface/Match"

import { matchStyles } from "@/styles/match.styles"

import { matchStore } from "@/store/match.store"
import { groupStore } from "@/store/group.store"
import { userStore } from "@/store/user.store"

import { lineupPlayers } from "@/utils/matchday"

import { useSpacing } from "@/hooks/useSpacing";
import { useInterstitialAd } from "@/hooks/useInterstitialAd";
import { useIsFullName } from "@/hooks/useIsFullName";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_MATCH}`;

const Matchknockout = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { sureRemoveGroup, sureRestartGroup, group, updateMatchKnockGroup, updateMatchGroup, createGroup, groups } = groupStore()
    const { matchknockout, segmentedButton, handleSegmented, showForm, hideAndShowUpdateMatch, statistic, getSummary,
        hideAndShowPlayers, hideAndShowStatistics, hideAndShowSummary, showFormPlayers, showFormStatistics, showFormSummary,
        summary, sureRemoveSummary, getStatistic, sureRemoveStatistic, updateEliminationMatch, updateMatch, isSureStatistic, isSureSummary
    } = matchStore()
    const { premium } = userStore()
    const insets = useSafeAreaInsets()
    const spacing = useSpacing()
    const { isFullName } = useIsFullName()

    const { interstitial, isLoaded: isInterstitialLoaded } = useInterstitialAd(premium ? null : adUnitId)

    const sortedSummary = useMemo(() => {
        return [...(matchknockout.match?.summary ?? [])].sort((a, b) => Number(b.time) - Number(a.time))
    }, [matchknockout.match?.summary])

    const showLineUp = useMemo(() => {
        return lineupPlayers(
            matchknockout.match?.players.filter(p => p.team?.id === matchknockout.match?.local.team.id)!,
            matchknockout.match?.players.filter(p => p.team?.id === matchknockout.match?.visitant.team.id)!
        )
    }, [matchknockout.match])

    const handleUpdateSummary = useCallback((data: ISummary) => {
        getSummary(data)
        hideAndShowSummary(true)
    }, [])

    const handleUpdateStatistic = useCallback((data: IMatchStatistic) => {
        getStatistic(data)
        hideAndShowStatistics(true)
    }, [])

    const handleRemoveSummary = () => {

        const editMatch: IMatch = {
            isEdit: matchknockout.match!.isEdit,
            local: matchknockout.match!.local,
            time: matchknockout.match?.time,
            referee: matchknockout.match!.referee!,
            stadium: matchknockout.match!.stadium!,
            statistics: matchknockout.match!.statistics,
            players: matchknockout.match!.players,
            summary: matchknockout.match!.summary.filter((s) => s.id !== summary.id),
            visitant: matchknockout.match!.visitant,
            date: matchknockout.match!.date
        }

        let indexMatch: number;

        const updatedMatches = group.eliminationMatches!.map((g, gi) => {
            if (gi === matchknockout.round) {
                return g.map((m, miu) => {
                    if (m.local.team.id === matchknockout.match!.local.team.id) {
                        indexMatch = miu
                        return { ...editMatch };
                    }
                    return m
                });
            } else if (gi === matchknockout.round! + 1 && matchknockout.round! < group.eliminationMatches!.length - 1 &&
                isScoreElimination(editMatch, group.isRoundTripElimination!)) {
                return g.map((m, mi) =>
                    indexMatch % 2 === 0
                        ? indexMatch / 2 === mi
                            ? {
                                ...m,
                                isEdit: false,
                                local: {
                                    team: winner(editMatch, group.isRoundTripElimination!).team,
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
                                    team: winner(editMatch, group.isRoundTripElimination!).team,
                                    score: null,
                                }
                            }
                            : m
                );
            } else {
                return g;
            }
        });

        updateMatchKnockGroup(updatedMatches)

        updateEliminationMatch({
            match: { ...editMatch },
            round: matchknockout.round
        })

        sureRemoveSummary(false)
        hideAndShowSummary(false)
        getSummary({})
    }

    const handleRemoveStatistic = () => {

        const editMatch: IMatch = {
            isEdit: matchknockout.match!.isEdit,
            local: matchknockout.match!.local,
            time: matchknockout.match?.time,
            referee: matchknockout.match!.referee,
            stadium: matchknockout.match!.stadium,
            statistics: matchknockout.match!.statistics.filter((s) => s.id !== statistic.id),
            players: matchknockout.match!.players,
            summary: matchknockout.match!.summary,
            visitant: matchknockout.match!.visitant,
            date: matchknockout.match!.date
        }

        let indexMatch: number;

        const updatedMatches = group.eliminationMatches!.map((g, gi) => {
            if (gi === matchknockout.round) {
                return g.map((m, miu) => {
                    if (m.local.team.id === matchknockout.match!.local.team.id) {
                        indexMatch = miu
                        return { ...editMatch };
                    }
                    return m
                });
            } else if (gi === matchknockout.round! + 1 && matchknockout.round! < group.eliminationMatches!.length - 1 &&
                isScoreElimination(editMatch, group.isRoundTripElimination!)) {
                return g.map((m, mi) =>
                    indexMatch % 2 === 0
                        ? indexMatch / 2 === mi
                            ? {
                                ...m,
                                isEdit: false,
                                local: {
                                    team: winner(editMatch, group.isRoundTripElimination!).team,
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
                                    team: winner(editMatch, group.isRoundTripElimination!).team,
                                    score: null,
                                }
                            }
                            : m
                );
            } else {
                return g;
            }
        })

        updateMatchKnockGroup(updatedMatches)

        updateEliminationMatch({
            match: { ...editMatch },
            round: matchknockout.round
        })

        sureRemoveStatistic(false)
        hideAndShowStatistics(false)
        getStatistic({})
    }

    const goBack = useCallback(() => {
        router.back()
    }, [router])

    useEffect(() => {
        hideAndShowUpdateMatch(false)
        hideAndShowPlayers(false)
        hideAndShowStatistics(false)
        hideAndShowSummary(false)
        sureRemoveStatistic(false)
        sureRemoveSummary(false)
        getSummary({})
        getStatistic({})
    }, [])

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} goBack={goBack} router={router} title={i18n.t("match_title")}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup}
                createGroup={createGroup} group={group} groups={groups} premium={premium}
            />
            <SureGeneral />

            {isSureSummary && (
                <Sure
                    close={() => sureRemoveSummary(false)}
                    text={i18n.t("areYouSureDelete")}
                    labelButton={i18n.t("remove")}
                    func={handleRemoveSummary}
                />
            )}

            {isSureStatistic && (
                <Sure
                    close={() => sureRemoveStatistic(false)}
                    text={i18n.t("areYouSureDelete")}
                    labelButton={i18n.t("remove")}
                    func={handleRemoveStatistic}
                />
            )}

            {
                showFormPlayers && <FormLineUp colors={colors} hideAndShowPlayers={hideAndShowPlayers}
                    match={matchknockout.match!} group={group} matchday={matchknockout.round!} spacing={spacing}
                    updateMatch={updateMatch} updateMatchGroup={updateMatchGroup} round={matchknockout.round!} isFullName={isFullName}
                    isKnockout={true} updateEliminationMatch={updateEliminationMatch} updateMatchKnockGroup={updateMatchKnockGroup} />
            }

            {
                showFormStatistics && <FormStatisticsMatch colors={colors} hideAndShowStatistics={hideAndShowStatistics} updateMatchGroup={updateMatchGroup}
                    match={matchknockout.match!} group={group} statistic={statistic} updateMatch={updateMatch} getStatistic={getStatistic}
                    matchday={matchknockout.round!} sureRemoveStatistic={sureRemoveStatistic} round={matchknockout.round!} spacing={spacing}
                    isKnockout={true} updateEliminationMatch={updateEliminationMatch} updateMatchKnockGroup={updateMatchKnockGroup} isFullName={isFullName} premium={premium} />
            }

            {
                showFormSummary && <FormSummary colors={colors} hideAndShowSummary={hideAndShowSummary} updateMatchGroup={updateMatchGroup}
                    summary={summary} match={matchknockout.match!} group={group} updateMatch={updateMatch} getSummary={getSummary}
                    matchday={matchknockout.round!} sureRemoveSummary={sureRemoveSummary} round={matchknockout.round!} spacing={spacing}
                    isKnockout={true} updateEliminationMatch={updateEliminationMatch} updateMatchKnockGroup={updateMatchKnockGroup} router={router} premium={premium} />
            }

            {
                showForm && <FormEliminationMatch match={matchknockout.match!}
                    colors={colors} group={group} round={matchknockout.round!}
                    hideAndShowUpdateMatch={hideAndShowUpdateMatch}
                    updateEliminationMatch={updateEliminationMatch}
                    updateMatchKnockGroup={updateMatchKnockGroup}
                    premium={premium}
                    interstitial={interstitial!}
                    isIntersitialLoaded={isInterstitialLoaded}
                    spacing={spacing}
                    isFullName={isFullName}
                />
            }

            <View style={[matchStyles.containerMatch, { backgroundColor: "transparent" }]}>
                <View style={[matchStyles.titleMatch, { backgroundColor: colors.background }]}>
                    <Text variant='titleMedium' style={{ color: colors.primary }}>
                        {columnTitle(matchknockout.round!, group.eliminationMatches?.length!)}
                    </Text>
                    <IconButton
                        icon="pencil"
                        size={24}
                        onPress={() => hideAndShowUpdateMatch(true)}
                        iconColor={colors.primary}
                    />
                </View>
                <ScoreTeams match={matchknockout.match!} colors={colors} spacing={spacing} isFullName={isFullName} />
                <Information match={matchknockout.match!} colors={colors} />
                <SegmentedButtons
                    style={{ marginTop: spacing.h47 }}
                    value={segmentedButton}
                    onValueChange={handleSegmented}
                    buttons={[
                        {
                            value: 'summary',
                            label: i18n.t("summary_title"),
                            icon: 'file-document-outline',
                            checkedColor: "#ffffff"
                        },
                        {
                            value: 'players',
                            label: i18n.t("lineup_title"),
                            icon: 'account-group-outline',
                            checkedColor: "#ffffff"
                        },
                        {
                            value: 'statistics',
                            label: i18n.t("statistics_title"),
                            icon: 'chart-bar',
                            checkedColor: "#ffffff"
                        },
                    ]}
                    theme={{
                        colors: {
                            primary: colors.primary,
                            secondaryContainer: colors.primary,
                            surfaceVariant: '#ffffff'
                        },
                    }}
                />
                {
                    segmentedButton === "summary" &&
                    <View style={{ flex: 1, marginVertical: spacing.h106, backgroundColor: colors.background }}>
                        {matchknockout.match?.summary.length! > 0 ?
                            <View style={{ backgroundColor: colors.background }}>
                                <Button
                                    mode="contained"
                                    onPress={() => hideAndShowSummary(true)}
                                    style={[{ backgroundColor: colors.primary, marginBottom: spacing.h74 }]}
                                    labelStyle={{ color: "#ffffff" }}
                                >
                                    {i18n.t("summary_add")}
                                </Button>
                                <FlatList
                                    style={{ width: '100%', marginBottom: insets.bottom }}
                                    data={sortedSummary}
                                    keyExtractor={(item) => item.id!}
                                    renderItem={({ item }) => <Summary summary={item} match={matchknockout.match!} colors={colors}
                                        handleUpdateSummary={handleUpdateSummary} />}
                                />
                            </View>
                            : <View style={[matchStyles.containAdd, { backgroundColor: colors.background }]}>
                                <Text variant="bodyMedium">{i18n.t("summary_empty")}</Text>
                                <AddAction openForm={hideAndShowSummary} colors={colors} text={i18n.t("summary_add")} />
                            </View>
                        }
                    </View>
                }
                {
                    segmentedButton === "players" &&
                    <View style={{ flex: 1, marginVertical: spacing.h106, backgroundColor: colors.background }}>
                        {
                            matchknockout.match?.players.length! > 0 ?
                                <FlatList
                                    style={{ width: '100%', marginBottom: insets.bottom }}
                                    data={showLineUp}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => <PlayersMatch player={item} colors={colors} hideAndShowPlayers={hideAndShowPlayers} />}
                                /> : <View style={[matchStyles.containAdd, { backgroundColor: colors.background }]}>
                                    <Text variant="bodyMedium">{i18n.t("lineup_empty")}</Text>
                                    <AddAction openForm={hideAndShowPlayers} colors={colors} text={i18n.t("lineup_add")} />
                                </View>
                        }
                    </View>
                }
                {
                    segmentedButton === "statistics" &&
                    <View style={{ flex: 1, marginVertical: spacing.h106, backgroundColor: colors.background }}>
                        {
                            matchknockout.match?.statistics.length! > 0 ? <FlatList
                                style={{ width: '100%', marginBottom: insets.bottom }}
                                data={matchknockout.match?.statistics}
                                keyExtractor={(item) => item.id!}
                                renderItem={({ item }) => <StatisticMatch statistic={item} colors={colors} handleUpdateStatistic={handleUpdateStatistic} />}
                            /> : <View style={[matchStyles.containAdd, { backgroundColor: colors.background }]}>
                                <Text variant="bodyMedium">{i18n.t("statistics_empty")}</Text>
                                <AddAction openForm={hideAndShowStatistics} colors={colors} text={i18n.t("statistics_add")} />
                            </View>
                        }
                    </View>
                }
            </View>
        </MainScreen>
    )
}

export default Matchknockout