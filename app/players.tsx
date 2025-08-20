import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
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

import { getTeamsName } from "@/utils/defaultGroup";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const Players = () => {

    const { showForm, hideAndShowAddPlayer, getPlayer, player, isSure, sureRemovePlayer, sureRemoveStatistic, getStatistic } = playerStore()
    const { group, createPlayer, updatePlayer, removePlayer, sureRestartGroup, sureRemoveGroup } = groupStore()

    const { colors } = useTheme()

    const router = useRouter()

    const [isIntersitialLoaded, setIsIntersitialLoaded] = useState<boolean>(false)
    const [teamSelected, setTeamSelected] = useState<string>("All teams")
    const [isFocus, setIsFocus] = useState<boolean>(false)

    const handleUpdate = (data: IPlayer) => {
        updatePlayer(data)
        getPlayer({})
    }

    const handleUpdatePlayer = (data: IPlayer) => {
        getPlayer(data)
        hideAndShowAddPlayer(true)
    }

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

    const openCreateReferee = () => {
        getPlayer({})
        hideAndShowAddPlayer(true)
    }

    const goBack = () => {
        router.replace("/(tabs)/groups")
    }

    useEffect(() => {
        hideAndShowAddPlayer(false)
        sureRemovePlayer(false)
        getPlayer({})
        getStatistic({})
    }, [])

    useEffect(() => {

        const loadInterstitialAd = () => {
            try {
                interstitial.load();
            } catch (error) {
                console.error("Error loading interstitial ad:", error);
            }
        };

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setIsIntersitialLoaded(true)
        });

        const unsubscribedClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setIsIntersitialLoaded(false)
            loadInterstitialAd();
        });

        loadInterstitialAd();

        return () => {
            unsubscribeLoaded()
            unsubscribedClosed()
        };
    }, []);

    return (
        <MainScreen colors={colors}>
            {
                isSure && <Sure func={handleRemovePlayer} text={i18n.t("areYouSureDelete")} close={close} labelButton={i18n.t("remove")} />
            }
            {
                showForm && <FormCreatePlayer group={group} colors={colors} player={player} openSure={openSure}
                    hideAndShowAddPlayer={hideAndShowAddPlayer} createPlayer={createPlayer} updatePlayer={handleUpdate}
                    interstitial={interstitial} isIntersitialLoaded={isIntersitialLoaded} />
            }
            <HeaderGeneral colors={colors} router={router} title={i18n.t("players_title")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
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
                            fontSize: Dimensions.get("window").height / 47,
                            color: colors.surface,
                            backgroundColor: colors.tertiary
                        }}
                        selectedTextStyle={{
                            fontSize: Dimensions.get("window").height / 47,
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
                        data={[...getTeamsName(group.teams), { value: "All teams", label: i18n.t("allTeams") }]}
                        maxHeight={Dimensions.get("window").height / 3.8}
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
                    group.players!.length > 0 ? <AddButton colors={colors} handleAdd={openCreateReferee} /> :
                        <AddAction openForm={hideAndShowAddPlayer} colors={colors} text={i18n.t("add_player")} />
                }
                {
                    group.players!.length > 0 ?
                        <FlatList
                            style={{ width: '100%' }}
                            data={group.players!}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => <Player player={item}
                                handleUpdatePlayer={handleUpdatePlayer} colors={colors} />}
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