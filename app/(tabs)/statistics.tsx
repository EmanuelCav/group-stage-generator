import { useCallback } from "react"
import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import i18n from '@/i18n'

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import ShowStatistics from "@/components/statistics/ShowStatistics"
import AddPlayers from "@/components/statistics/AddPlayers"
import SureGeneral from "@/components/general/SureGeneral"

import { groupStore } from "@/store/group.store"
import { userStore } from "@/store/user.store"

const Statistics = () => {

    const { group, sureRemoveGroup, sureRestartGroup, createGroup, groups } = groupStore()
    const { premium } = userStore()

    const router = useRouter()
    const { colors } = useTheme()

    const goBack = useCallback(() => {
        router.replace("/home")
    }, [router])

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("statistics")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} createGroup={createGroup}
                group={group} groups={groups} premium={premium} />
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