import { useCallback, useState } from "react"
import { View } from "react-native"
import { Redirect, useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import i18n from '@/i18n'

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"
import SureGeneral from "@/components/general/SureGeneral"
import StatisticsLabel from "@/components/statistics/StatisticsLabel"

import { generalStyles } from "@/styles/general.styles"

import { useGroupStore } from "@/store/group.store"

import { useSpacing } from "@/hooks/useSpacing"

const StatisticsScreen = () => {

    const { group } = useGroupStore()

    const spacing = useSpacing()
    const router = useRouter()
    const { colors } = useTheme()

    const [statisticView, setStatisticView] = useState<string>("all")

    const goBack = useCallback(() => {
        router.replace("/home")
    }, [router])

    if (!group.isGenerated) return <Redirect href="/home" />

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} title={i18n.t("statistics")} goBack={goBack} isMatchdaysScreen={false} />
            <SureGeneral />
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
                {
                    group.players?.length! > 0 && <StatisticsLabel colors={colors} statisticView={statisticView} spacing={spacing} setStatisticView={setStatisticView} />
                }
                {
                    group.players?.length! > 0 ?
                        <ShowStatistics colors={colors} group={group} statisticView={statisticView} />
                        : <AddPlayers colors={colors} router={router} />
                }
            </View>
        </MainScreen>
    )
}

export default StatisticsScreen