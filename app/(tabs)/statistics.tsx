import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import i18n from '@/i18n'

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"
import SureGeneral from "@/components/general/SureGeneral"

import { groupStore } from "@/store/group.store"

const Statistics = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { group, sureRemoveGroup, sureRestartGroup } = groupStore()

    const goBack = () => {
        router.replace("/")
    }

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("statistics")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                group.players?.length! > 0 ?
                    <ShowStatistics colors={colors} group={group} />
                    : <AddPlayers colors={colors} router={router} />
            }
        </MainScreen>
    )
}

export default Statistics