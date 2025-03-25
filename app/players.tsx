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

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IPlayer } from "@/interface/Player";

import { groupStore } from "@/store/group.store";

import { playerStore } from "@/store/player.store";

const Players = () => {

    const { showForm, hideAndShowAddPlayer, getPlayer, player, isSure, sureRemovePlayer } = playerStore()
    const { group, createPlayer, updatePlayer, removePlayer, getGroup } = groupStore()

    const { colors } = useTheme()

    const router = useRouter()

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
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {
                isSure && <Sure func={handleRemovePlayer} text="Are you sure you want to delete?" close={close} />
            }
            {
                showForm && <FormCreatePlayer group={group} colors={colors} player={player} openSure={openSure}
                    hideAndShowAddPlayer={hideAndShowAddPlayer} createPlayer={createPlayer} updatePlayer={handleUpdate} />
            }
            <HeaderGeneral colors={colors} router={router} title="Players" goBack={goBack} />
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
                            renderItem={({ item }) => <Player player={item} handleUpdatePlayer={handleUpdatePlayer} />}
                        /> : <Text variant="bodyMedium" style={createStyles.advideText}>
                            Add players to display statistics
                        </Text>
                }
            </View>
        </View>
    );
};

export default Players;