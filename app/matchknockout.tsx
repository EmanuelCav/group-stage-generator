import { useEffect } from "react"
import { useRouter } from "expo-router"
import { Dimensions, FlatList } from "react-native"
import { IconButton, SegmentedButtons, Text, useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
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

import { IMatchStatistic, ISummary } from "@/interface/Match"

import { matchStyles } from "@/styles/match.styles"

import { matchStore } from "@/store/match.store"
import { groupStore } from "@/store/group.store"

import { lineupPlayers } from "@/utils/matchday"
import { columnTitle } from "@/utils/elimination"

const Matchknockout = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { sureRemoveGroup, sureRestartGroup, group, updateMatchKnockGroup, updateMatchGroup } = groupStore()
    const { matchknockout, segmentedButton, handleSegmented, showForm, hideAndShowUpdateMatch, statistic, getSummary,
        hideAndShowPlayers, hideAndShowStatistics, hideAndShowSummary, showFormPlayers, showFormStatistics, showFormSummary,
        summary, sureRemoveSummary, getStatistic, sureRemoveStatistic, updateEliminationMatch, updateMatch
    } = matchStore()

    const handleUpdateSummary = (data: ISummary) => {
        getSummary(data)
        hideAndShowSummary(true)
    }

    const handleUpdateStatistic = (data: IMatchStatistic) => {
        getStatistic(data)
        hideAndShowStatistics(true)
    }

    const goBack = () => {
        router.replace("/(tabs)/knockout")
    }

    useEffect(() => {
        hideAndShowUpdateMatch(false)
        hideAndShowPlayers(false)
        hideAndShowStatistics(false)
        hideAndShowSummary(false)
        sureRemoveStatistic(false)
        sureRemoveSummary(false)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} goBack={goBack} router={router} title="Match"
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup}
            />
            <SureGeneral />

            {
                showFormPlayers && <FormLineUp colors={colors} hideAndShowPlayers={hideAndShowPlayers}
                    match={matchknockout.match!} group={group} matchday={matchknockout.round!} 
                    updateMatch={updateMatch} updateMatchGroup={updateMatchGroup} round={matchknockout.round!}
                    isKnockout={true} updateEliminationMatch={updateEliminationMatch} updateMatchKnockGroup={updateMatchKnockGroup} />
            }

            {
                showFormStatistics && <FormStatisticsMatch colors={colors} hideAndShowStatistics={hideAndShowStatistics} updateMatchGroup={updateMatchGroup}
                    match={matchknockout.match!} group={group} statistic={statistic} updateMatch={updateMatch} 
                    matchday={matchknockout.round!} sureRemoveStatistic={sureRemoveStatistic} round={matchknockout.round!}
                    isKnockout={true} updateEliminationMatch={updateEliminationMatch} updateMatchKnockGroup={updateMatchKnockGroup} />
            }

            {
                showFormSummary && <FormSummary colors={colors} hideAndShowSummary={hideAndShowSummary} updateMatchGroup={updateMatchGroup}
                    summary={summary} match={matchknockout.match!} group={group} updateMatch={updateMatch} 
                    matchday={matchknockout.round!} sureRemoveSummary={sureRemoveSummary} round={matchknockout.round!}
                    isKnockout={true} updateEliminationMatch={updateEliminationMatch} updateMatchKnockGroup={updateMatchKnockGroup} />
            }

            {
                showForm && <FormEliminationMatch match={matchknockout.match!}
                    colors={colors} group={group} round={matchknockout.round!}
                    hideAndShowUpdateMatch={hideAndShowUpdateMatch}
                    updateEliminationMatch={updateEliminationMatch}
                    updateMatchKnockGroup={updateMatchKnockGroup}
                />
            }

            <View style={matchStyles.containerMatch}>
                <View style={matchStyles.titleMatch}>
                    <Text variant='titleMedium' style={{ color: colors.primary }}>
                        {columnTitle(matchknockout.round!, group.eliminationMatches?.length!) }
                    </Text>
                    <IconButton
                        icon="pencil"
                        size={24}
                        onPress={() => hideAndShowUpdateMatch(true)}
                        iconColor={colors.primary}
                    />
                </View>
                <ScoreTeams match={matchknockout.match!} />
                <Information match={matchknockout.match!} colors={colors} />
                <SegmentedButtons
                    style={{ marginTop: Dimensions.get("window").height / 47 }}
                    value={segmentedButton}
                    onValueChange={handleSegmented}
                    buttons={[
                        {
                            value: 'summary',
                            label: 'Summary',
                            icon: 'file-document-outline',
                            checkedColor: "#ffffff"
                        },
                        {
                            value: 'players',
                            label: 'Lineup',
                            icon: 'account-group-outline',
                            checkedColor: "#ffffff"
                        },
                        {
                            value: 'statistics',
                            label: 'Statistics',
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
                    <View style={{ flex: 1, marginVertical: Dimensions.get("window").height / 106 }}>
                        {
                            matchknockout.match?.summary.length! > 0 ?
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={matchknockout.match?.summary}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => <Summary summary={item} match={matchknockout.match!} colors={colors}
                                        handleUpdateSummary={handleUpdateSummary} />}
                                /> : <View style={matchStyles.containAdd}>
                                    <Text variant="bodyMedium">Add a summary for the match</Text>
                                    <AddAction openForm={hideAndShowSummary} colors={colors} text="ADD SUMMARY" />
                                </View>
                        }
                    </View>
                }
                {
                    segmentedButton === "players" &&
                    <View style={{ flex: 1, marginVertical: Dimensions.get("window").height / 106 }}>
                        {
                            matchknockout.match?.players.length! > 0 ?
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={lineupPlayers(matchknockout.match?.players.filter(p => p.team?.id === matchknockout.match?.local.team.id)!,
                                        matchknockout.match?.players.filter(p => p.team?.id === matchknockout.match?.visitant.team.id)!)}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => <PlayersMatch player={item} colors={colors} hideAndShowPlayers={hideAndShowPlayers} />}
                                /> : <View style={matchStyles.containAdd}>
                                    <Text variant="bodyMedium">Add a lineup for the match</Text>
                                    <AddAction openForm={hideAndShowPlayers} colors={colors} text="ADD LINEUP" />
                                </View>
                        }
                    </View>
                }
                {
                    segmentedButton === "statistics" &&
                    <View style={{ flex: 1, marginVertical: Dimensions.get("window").height / 106 }}>
                        {
                            matchknockout.match?.statistics.length! > 0 ? <FlatList
                                style={{ width: '100%' }}
                                data={matchknockout.match?.statistics}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => <StatisticMatch statistic={item} colors={colors} handleUpdateStatistic={handleUpdateStatistic} />}
                            /> : <View style={matchStyles.containAdd}>
                                <Text variant="bodyMedium">Add statistics for the match</Text>
                                <AddAction openForm={hideAndShowStatistics} colors={colors} text="ADD STATISTIC" />
                            </View>
                        }
                    </View>
                }
            </View>
        </View>
    )
}

export default Matchknockout