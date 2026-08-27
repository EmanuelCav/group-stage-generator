import { useCallback, useEffect, useMemo } from "react"
import { SectionList, View } from "react-native"
import { Avatar, Divider, List, Text, useTheme } from "react-native-paper"

import AddAction from "@/components/general/AddAction"
import AddButton from "@/components/general/AddButton"
import MainScreen from "@/components/general/MainScreen"
import FormCreatePlayer from "@/components/teams/FormCreatePlayer"

import { IPlayer } from "@/interface/Player"

import { generalStyles } from "@/styles/general.styles"
import { teamsStyles } from "@/styles/team.styles"
import { createStyles } from "@/styles/create.styles"

import { useSpacing } from "@/hooks/useSpacing"
import { useLanguage } from "@/hooks/useLanguageContext"

import { usePlayerStore } from "@/store/player.store"
import { useTeamStore } from "@/store/team.store"
import { useGroupStore } from "@/store/group.store"
import { useUserStore } from "@/store/user.store"

interface IPlayerSection {
    title: string
    data: IPlayer[]
}

const PlayersTeamScreen = () => {

    const { colors } = useTheme()
    const { t } = useLanguage()

    const { showForm, player, hideAndShowAddPlayer, getPlayer, sureRemovePlayer } = usePlayerStore()
    const { group, createPlayer, updatePlayer } = useGroupStore()
    const { premium } = useUserStore()
    const { team } = useTeamStore()

    const spacing = useSpacing()

    const openSure = (data: IPlayer) => {
        getPlayer(data)
        sureRemovePlayer(true)
    }

    const openCreatePlayer = () => {
        getPlayer({})
        hideAndShowAddPlayer(true)
    }

    const handleUpdatePlayer = useCallback((data: IPlayer) => {
        getPlayer(data)
        hideAndShowAddPlayer(true)
    }, [getPlayer, hideAndShowAddPlayer])

    useEffect(() => {
        hideAndShowAddPlayer(false)
        sureRemovePlayer(false)
        getPlayer({})
    }, [])

    const playerSections = useMemo<IPlayerSection[]>(() => {

        const allPlayers = group.players ?? []

        const teamPlayers = team?.id
            ? allPlayers.filter((p) => p.team?.id === team.id)
            : allPlayers

        const groups: { [key: string]: IPlayer[] } = {}

        teamPlayers.forEach((p) => {
            const pos = p.position?.trim() ? p.position : t("without_position")
            if (!groups[pos]) {
                groups[pos] = []
            }
            groups[pos].push(p)
        })

        return Object.keys(groups).map((posKey) => {
            const sortedPlayers = groups[posKey].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", undefined, { sensitivity: "base" })
            )

            return {
                title: posKey,
                data: sortedPlayers,
            }
        })
    }, [group.players, team])

    const totalTeamPlayers = useMemo(
        () => playerSections.reduce((acc, sec) => acc + sec.data.length, 0),
        [playerSections]
    )

    const renderPlayer = useCallback(
        ({ item, index, section }: { item: IPlayer; index: number; section: IPlayerSection }) => (
            <View style={{ width: "100%" }}>
                <List.Item
                    onPress={() => handleUpdatePlayer(item)}
                    style={[teamsStyles.itemPlayer, {
                        paddingVertical: spacing.h106,
                    }]}
                    title={item.name}
                    titleStyle={{
                        fontSize: 16
                    }}
                    left={() => (
                        <Avatar.Text
                            size={42}
                            label={item.name ? item.name.charAt(0).toUpperCase() : "?"}
                            style={[teamsStyles.avatarPlayer, {
                                backgroundColor: colors.primary,
                            }]}
                        />
                    )}
                    right={(props) => (
                        <List.Icon {...props} icon="chevron-right" color={colors.outline} />
                    )}
                />

                {index < section.data.length - 1 && (
                    <Divider style={{ backgroundColor: colors.surfaceVariant }} />
                )}
            </View>
        ),
        [handleUpdatePlayer, colors, spacing]
    )

    const renderSectionHeader = useCallback(
        ({ section: { title } }: { section: IPlayerSection }) => (
            <View
                style={[
                    teamsStyles.sectionHeader,
                    { backgroundColor: colors.primary },
                ]}
            >
                <Text variant="titleSmall" style={teamsStyles.sectionHeaderText}>
                    {title}
                </Text>
            </View>
        ),
        [colors]
    )

    return (
        <MainScreen colors={colors}>
            {showForm && (
                <FormCreatePlayer
                    team={team}
                    colors={colors}
                    createPlayer={createPlayer}
                    group={group}
                    hideAndShowAddPlayer={hideAndShowAddPlayer}
                    player={player}
                    premium={premium}
                    spacing={spacing}
                    updatePlayer={updatePlayer}
                    openSure={openSure}
                    t={t}
                />
            )}

            <View
                style={[
                    generalStyles.containerGeneral,
                    {
                        backgroundColor: colors.background,
                        paddingHorizontal: 0,
                        flex: 1,
                    },
                ]}
            >
                {totalTeamPlayers > 0 ? (
                    <>
                        <AddButton colors={colors} handleAdd={openCreatePlayer} />
                        <SectionList
                            sections={playerSections}
                            keyExtractor={(item, idx) => item.id ?? String(idx)}
                            renderItem={renderPlayer}
                            renderSectionHeader={renderSectionHeader}
                            stickySectionHeadersEnabled
                            style={{ width: "100%" }}
                            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                            initialNumToRender={10}
                            windowSize={5}
                            removeClippedSubviews
                        />
                    </>
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <AddAction
                            openForm={hideAndShowAddPlayer}
                            colors={colors}
                            text={t("add_player")}
                        />
                        <Text variant="bodyMedium" style={createStyles.advideText}>
                            {t("players_empty")}
                        </Text>
                    </View>
                )}
            </View>
        </MainScreen>
    )
}

export default PlayersTeamScreen