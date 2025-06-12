import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import i18n from '@/i18n'

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import EliminationStage from "@/components/elimination/EliminationStage"
import ShuffleAgain from "@/components/elimination/ShuffleAgain"
import CreateElimination from "@/components/elimination/CreateElimination"

import { IGetMatchKnockout } from "@/interface/Match"

import { groupStore } from "@/store/group.store"
import { responseStore } from "@/store/response.store"
import { matchStore } from "@/store/match.store"

import { detectChangesElimination, getElimationTeams } from "@/utils/elimination"

const Elimination = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { sureRemoveGroup, sureRestartGroup, generateElimination, updateShuffledKnockout, updateCreateElimination, group } = groupStore()
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
        if(group.isKnockoutGenerated) {
            if (group.eliminationMatches?.length! === 0) {
                generateElimination(getElimationTeams(group, false))
            } else {
                const eliminationMatches = detectChangesElimination(group)
                updateShuffledKnockout(!eliminationMatches.areChanges)
                generateElimination(eliminationMatches.eliminationMatches)
            }
        }
    }, [group.isKnockoutGenerated])

    return (
        <MainScreen>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("knockout")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                (group.eliminationMatches?.length! > 0 && group.isKnockoutGenerated) ? (
                    <>
                        {
                            !group.isDrawed &&
                            <ShuffleAgain colors={colors} handleLoading={handleLoading} updateShuffledKnockout={updateShuffledKnockout}
                                group={group} generateElimination={generateElimination} />
                        }
                        <EliminationStage group={group} colors={colors} handleGetMatch={handleGetMatch} />
                    </>
                ) : (
                    <CreateElimination colors={colors} updateCreateElimination={updateCreateElimination} />
                )
            }
        </MainScreen>
    )
}

export default Elimination