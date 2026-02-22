import { useCallback, useEffect, useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router"
import { FlatList } from "react-native"
import { Button, SegmentedButtons, Text, useTheme } from "react-native-paper"
import { TestIds } from 'react-native-google-mobile-ads';
import i18n from '@/i18n'

import { View } from "@/components/Themed"
import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import TitleMatch from "@/components/match/TitleMatch"
import ScoreTeams from "@/components/match/ScoreTeams"
import Information from "@/components/match/Information"
import Summary from "@/components/match/Summary"
import StatisticMatch from "@/components/match/StatisticMatch"
import FormUpdateMatch from "@/components/match/FormUpdateMatch"
import PlayersMatch from "@/components/match/PlayersMatch"
import AddAction from "@/components/general/AddAction"
import FormLineUp from "@/components/match/FormLineUp"
import FormStatisticsMatch from "@/components/match/FormStatisticsMatch"
import FormSummary from "@/components/match/FormSummary"
import Sure from "@/components/general/Sure"

import { IMatch, IMatchStatistic, ISummary } from "@/interface/Match"

import { matchStyles } from "@/styles/match.styles"

import { matchStore } from "@/store/match.store"
import { groupStore } from "@/store/group.store"
import { userStore } from "@/store/user.store"

import { lineupPlayers } from "@/utils/matchday"

import { useInterstitialAd } from "@/hooks/useInterstitialAd";
import { useSpacing } from "@/hooks/useSpacing";
import { useIsFullName } from "@/hooks/useIsFullName";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_MATCH}`;

const Match = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { sureRemoveGroup, sureRestartGroup, group, updateMatchGroup, updateMatchKnockGroup, createGroup, groups } = groupStore()
    const { match, segmentedButton, handleSegmented, showForm, hideAndShowUpdateMatch, updateMatch, statistic, getSummary, matchknockout,
        hideAndShowPlayers, hideAndShowStatistics, hideAndShowSummary, showFormPlayers, showFormStatistics, showFormSummary,
        summary, isSureSummary, sureRemoveSummary, getStatistic, isSureStatistic, sureRemoveStatistic, updateEliminationMatch,
        handleGetMatch
    } = matchStore()
    const { premium } = userStore()
    const insets = useSafeAreaInsets()
    const spacing = useSpacing()

    const { interstitial, isLoaded: isInterstitialLoaded } = useInterstitialAd(premium ? null : adUnitId)

    const { isFullName } = useIsFullName()

    const sortedSummary = useMemo(() => {
        return [...(match.match?.summary ?? [])].sort((a, b) => Number(b.time) - Number(a.time))
    }, [match.match?.summary])

    const showLineUp = useMemo(() => {
        return lineupPlayers(
            match.match?.players.filter(p => p.team?.id === match.match?.local.team.id)!,
            match.match?.players.filter(p => p.team?.id === match.match?.visitant.team.id)!
        )
    }, [match.match])

    const handleUpdateSummary = useCallback((data: ISummary) => {
        getSummary(data)
        hideAndShowSummary(true)
    }, [])

    const handleUpdateStatistic = useCallback((data: IMatchStatistic) => {
        getStatistic(data)
        hideAndShowStatistics(true)
    }, [])

    const handleRemoveSummary = () => {
        const groupIndex = match.match?.local.team.group === undefined ? 0 : match.match.local.team.group - 1;
        const matchdayIndex = match.matchday! - 1;

        const editMatch: IMatch = {
            isEdit: match.match!.isEdit,
            local: match.match!.local,
            time: match.match?.time,
            referee: match.match!.referee!,
            stadium: match.match!.stadium!,
            statistics: match.match!.statistics,
            players: match.match!.players,
            summary: match.match!.summary.filter((s) => s.id !== summary.id),
            visitant: match.match!.visitant,
            date: match.match!.date
        }

        const updatedMatches = group.matches!.map((g, gi) =>
            gi === groupIndex
                ? g.map((m, mi) =>
                    mi === matchdayIndex
                        ? m.map((matchItem) =>
                            matchItem.local.team.name === match.match?.local.team.name
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
            matchday: match.matchday
        })

        sureRemoveSummary(false)
        hideAndShowSummary(false)
        getSummary({})
    }

    const handleRemoveStatistic = () => {

        const groupIndex = match.match?.local.team.group === undefined ? 0 : match.match.local.team.group - 1;
        const matchdayIndex = match.matchday! - 1;

        const editMatch: IMatch = {
            isEdit: match.match!.isEdit,
            local: match.match!.local,
            time: match.match?.time,
            referee: match.match!.referee,
            stadium: match.match!.stadium,
            statistics: match.match!.statistics.filter((s) => s.id !== statistic.id),
            players: match.match!.players,
            summary: match.match!.summary,
            visitant: match.match!.visitant,
            date: match.match!.date
        }

        const updatedMatches = group.matches!.map((g, gi) =>
            gi === groupIndex
                ? g.map((m, mi) =>
                    mi === matchdayIndex
                        ? m.map((matchItem) =>
                            matchItem.local.team.name === match.match?.local.team.name
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
            matchday: match.matchday
        })

        sureRemoveStatistic(false)
        hideAndShowStatistics(false)
        getStatistic({})
    }

    const goBack = useCallback(() => {
        router.back()
    }, [router])

    useEffect(() => {
        handleGetMatch()
    }, [])

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral
                colors={colors}
                goBack={goBack}
                router={router}
                title={i18n.t("match_title")}
                sureRemoveGroup={sureRemoveGroup}
                sureRestartGroup={sureRestartGroup}
                group={group}
                createGroup={createGroup}
                groups={groups}
                premium={premium}
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

            {showFormPlayers && (
                <FormLineUp
                    isFullName={isFullName}
                    colors={colors}
                    hideAndShowPlayers={hideAndShowPlayers}
                    round={matchknockout.round!}
                    match={match.match!}
                    group={group}
                    matchday={match.matchday!}
                    updateMatch={updateMatch}
                    updateMatchGroup={updateMatchGroup}
                    isKnockout={false}
                    updateEliminationMatch={updateEliminationMatch}
                    updateMatchKnockGroup={updateMatchKnockGroup}
                    spacing={spacing}
                />
            )}

            {showFormStatistics && (
                <FormStatisticsMatch
                    colors={colors}
                    isFullName={isFullName}
                    hideAndShowStatistics={hideAndShowStatistics}
                    updateMatchGroup={updateMatchGroup}
                    round={matchknockout.round!}
                    match={match.match!}
                    group={group}
                    statistic={statistic}
                    updateMatch={updateMatch}
                    matchday={match.matchday!}
                    sureRemoveStatistic={sureRemoveStatistic}
                    isKnockout={false}
                    getStatistic={getStatistic}
                    updateEliminationMatch={updateEliminationMatch}
                    updateMatchKnockGroup={updateMatchKnockGroup}
                    spacing={spacing}
                    premium={premium}
                />
            )}

            {showFormSummary && (
                <FormSummary
                    router={router}
                    colors={colors}
                    hideAndShowSummary={hideAndShowSummary}
                    updateMatchGroup={updateMatchGroup}
                    round={matchknockout.round!}
                    summary={summary}
                    match={match.match!}
                    group={group}
                    updateMatch={updateMatch}
                    matchday={match.matchday!}
                    sureRemoveSummary={sureRemoveSummary}
                    isKnockout={false}
                    getSummary={getSummary}
                    updateEliminationMatch={updateEliminationMatch}
                    updateMatchKnockGroup={updateMatchKnockGroup}
                    spacing={spacing}
                    premium={premium}
                />
            )}

            {showForm && (
                <FormUpdateMatch
                    colors={colors}
                    hideAndShowUpdateMatch={hideAndShowUpdateMatch}
                    match={match.match!}
                    group={group}
                    updateMatch={updateMatch}
                    matchday={match.matchday!}
                    updateMatchGroup={updateMatchGroup}
                    premium={premium}
                    interstitial={interstitial!}
                    isIntersitialLoaded={isInterstitialLoaded}
                    spacing={spacing}
                    isFullName={isFullName}
                />
            )}

            <View style={[matchStyles.containerMatch, { backgroundColor: "transparent" }]}>
                <TitleMatch match={match} colors={colors} hideAndShowUpdateMatch={hideAndShowUpdateMatch} />
                <ScoreTeams match={match.match!} colors={colors} spacing={spacing} isFullName={isFullName} />
                <Information match={match.match!} colors={colors} />
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
                        {match.match?.summary.length! > 0 ? (
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
                                    renderItem={({ item }) => (
                                        <Summary summary={item} match={match.match!} colors={colors} handleUpdateSummary={handleUpdateSummary} />
                                    )}
                                />
                            </View>
                        ) : (
                            <View style={[matchStyles.containAdd, { backgroundColor: colors.background }]}>
                                <Text variant="bodyMedium">{i18n.t("summary_empty")}</Text>
                                <AddAction openForm={hideAndShowSummary} colors={colors} text={i18n.t("summary_add")} />
                            </View>
                        )}
                    </View>
                }

                {
                    segmentedButton === "players" &&
                    <View style={{ flex: 1, marginVertical: spacing.h106, backgroundColor: colors.background }}>
                        {match.match?.players.length! > 0 ? (
                            <FlatList
                                style={{ width: '100%', marginBottom: insets.bottom }}
                                data={showLineUp}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <PlayersMatch player={item} colors={colors} hideAndShowPlayers={hideAndShowPlayers} />
                                )}
                            />
                        ) : (
                            <View style={[matchStyles.containAdd, { backgroundColor: colors.background }]}>
                                <Text variant="bodyMedium">{i18n.t("lineup_empty")}</Text>
                                <AddAction openForm={hideAndShowPlayers} colors={colors} text={i18n.t("lineup_add")} />
                            </View>
                        )}
                    </View>
                }

                {
                    segmentedButton === "statistics" &&
                    <View style={{ flex: 1, marginVertical: spacing.h106, backgroundColor: colors.background }}>
                        {match.match?.statistics.length! > 0 ? (
                            <FlatList
                                style={{ width: '100%', marginBottom: insets.bottom }}
                                data={match.match?.statistics}
                                keyExtractor={(item) => item.id!}
                                renderItem={({ item }) => (
                                    <StatisticMatch statistic={item} colors={colors} handleUpdateStatistic={handleUpdateStatistic} />
                                )}
                            />
                        ) : (
                            <View style={[matchStyles.containAdd, { backgroundColor: colors.background }]}>
                                <Text variant="bodyMedium">{i18n.t("statistics_empty")}</Text>
                                <AddAction openForm={hideAndShowStatistics} colors={colors} text={i18n.t("statistics_add")} />
                            </View>
                        )}
                    </View>
                }
            </View>
        </MainScreen>
    )
}

export default Match