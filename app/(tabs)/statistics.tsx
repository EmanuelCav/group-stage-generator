import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"
import FormCreateStatistic from "@/components/statistics/FormCreateStatistic"

import { groupStore } from "@/store/group.store"
import { playerStore } from "@/store/player.store"

const Statistics = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { getGroup, group, createStatistic } = groupStore()
    const { hideAndShowAddStatistic, showFormStatistic, statistic } = playerStore()

    const goBack = () => {
        getGroup({
            teams: []
        })

        router.replace("/")
    }

    useEffect(() => {
        hideAndShowAddStatistic(false)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Statistics' goBack={goBack} />
            {
                showFormStatistic && <FormCreateStatistic group={group} colors={colors} statistic={statistic}
                    hideAndShowAddStatistic={hideAndShowAddStatistic} createStatistic={createStatistic} />
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