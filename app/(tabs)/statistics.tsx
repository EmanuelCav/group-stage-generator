import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"
import FormCreateStatistic from "@/components/statistics/FormCreateStatistic"
import SureGeneral from "@/components/general/SureGeneral"

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
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Statistics' goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                showFormStatistic && <FormCreateStatistic group={group} colors={colors} statistic={statistic}
                    hideAndShowAddStatistic={hideAndShowAddStatistic} createStatistic={createStatistic}
                    handleUpdateTitleStatistic={handleUpdateTitleStatistic} handleUpdateValueStatistic={handleUpdateValueStatistic} openSure={openSureStatistic} />
            }
            {
                group.players?.length! > 0 ? <ShowStatistics colors={colors} group={group}
                    hideAndShowAddStatistic={hideAndShowAddStatistic} />
                    : <AddPlayers colors={colors} router={router} />
            }
        </View>
    )
}

export default Statistics