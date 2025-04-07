import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import EliminationStage from "@/components/elimination/EliminationStage"
import ShuffleAgain from "@/components/elimination/ShuffleAgain"

import { IGetMatchKnockout } from "@/interface/Match"

import { groupStore } from "@/store/group.store"
import { responseStore } from "@/store/response.store"
import { matchStore } from "@/store/match.store"

import { getElimationTeams } from "@/utils/elimination"

const Elimination = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { sureRemoveGroup, sureRestartGroup, generateElimination, updateShuffledKnockout, group } = groupStore()
    const { handleLoading } = responseStore()
    const { getMatchKnockout } = matchStore()

    const handleGetMatch = (data: IGetMatchKnockout) => {
        getMatchKnockout(data)
        router.push("/matchknockout")
    }

    const goBack = () => {
        router.replace("/")
    }

    useEffect(() => {
        if (group.eliminationMatches?.length! === 0) {
            generateElimination(getElimationTeams(group, false))
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Knockout' goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            <ShuffleAgain colors={colors} handleLoading={handleLoading} updateShuffledKnockout={updateShuffledKnockout}
                group={group} generateElimination={generateElimination} />
            <EliminationStage group={group} colors={colors} handleGetMatch={handleGetMatch} />
        </View>
    )
}

export default Elimination