import { useRouter } from "expo-router"
import { Dimensions, FlatList } from "react-native"
import { SegmentedButtons, useTheme } from "react-native-paper"

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

import { matchStyles } from "@/styles/match.styles"

import { matchStore } from "@/store/match.store"
import { groupStore } from "@/store/group.store"
import { useEffect } from "react"

const Match = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { sureRemoveGroup, sureRestartGroup } = groupStore()
    const { match, segmentedButton, handleSegmented, showForm, hideAndShowUpdateMatch, getMatch } = matchStore()

    const goBack = () => {
        router.replace("/(tabs)/matchdays")
    }

    useEffect(() => {
        hideAndShowUpdateMatch(false)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} goBack={goBack} router={router} title="Match"
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup}
            />
            <SureGeneral />

            {
                showForm && <FormUpdateMatch colors={colors} hideAndShowUpdateMatch={hideAndShowUpdateMatch} />
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
                            label: 'Players',
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
            </View>
            {
                segmentedButton === "summary" && <FlatList
                    style={{ width: '100%' }}
                    data={match.match?.summary}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => <Summary />}
                />
            }
            {
                segmentedButton === "players" && <FlatList
                    style={{ width: '100%' }}
                    data={match.match?.summary}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => <PlayersMatch />}
                />
            }
            {
                segmentedButton === "statistics" && <FlatList
                    style={{ width: '100%' }}
                    data={match.match?.summary}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => <StatisticMatch />}
                />
            }
        </View>
    )
}

export default Match