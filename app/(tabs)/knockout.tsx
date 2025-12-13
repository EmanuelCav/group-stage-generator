import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"
import i18n from '@/i18n'
import Toast from 'react-native-toast-message';

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import EliminationStage from "@/components/elimination/EliminationStage"
import ShuffleAgain from "@/components/elimination/ShuffleAgain"
import CreateElimination from "@/components/elimination/CreateElimination"

import { IGetMatchKnockout } from "@/interface/Match"

import { groupStore } from "@/store/group.store"
import { matchStore } from "@/store/match.store"
import { userStore } from "@/store/user.store";

import { columnTitle, detectChangesElimination, getElimationTeams } from "@/utils/elimination"

const Elimination = () => {

    const { sureRemoveGroup, sureRestartGroup, generateElimination, updateShuffledKnockout, updateCreateElimination, group, drawedElimination, groups, createGroup } = groupStore()
    const { premium } = userStore()
    const { getMatchKnockout } = matchStore()

    const router = useRouter()
    const { colors } = useTheme()

    const handleGetMatch = (data: IGetMatchKnockout) => {
        if (group.eliminationMatches![Number(data.round) - 1]?.find(match => (match.local.score === null || match.visitant.score === null))) {
            Toast.show({
                type: 'error',
                text1: `${i18n.t("updateknockout")} ${columnTitle(Number(data.round), group.eliminationMatches?.length!)}`,
                text2: i18n.t("updateknockoutMessage")
            })
            return
        }

        getMatchKnockout(data)
        router.replace("/matchknockout")
    }

    const goBack = () => {
        router.replace("/home")
    }

    useEffect(() => {
        if (group.isKnockoutGenerated) {
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
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("groups")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup}
                createGroup={createGroup} group={group} groups={groups} premium={premium} />
            <SureGeneral />
            <Toast />
            {
                (group.eliminationMatches?.length! > 0 && group.isKnockoutGenerated) ? (
                    <>
                        {
                            !group.isDrawed &&
                            <ShuffleAgain colors={colors} updateShuffledKnockout={updateShuffledKnockout}
                                group={group} generateElimination={generateElimination} drawedElimination={drawedElimination} />
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