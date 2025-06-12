import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import i18n from '@/i18n'

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"
import FormCreateStatistic from "@/components/statistics/FormCreateStatistic"
import SureGeneral from "@/components/general/SureGeneral"
import AddStatistics from "@/components/statistics/AddStatistics"

import { IStatistic } from "@/interface/Player"

import { groupStore } from "@/store/group.store"
import { playerStore } from "@/store/player.store"

const Statistics = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { hideAndShowAddStatistic, showFormStatistic, statistic, getStatistic, updatePlayerStatisticTitle, updatePlayerStatisticValue, player, sureRemoveStatistic } = playerStore()
    const { group, createStatistic, sureRemoveGroup, sureRestartGroup, updateStatisticTitle, updateStatisticValue } = groupStore()

    const handleUpdateTitleStatistic = (data: IStatistic) => {
        updateStatisticTitle(data)
        updatePlayerStatisticTitle(data)
        getStatistic({})
    }

    const handleUpdateValueStatistic = (data: IStatistic) => {
        updateStatisticValue(data, player)
        updatePlayerStatisticValue(data)
        getStatistic({})
    }

    const openSureStatistic = (data: IStatistic) => {
        getStatistic(data)
        sureRemoveStatistic(true)
    }

    const goBack = () => {
        router.replace("/")
    }

    useEffect(() => {
        hideAndShowAddStatistic(false)
    }, [])

    return (
        <MainScreen>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("statistics")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                showFormStatistic && <FormCreateStatistic group={group} colors={colors} statistic={statistic}
                    hideAndShowAddStatistic={hideAndShowAddStatistic} createStatistic={createStatistic}
                    handleUpdateTitleStatistic={handleUpdateTitleStatistic} handleUpdateValueStatistic={handleUpdateValueStatistic} openSure={openSureStatistic} />
            }
            {
                group.players?.length! > 0 ? group.players![0].statistics?.length! > 0 ?
                    <ShowStatistics colors={colors} group={group} hideAndShowAddStatistic={hideAndShowAddStatistic} />
                    : <AddStatistics colors={colors} hideAndShowAddStatistic={hideAndShowAddStatistic} />
                    : <AddPlayers colors={colors} router={router} />
            }
        </MainScreen>
    )
}

export default Statistics