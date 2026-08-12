import { useMemo } from "react"
import { Dimensions, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import i18n from "@/i18n"

import MainScreen from "@/components/general/MainScreen"
import TeamMatchesInformation from "@/components/teams/TeamMatchesInformation"
import FormCreateTeam from "@/components/create/FormCreateTeam"

import { ITeam } from "@/interface/Team"

import { useTeamStore } from "@/store/team.store"
import { useGroupStore } from "@/store/group.store"
import { useUserStore } from "@/store/user.store"

import { nextMatches, previousMatches } from "@/utils/matchday"

import { useSpacing } from "@/hooks/useSpacing"

const HomeTeamScreen = () => {

    const { group, updateTeam, createTeam } = useGroupStore()
    const { team, showForm, hideAndShowAddTeam, getTeam, sureRemoveTeam } = useTeamStore()
    const { premium } = useUserStore()

    const { colors } = useTheme()
    const spacing = useSpacing()

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
                    spacing={spacing}
                />
            )}
            <ScrollView style={{ flex: 1, width: '100%', backgroundColor: colors.background, paddingHorizontal: Dimensions.get("window").height / 106 }}
                showsVerticalScrollIndicator={false}
            >
                <TeamMatchesInformation colors={colors} matchesInformation={listNextMatches} title={i18n.t("nextMatches")} team={team} />
                <TeamMatchesInformation colors={colors} matchesInformation={listPreviousMatches} title={i18n.t("previousMatches")} team={team} />
            </ScrollView>

        </MainScreen>
    )
}

export default HomeTeamScreen