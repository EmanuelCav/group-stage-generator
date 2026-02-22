import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from '@/i18n'

import { View } from "../Themed";
import StatisticPlayer from "./components/StatisticPlayer";
import ContainerBackground from "../general/ContainerBackground";

import { ICreatePlayer } from "@/interface/Team";
import { FormCreatePlayerPropsType } from "@/types/player.types";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { generateId, getTeamsName } from "@/utils/defaultGroup";
import { playerStatistics, statisticPlayer } from "@/utils/statistics";

import { playerSchema } from "@/schema/player.schema";

const FormCreatePlayer = ({ colors, group, hideAndShowAddPlayer, createPlayer, player, updatePlayer, openSure, interstitial, isIntersitialLoaded, premium, spacing }: FormCreatePlayerPropsType) => {

    const [teamSelected, setTeamSelected] = useState<string>(player.team?.name ?? group.teams[0].name!)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(playerSchema),
        defaultValues: {
            name: player.name ?? "",
            position: player.position ?? "",
        }
    })

    const handleAddPlayer = async (playerCreated: ICreatePlayer) => {

        if (!player.id) {

            const countPlayerTeam = group.players?.filter(pl => pl.team?.id === player.team?.id).length!

            if (!premium && countPlayerTeam >= 15) {
                Toast.show({
                    type: 'error',
                    text1: i18n.t("limit_players"),
                    text2: i18n.t("limit_players_description")
                });
                return
            }

        }

        setLoading(true)

        if (player.id) {
            updatePlayer({
                id: player.id,
                name: playerCreated.name,
                team: group.teams.find((t) => t.name === teamSelected),
                position: playerCreated.position
            })
        } else {
            createPlayer({
                id: generateId(),
                name: playerCreated.name,
                team: group.teams.find((t) => t.name === teamSelected),
                position: playerCreated.position
            })

            try {

                const storedCount = await AsyncStorage.getItem("reviewCount");
                const count = storedCount ? parseInt(storedCount, 10) : 0;

                if (interstitial) {
                    if (group.players?.length !== 0) {
                        if (group.players?.length === 1 || group.players!.length % 8 === 0) {
                            if ((interstitial.loaded || isIntersitialLoaded) && count > 3 && !premium) {
                                interstitial.show()
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }

            reset()
        }

        setTimeout(() => {
            setLoading(false)
            hideAndShowAddPlayer(false)
        }, 300)
    }

    const teamsOptions = useMemo(
        () => getTeamsName(group.teams),
        [group.teams]
    )

    const statistics = useMemo(() => {
        if (!player.id) return []
        return statisticPlayer(group, player);
    }, [group, player])

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
                        style={[createStyles.inputGeneralCreate, { backgroundColor: colors.tertiary }]}
                        maxLength={30}
                    />
                )}
            />
            {errors.name && (
                <Text
                    variant="labelMedium"
                    style={{
                        color: MD3Colors.error50,
                        marginTop: spacing.h106,
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
                        style={[createStyles.inputGeneralCreate, { backgroundColor: colors.tertiary }]}
                    />
                )}
            />
            {errors.position && (
                <Text
                    variant="labelMedium"
                    style={{
                        color: MD3Colors.error50,
                        marginTop: spacing.h106,
                    }}
                >
                    {errors.position.message}
                </Text>
            )}

            <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                <Text variant="labelLarge">{i18n.t("selectPlayerTeam")}</Text>
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
            </View>

            {player.id && (
                <>
                    <Text variant="bodyLarge" style={{ color: colors.primary }}>
                        {i18n.t("statistics")}
                    </Text>
                    <ScrollView
                        style={[
                            createStyles.containerStatisticsPlayer,
                            { borderColor: colors.primary, borderWidth: 1.5 },
                        ]}
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    >
                        {statistics.map((item, index) => (
                            <StatisticPlayer
                                key={index}
                                statistic={item}
                                title={playerStatistics[index]}
                                colors={colors}
                                isLast={(index + 1) === playerStatistics.length}
                            />
                        ))}
                    </ScrollView>
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
                    loading={loading}
                    disabled={loading}
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
