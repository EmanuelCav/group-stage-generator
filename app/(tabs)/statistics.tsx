import { useCallback, useState } from "react"
import { Redirect, useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import i18n from '@/i18n'

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"
import SureGeneral from "@/components/general/SureGeneral"
import StatisticsLabel from "@/components/statistics/StatisticsLabel"
import { View } from "@/components/Themed"

import { generalStyles } from "@/styles/general.styles"

import { groupStore } from "@/store/group.store"
import { userStore } from "@/store/user.store"

import { useSpacing } from "@/hooks/useSpacing"

const Statistics = () => {

    const { group, sureRemoveGroup, sureRestartGroup, createGroup, groups } = groupStore()
    const { premium } = userStore()

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
            <HeaderGeneral colors={colors} router={router} title={i18n.t("statistics")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} createGroup={createGroup}
                group={group} premium={premium} groups={groups} isMatchdaysScreen={false} />
            <SureGeneral />
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
                <StatisticsLabel colors={colors} statisticView={statisticView} spacing={spacing} setStatisticView={setStatisticView} />
                {
                    group.players?.length! > 0 ?
                        <ShowStatistics colors={colors} group={group} statisticView={statisticView} />
                        : <AddPlayers colors={colors} router={router} />
                }
            </View>
        </MainScreen>
    )
}

export default Statistics