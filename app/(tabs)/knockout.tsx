import { useCallback, useEffect } from "react"
import { useRouter } from "expo-router"
import { IconButton, useTheme } from "react-native-paper"
import i18n from '@/i18n'
import Toast from 'react-native-toast-message';

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import EliminationStage from "@/components/elimination/EliminationStage"
import ShuffleAgain from "@/components/elimination/ShuffleAgain"
import CreateElimination from "@/components/elimination/CreateElimination"
import Sure from "@/components/general/Sure";

import { IGetMatchKnockout } from "@/interface/Match"

import { groupStore } from "@/store/group.store"
import { matchStore } from "@/store/match.store"
import { userStore } from "@/store/user.store";

import { columnTitle, detectChangesElimination, getElimationTeams } from "@/utils/elimination"

import { useSpacing } from "@/hooks/useSpacing";
import { useIsFullName } from "@/hooks/useIsFullName";

const Elimination = () => {

    const { sureRemoveGroup, sureRestartGroup, generateElimination, updateShuffledKnockout, updateCreateElimination, group, drawedElimination, groups, createGroup, sureRestartElimination, isSureRestartElimination, restartElimination } = groupStore()
    const { premium } = userStore()
    const { getMatchKnockout } = matchStore()

    const router = useRouter()
    const { colors } = useTheme()
    const spacing = useSpacing()
    const { isFullName } = useIsFullName()

    const handleGetMatch = useCallback((data: IGetMatchKnockout) => {

        const roundIndex = Number(data.round) - 1

        const hasPendingMatch = group.eliminationMatches?.[roundIndex]?.some(
            match => match.local.score === null || match.visitant.score === null
        )

        if (hasPendingMatch) {
            Toast.show({
                type: 'error',
                text1: `${i18n.t("updateknockout")} ${columnTitle(
                    Number(data.round),
                    group.eliminationMatches?.length!
                )}`,
                text2: i18n.t("updateknockoutMessage")
            })
            return
        }

        getMatchKnockout(data)

        router.navigate("/matchknockout")

    }, [group.eliminationMatches, getMatchKnockout, router])

    const goBack = useCallback(() => {
        router.replace("/home")
    }, [router])

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

    useEffect(() => {
        sureRestartElimination(false)
    }, [])

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("knockout")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup}
                createGroup={createGroup} group={group} groups={groups} premium={premium} />
            <SureGeneral />
            {
                isSureRestartElimination && <Sure
                    close={() => sureRestartElimination(false)}
                    func={() => {
                        restartElimination()
                        sureRestartElimination(false)
                    }}
                    text={i18n.t("sure.restartKnockout")}
                    labelButton={i18n.t("sure.restart")}
                />
            }
            <Toast />
            {
                (group.eliminationMatches?.length! > 0 && group.isKnockoutGenerated) ? (
                    <>
                        {
                            !group.isDrawed ?
                                <ShuffleAgain colors={colors} updateShuffledKnockout={updateShuffledKnockout}
                                    group={group} generateElimination={generateElimination} drawedElimination={drawedElimination} />
                                : <IconButton
                                    icon="restore"
                                    size={24}
                                    iconColor="#fff"
                                    containerColor={colors.primary}
                                    onPress={() => {
                                        sureRestartElimination(true)
                                    }}
                                />
                        }
                        <EliminationStage group={group} colors={colors} handleGetMatch={handleGetMatch} spacing={spacing} isFullName={isFullName} />
                    </>
                ) : (
                    <CreateElimination colors={colors} updateCreateElimination={updateCreateElimination} spacing={spacing} />
                )
            }
        </MainScreen>
    )
}

export default Elimination