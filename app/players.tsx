import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Toast, { ErrorToast } from 'react-native-toast-message';
import { TestIds } from "react-native-google-mobile-ads";
import { Dropdown } from 'react-native-element-dropdown';
import i18n from '@/i18n'

import { View } from "@/components/Themed";
import MainScreen from "@/components/general/MainScreen";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import FormCreatePlayer from "@/components/players/FormCreatePlayer";
import Player from "@/components/players/Player";
import AddAction from "@/components/general/AddAction";
import AddButton from "@/components/general/AddButton";
import Sure from "@/components/general/Sure";
import SureGeneral from "@/components/general/SureGeneral";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IPlayer } from "@/interface/Player";

import { groupStore } from "@/store/group.store";
import { playerStore } from "@/store/player.store";
import { userStore } from "@/store/user.store";

import { getTeamsName } from "@/utils/defaultGroup";

import { useInterstitialAd } from "@/hooks/useInterstitialAd";
import { useSpacing } from "@/hooks/useSpacing";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_PLAYER}`;

const toastConfig = {
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1NumberOfLines={1}
            text2NumberOfLines={3}
        />
    ),
}

const Players = () => {

    const { showForm, hideAndShowAddPlayer, getPlayer, player, isSure, sureRemovePlayer, sureRemoveStatistic, getStatistic } = playerStore()
    const { group, createPlayer, updatePlayer, removePlayer, sureRestartGroup, sureRemoveGroup, createGroup, groups } = groupStore()
    const { premium } = userStore()

    const { colors } = useTheme()

    const router = useRouter()

    const spacing = useSpacing()

    const { interstitial, isLoaded: isInterstitialLoaded } = useInterstitialAd(premium ? null : adUnitId)

    const [teamSelected, setTeamSelected] = useState<string>("All teams")
    const [isFocus, setIsFocus] = useState<boolean>(false)

    const handleUpdate = (data: IPlayer) => {
        updatePlayer(data)
        getPlayer({})
    }

    const handleUpdatePlayer = useCallback((data: IPlayer) => {
        getPlayer(data)
        hideAndShowAddPlayer(true)
    }, [])

    const openSure = (data: IPlayer) => {
        getPlayer(data)
        sureRemovePlayer(true)
    }

    const handleRemovePlayer = () => {
        sureRemovePlayer(false)
        hideAndShowAddPlayer(false)
        removePlayer(player)
        getPlayer({})
    }

    const close = () => {
        sureRemovePlayer(false)
        sureRemoveStatistic(false)
    }

    const openCreatePlayer = () => {
        getPlayer({})
        hideAndShowAddPlayer(true)
    }

    const goBack = useCallback(() => {
        router.replace("/(tabs)/groups")
    }, [router])

    const teamsOptions = useMemo(() => {
        return [
            ...getTeamsName(group.teams),
            { value: "All teams", label: i18n.t("allTeams") }
        ]
    }, [group.teams])

    const filteredPlayers = useMemo(() => {
        if (teamSelected === "All teams") return group.players ?? [];
        return group.players?.filter(p => p.team?.name === teamSelected) ?? [];
    }, [group.players, teamSelected]);

    const renderPlayer = useCallback(
        ({ item }: { item: IPlayer }) => (
            <Player
                player={item}
                handleUpdatePlayer={handleUpdatePlayer}
                colors={colors}
            />
        ),
        [handleUpdatePlayer, colors, spacing]
    )

    useEffect(() => {
        hideAndShowAddPlayer(false)
        sureRemovePlayer(false)
        getPlayer({})
        getStatistic({})
    }, [])

    return (
        <MainScreen colors={colors}>
            {
                isSure && <Sure func={handleRemovePlayer} text={i18n.t("areYouSureDelete")} close={close} labelButton={i18n.t("remove")} />
            }
            {
                showForm && <FormCreatePlayer group={group} colors={colors} player={player} openSure={openSure}
                    hideAndShowAddPlayer={hideAndShowAddPlayer} createPlayer={createPlayer} updatePlayer={handleUpdate}
                    interstitial={interstitial!} isIntersitialLoaded={isInterstitialLoaded} premium={premium} spacing={spacing} />
            }

            <HeaderGeneral colors={colors} router={router} title={i18n.t("players_title")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} createGroup={createGroup}
                group={group} groups={groups} premium={premium} />

            <SureGeneral />

            <Toast config={toastConfig} />

            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
                {
                    group.players!.length > 0 &&
                    <Dropdown
                        style={[
                            createStyles.dropdownComplete,
                            { backgroundColor: colors.tertiary },
                            isFocus && { borderColor: colors.primary },
                        ]}
                        placeholderStyle={{
                            fontSize: spacing.h47,
                            color: colors.surface,
                            backgroundColor: colors.tertiary
                        }}
                        selectedTextStyle={{
                            fontSize: spacing.h47,
                            color: colors.surface,
                            backgroundColor: colors.tertiary
                        }}
                        itemTextStyle={{
                            color: colors.surface
                        }}
                        containerStyle={{
                            backgroundColor: colors.tertiary,
                        }}
                        activeColor={colors.primary}
                        data={teamsOptions}
                        maxHeight={spacing.h3_8}
                        labelField="label"
                        valueField="value"
                        placeholder={String(teamSelected)}
                        value={teamSelected}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setTeamSelected(item.value);
                            setIsFocus(false);
                        }}
                    />
                }
                {
                    group.players!.length > 0 ? <AddButton colors={colors} handleAdd={openCreatePlayer} /> :
                        <AddAction openForm={hideAndShowAddPlayer} colors={colors} text={i18n.t("add_player")} />
                }
                {
                    group.players!.length > 0 ?
                        <FlatList
                            data={filteredPlayers}
                            style={{ width: '100%' }}
                            keyExtractor={(item) => item.id!}
                            renderItem={renderPlayer}
                            initialNumToRender={10}
                            windowSize={5}
                            removeClippedSubviews
                        /> : <View style={{ flex: group.players?.length! > 0 ? 1 : 0, backgroundColor: colors.background }}>
                            <Text variant="bodyMedium" style={createStyles.advideText}>
                                {i18n.t("players_emptyStatistics")}
                            </Text>
                        </View>
                }
            </View>
        </MainScreen>
    );
};

export default Players;