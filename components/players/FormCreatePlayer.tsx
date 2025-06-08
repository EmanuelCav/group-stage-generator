import { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import i18n from '@/i18n'

import { View } from "../Themed";
import StatisticPlayer from "./components/StatisticPlayer";
import ContainerBackground from "../general/ContainerBackground";

import { ICreate, ICreatePlayer } from "@/interface/Team";
import { IStatistic } from "@/interface/Player";
import { FormCreatePlayerPropsType } from "@/types/player.types";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { generateStatistic, getTeamsName } from "@/utils/defaultGroup";

import { playerSchema } from "@/schema/player.schema";

type RenderStatistic = {
    item: IStatistic;
    index: number;
}

const FormCreatePlayer = ({ colors, group, hideAndShowAddPlayer, createPlayer, player, updatePlayer, openSure, handleUpdateStatistic }: FormCreatePlayerPropsType) => {

    const [teamSelected, setTeamSelected] = useState<string>(player.team?.name ? player.team?.name : group.teams[0].name!)
    const [isFocus, setIsFocus] = useState<boolean>(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(playerSchema),
        defaultValues: {
            name: player.name ? player.name : "",
            position: player.position ? player.position : "",
        }
    })

    const renderStatistic = ({ item, index }: RenderStatistic) => {
        return (
            <StatisticPlayer statistic={item} colors={colors} handleUpdateStatistic={handleUpdateStatistic}
                isLast={(index + 1) === player.statistics?.length} />
        )
    }

    const handleAddPlayer = (playerCreated: ICreatePlayer) => {

        if (player.name) {
            updatePlayer({
                id: player.id,
                name: playerCreated.name,
                statistics: player.statistics,
                team: group.teams.find((t) => t.name === teamSelected),
                position: playerCreated.position
            })
        } else {
            createPlayer({
                id: group.players?.length as number + 1,
                name: playerCreated.name,
                statistics: generateStatistic(group.players!),
                team: group.teams.find((t) => t.name === teamSelected),
                position: playerCreated.position
            })

            reset()
        }

        hideAndShowAddPlayer(false)
    }

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowAddPlayer(false)}
            />

            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={i18n.t("playerName")}
                        mode="outlined"
                        style={createStyles.inputGeneralCreate}
                    />
                )}
            />
            {errors.name && (
                <Text
                    variant="labelMedium"
                    style={{
                        color: MD3Colors.error50,
                        marginTop: Dimensions.get("window").height / 106,
                    }}
                >
                    {errors.name.message}
                </Text>
            )}

            <Controller
                name="position"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={i18n.t("positionOptional")}
                        mode="outlined"
                        style={createStyles.inputGeneralCreate}
                    />
                )}
            />
            {errors.position && (
                <Text
                    variant="labelMedium"
                    style={{
                        color: MD3Colors.error50,
                        marginTop: Dimensions.get("window").height / 106,
                    }}
                >
                    {errors.position.message}
                </Text>
            )}

            <View style={createStyles.selectInputDropdownContain}>
                <Text variant="labelLarge">{i18n.t("selectPlayerTeam")}</Text>
                <Dropdown
                    style={[
                        createStyles.dropdownComplete,
                        isFocus && { borderColor: colors.primary },
                    ]}
                    placeholderStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    selectedTextStyle={{ fontSize: Dimensions.get("window").height / 47 }}
                    data={getTeamsName(group.teams)}
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
            </View>

            {player.name && player.statistics?.length! > 0 && (
                <>
                    <Text variant="bodyLarge" style={{ color: colors.primary }}>
                        {i18n.t("statistics")}
                    </Text>
                    <FlatList
                        style={[
                            createStyles.containerStatisticsPlayer,
                            {
                                borderColor: colors.primary,
                            },
                        ]}
                        data={player.statistics}
                        renderItem={renderStatistic}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </>
            )}

            <Button
                mode="contained"
                style={[
                    { backgroundColor: colors.primary },
                    generalStyles.generateButton,
                ]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleSubmit((data) => handleAddPlayer(data))}
            >
                {player.name ? i18n.t("update") : i18n.t("add")}
            </Button>

            {player.name && (
                <Button
                    mode="contained"
                    style={[
                        { backgroundColor: MD3Colors.error50 },
                        generalStyles.generateButton,
                    ]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(player)}
                >
                    {i18n.t("remove")}
                </Button>
            )}
        </ContainerBackground>
    );
};

export default FormCreatePlayer
