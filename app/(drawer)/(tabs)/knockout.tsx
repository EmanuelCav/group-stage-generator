import { useCallback, useEffect, useState } from "react"
import { Redirect, useRouter } from "expo-router"
import { IconButton, Text, useTheme } from "react-native-paper"
import Toast from 'react-native-toast-message';

import MainScreen from "@/components/general/MainScreen"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import EliminationStage from "@/components/elimination/EliminationStage"
import ShuffleAgain from "@/components/elimination/ShuffleAgain"
import CreateElimination from "@/components/elimination/CreateElimination"
import Sure from "@/components/general/Sure";

import { IGetMatchKnockout } from "@/interface/Match"
import { ITeam } from "@/interface/Team";

import { useGroupStore } from "@/store/group.store"
import { useMatchStore } from "@/store/match.store"

import { columnTitle, detectChangesElimination, getElimationTeams } from "@/utils/elimination"

import { useSpacing } from "@/hooks/useSpacing";
import { useIsFullName } from "@/hooks/useIsFullName";
import { useLanguage } from "@/hooks/useLanguageContext";

import { idMatch } from "@/utils/matchday";

const KnockoutScreen = () => {

    const { generateElimination, updateShuffledKnockout, updateCreateElimination, group, drawedElimination, sureRestartElimination, isSureRestartElimination, restartElimination, updateTeamMatchElimination } = useGroupStore()
    const { getMatchKnockout } = useMatchStore()

    const { colors } = useTheme()
    const { t } = useLanguage()

    const router = useRouter()
    const spacing = useSpacing()
    const { isFullName } = useIsFullName()

    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const handleUpdateTeamMatch = (indexRound: number, indexMatch: number, isLocal: boolean, team: ITeam) => {
        updateTeamMatchElimination(indexRound, indexMatch, isLocal, team)
    }

    const handleGetMatch = useCallback((data: IGetMatchKnockout) => {

        const roundIndex = Number(data.round) - 1

        const hasPendingMatch = group.eliminationMatches?.[roundIndex]?.some(
            match => match.local.score === null || match.visitant.score === null
        )

        if (hasPendingMatch) {
            Toast.show({
                type: 'error',
                text1: `${t("updateknockout")} ${columnTitle(
                    Number(data.round),
                    group.eliminationMatches?.length!,
                    t
                )}`,
                text2: t("updateknockoutMessage")
            })
            return
        }

        getMatchKnockout(data)

        router.navigate(`/(match)/knockout/${idMatch(`${data.match?.visitant.team.name}-${data.match?.local.team.name}`)}`)

    }, [group.eliminationMatches, getMatchKnockout, router])

    const goBack = useCallback(() => {
        router.replace("/home")
    }, [router])

    useEffect(() => {
        if (group.isKnockoutGenerated) {
            if (group.eliminationMatches?.length! === 0) {
                generateElimination(getElimationTeams(group, false, t))
            } else {
                const eliminationMatches = detectChangesElimination(group, t)
                updateShuffledKnockout(!eliminationMatches.areChanges)
                generateElimination(eliminationMatches.eliminationMatches)
            }
        }
    }, [group.isKnockoutGenerated])

    useEffect(() => {
        sureRestartElimination(false)
    }, [])

    if (!group.isGenerated) return <Redirect href="/home" />

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} title={t("knockout")} goBack={goBack} isEditMode={isEditMode} setIsEditMode={setIsEditMode}
                isMatchdaysScreen={group.eliminationMatches?.length! > 0 && group.isKnockoutGenerated!} />
            <SureGeneral />
            {
                isSureRestartElimination && <Sure
                    close={() => sureRestartElimination(false)}
                    func={() => {
                        restartElimination()
                        sureRestartElimination(false)
                    }}
                    text={t("sure.restartKnockout")}
                    labelButton={t("sure.restart")}
                />
            }
            <Toast />
            {
                (group.eliminationMatches?.length! > 0 && group.isKnockoutGenerated) ? (
                    <>
                        {
                            !group.isDrawed ?
                                <ShuffleAgain colors={colors} updateShuffledKnockout={updateShuffledKnockout} t={t}
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
                        {
                            !group.isDrawed && <Text variant="bodySmall">{t("adviceUpdateMatch")}</Text>
                        }
                        <EliminationStage group={group} colors={colors} handleGetMatch={handleGetMatch} spacing={spacing} isFullName={isFullName}
                            handleUpdateTeamMatch={handleUpdateTeamMatch} isEditMode={isEditMode} t={t} />
                    </>
                ) : (
                    <CreateElimination colors={colors} updateCreateElimination={updateCreateElimination} spacing={spacing} t={t} />
                )
            }
        </MainScreen>
    )
}

export default KnockoutScreen