import { useMemo } from "react"
import { Dimensions, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"

import MainScreen from "@/components/general/MainScreen"
import TeamMatchesInformation from "@/components/teams/TeamMatchesInformation"
import FormCreateTeam from "@/components/create/FormCreateTeam"

import { ITeam } from "@/interface/Team"

import { useTeamStore } from "@/store/team.store"
import { useGroupStore } from "@/store/group.store"
import { useUserStore } from "@/store/user.store"

import { nextMatches, previousMatches } from "@/utils/matchday"

import { useLanguage } from "@/hooks/useLanguageContext"

const HomeTeamScreen = () => {

    const { group, updateTeam, createTeam } = useGroupStore()
    const { team, showForm, hideAndShowAddTeam, getTeam, sureRemoveTeam } = useTeamStore()
    const { premium } = useUserStore()

    const { t } = useLanguage()
    const { colors } = useTheme()

    const openSure = (data: ITeam) => {
        getTeam(data)
        sureRemoveTeam(true)
    }

    const handleUpdate = (data: ITeam) => {
        updateTeam(data)
        getTeam(data)
    }

    const listNextMatches = useMemo(() => {
        return nextMatches(group.matches!, group.eliminationMatches!, team)
    }, [group.matches, group.eliminationMatches])

    const listPreviousMatches = useMemo(() => {
        return previousMatches(group.matches!, group.eliminationMatches!, team)
    }, [group.matches, group.eliminationMatches])

    return (
        <MainScreen colors={colors}>
            {showForm && (
                <FormCreateTeam
                    colors={colors}
                    premium={premium}
                    group={group}
                    team={team}
                    openSure={openSure}
                    hideAndShowAddTeam={hideAndShowAddTeam}
                    createTeam={createTeam}
                    updateTeam={handleUpdate}
                    t={t}
                />
            )}
            <ScrollView style={{ flex: 1, width: '100%', backgroundColor: colors.background, paddingHorizontal: Dimensions.get("window").height / 106 }}
                showsVerticalScrollIndicator={false}
            >
                <TeamMatchesInformation colors={colors} matchesInformation={listNextMatches} title={t("nextMatches")} team={team} t={t} />
                <TeamMatchesInformation colors={colors} matchesInformation={listPreviousMatches} title={t("previousMatches")} team={team} t={t} />
            </ScrollView>

        </MainScreen>
    )
}

export default HomeTeamScreen