import { useEffect } from "react"
import { useRouter } from "expo-router"
import { Dimensions, FlatList } from "react-native"
import { SegmentedButtons, Text, useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
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

import { matchStyles } from "@/styles/match.styles"

import { matchStore } from "@/store/match.store"
import { groupStore } from "@/store/group.store"

import { lineupPlayers } from "@/utils/matchday"

const Match = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { sureRemoveGroup, sureRestartGroup, group, updateMatchGroup } = groupStore()
    const { match, segmentedButton, handleSegmented, showForm, hideAndShowUpdateMatch, updateMatch, statistic,
        hideAndShowPlayers, hideAndShowStatistics, hideAndShowSummary, showFormPlayers, showFormStatistics, showFormSummary,
        summary
    } = matchStore()

    const goBack = () => {
        router.replace("/(tabs)/matchdays")
    }

    useEffect(() => {
        hideAndShowUpdateMatch(false)
        hideAndShowPlayers(false)
        hideAndShowStatistics(false)
        hideAndShowSummary(false)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} goBack={goBack} router={router} title="Match"
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup}
            />
            <SureGeneral />

            {
                showFormPlayers && <FormLineUp colors={colors} hideAndShowPlayers={hideAndShowPlayers}
                    match={match.match!} group={group} matchday={match.matchday!} updateMatch={updateMatch} updateMatchGroup={updateMatchGroup} />
            }

            {
                showFormStatistics && <FormStatisticsMatch colors={colors} hideAndShowStatistics={hideAndShowStatistics} updateMatchGroup={updateMatchGroup}
                    match={match.match!} group={group} statistic={statistic} updateMatch={updateMatch} matchday={match.matchday!} />
            }

            {
                showFormSummary && <FormSummary colors={colors} hideAndShowSummary={hideAndShowSummary} updateMatchGroup={updateMatchGroup}
                    summary={summary} match={match.match!} group={group} updateMatch={updateMatch} matchday={match.matchday!} />
            }

            {
                showForm && <FormUpdateMatch colors={colors} hideAndShowUpdateMatch={hideAndShowUpdateMatch}
                    match={match.match!} group={group} updateMatch={updateMatch} matchday={match.matchday!} updateMatchGroup={updateMatchGroup} />
            }

            <View style={matchStyles.containerMatch}>
                <TitleMatch match={match} colors={colors} hideAndShowUpdateMatch={hideAndShowUpdateMatch} />
                <ScoreTeams match={match.match!} />
                <Information match={match.match!} colors={colors} />
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
                            match.match?.summary.length! > 0 ?
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={match.match?.summary}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => <Summary summary={item} match={match.match!} colors={colors} />}
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
                            match.match?.players.length! > 0 ?
                                <FlatList
                                    style={{ width: '100%' }}
                                    data={lineupPlayers(match.match?.players.filter(p => p.team?.id === match.match?.local.team.id)!,
                                        match.match?.players.filter(p => p.team?.id === match.match?.visitant.team.id)!)}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => <PlayersMatch player={item} colors={colors} />}
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
                            match.match?.statistics.length! > 0 ? <FlatList
                                style={{ width: '100%' }}
                                data={match.match?.statistics}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => <StatisticMatch statistic={item} colors={colors} />}
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

export default Match