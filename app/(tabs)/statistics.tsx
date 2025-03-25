import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"

import { groupStore } from "@/store/group.store"

const Statistics = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { getGroup, group } = groupStore()

    const goBack = () => {
        getGroup({
            teams: []
        })

        router.replace("/")
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Statistics' goBack={goBack} />
            {
                group.players?.length! > 0 ? <ShowStatistics />
                    : <AddPlayers colors={colors} router={router} />
            }
        </View>
    )
}

export default Statistics