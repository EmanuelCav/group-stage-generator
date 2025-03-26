import { useEffect } from "react";
import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

import { View } from "@/components/Themed";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import FormCreatePlayer from "@/components/players/FormCreatePlayer";
import Player from "@/components/players/Player";
import AddAction from "@/components/general/AddAction";
import AddButton from "@/components/general/AddButton";
import Sure from "@/components/general/Sure";
import SureGeneral from "@/components/general/SureGeneral";
import FormCreateStatistic from "@/components/statistics/FormCreateStatistic";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IPlayer, IStatistic } from "@/interface/Player";

import { groupStore } from "@/store/group.store";

import { playerStore } from "@/store/player.store";

const Players = () => {

    const { showForm, hideAndShowAddPlayer, getPlayer, player, isSure, isSureStatistic, sureRemovePlayer,
        sureRemoveStatistic, hideAndShowAddStatistic, showFormStatistic, getStatistic, statistic, 
        removePlayerStatisticValue, updatePlayerStatisticTitle, updatePlayerStatisticValue } = playerStore()
    const { group, createPlayer, updatePlayer, removePlayer, createStatistic,
        updateStatisticTitle, updateStatisticValue, removeStatistic, sureRestartGroup, sureRemoveGroup } = groupStore()

    const { colors } = useTheme()

    const router = useRouter()

    const handleUpdate = (data: IPlayer) => {
        updatePlayer(data)
        getPlayer({})
    }

    const handleUpdateTitleStatistic = (data: IStatistic) => {
        updateStatisticTitle(data)
        updatePlayerStatisticTitle(data)
        getStatistic({})
    }

    const handleUpdateValueStatistic = (data: IStatistic) => {
        updateStatisticValue(data, player)
        updatePlayerStatisticValue(data)
        getStatistic({})
    }

    const handleUpdatePlayer = (data: IPlayer) => {
        getPlayer(data)
        hideAndShowAddPlayer(true)
    }

    const handleUpdateStatistic = (data: IStatistic) => {
        getStatistic(data)
        hideAndShowAddStatistic(true)
    }

    const openSure = (data: IPlayer) => {
        getPlayer(data)
        sureRemovePlayer(true)
    }

    const openSureStatistic = (data: IStatistic) => {
        getStatistic(data)
        sureRemoveStatistic(true)
    }

    const handleRemovePlayer = () => {
        sureRemovePlayer(false)
        hideAndShowAddPlayer(false)
        removePlayer(player)
        getPlayer({})
    }

    const handleRemoveStatistic = () => {
        sureRemoveStatistic(false)
        hideAndShowAddStatistic(false)
        removeStatistic(statistic)
        removePlayerStatisticValue(statistic)
        getStatistic({})
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

    return (
        <View style={{ flex: 1 }}>
            {
                isSureStatistic && <Sure func={handleRemoveStatistic} text="Are you sure you want to delete?" close={close} />
            }
            {
                isSure && <Sure func={handleRemovePlayer} text="Are you sure you want to delete?" close={close} />
            }
            {
                showForm && <FormCreatePlayer group={group} colors={colors} player={player} openSure={openSure} handleUpdateStatistic={handleUpdateStatistic}
                    hideAndShowAddPlayer={hideAndShowAddPlayer} createPlayer={createPlayer} updatePlayer={handleUpdate} />
            }
            {
                showFormStatistic && <FormCreateStatistic group={group} colors={colors} statistic={statistic} handleUpdateTitleStatistic={handleUpdateTitleStatistic}
                    hideAndShowAddStatistic={hideAndShowAddStatistic} createStatistic={createStatistic} openSure={openSureStatistic} handleUpdateValueStatistic={handleUpdateValueStatistic} />
            }
            <HeaderGeneral colors={colors} router={router} title="Players" goBack={goBack} 
            sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            <View style={generalStyles.containerGeneral}>
                {
                    group.players!.length > 0 ? <AddButton colors={colors} handleAdd={openCreateReferee} /> :
                        <AddAction openForm={hideAndShowAddPlayer} colors={colors} text="ADD PLAYER" />
                }
                {
                    group.players!.length > 0 ?
                        <FlatList
                            style={{ width: '100%' }}
                            data={group.players!}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => <Player player={item}
                                handleUpdatePlayer={handleUpdatePlayer} />}
                        /> : <Text variant="bodyMedium" style={createStyles.advideText}>
                            Add players to display statistics
                        </Text>
                }
            </View>
        </View>
    );
};

export default Players;