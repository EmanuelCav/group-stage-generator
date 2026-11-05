import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, MD3Colors, Text, TextInput } from "react-native-paper";
import Toast from 'react-native-toast-message';

import ContainerBackground from "../general/ContainerBackground";
import StatisticPlayer from "./components/StatisticPlayer";

import { ICreatePlayer } from "@/interface/Team";
import { FormCreatePlayerPropsType } from "@/types/player.types";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { generateId } from "@/utils/defaultGroup";
import { statisticPlayer } from "@/utils/statistics";

import { playerSchema } from "@/schema/player.schema";

import { interstitialService } from "@/services/interstitialService";

const FormCreatePlayer = ({ colors, group, hideAndShowAddPlayer, createPlayer, player, updatePlayer, openSure, premium, spacing, team, t }: FormCreatePlayerPropsType) => {

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
                    text1: t("limit_players"),
                    text2: t("limit_players_description")
                });
                return
            }

        }

        try {

            setLoading(true)

            if (player.id) {
                updatePlayer({
                    id: player.id,
                    name: playerCreated.name,
                    team,
                    position: playerCreated.position
                })
            } else {
                createPlayer({
                    id: generateId(),
                    name: playerCreated.name,
                    team,
                    position: playerCreated.position
                })

                try {

                    const storedCount = await AsyncStorage.getItem("reviewCount");
                    const count = storedCount ? parseInt(storedCount, 10) : 0;

                    if (group.players?.length !== 0) {
                        if (group.players?.length === 1 || group.players!.length % 7 === 0) {
                            if (!premium && interstitialService.isLoaded() && count > 3) {
                                interstitialService.show()
                            }
                        }
                    }

                } catch (error) {
                    console.log(error);
                }

            }

            hideAndShowAddPlayer(false)
            reset()

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const statistics = useMemo(() => {
        if (!player.id) return []
        return statisticPlayer(group, player);
    }, [group, player])

    return (
        <ContainerBackground zIndex={20} onClose={() => hideAndShowAddPlayer(false)}>

            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={t("playerName")}
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
                    {t(errors.name.message!, { defaultValue: errors.name.message })}
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
                        label={t("positionOptional")}
                        mode="outlined"
                        style={[{ backgroundColor: colors.tertiary, marginTop: 14 }]}
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
                    {t(errors.position.message!, { defaultValue: errors.position.message })}
                </Text>
            )}

            {player.id && statistics.length > 0 && (
                <View style={{ marginTop: 7 }}>
                    <Text variant="bodyLarge" style={{ color: colors.primary }}>
                        {t("statistics")}
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
                                title={[t("goals"), t("yellow"), t("red"), t("assists")][index]}
                                colors={colors}
                                isLast={(index + 1) === [t("goals"), t("yellow"), t("red"), t("assists")].length}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}

            <Button
                loading={loading}
                disabled={loading}
                mode="contained"
                style={[
                    { backgroundColor: colors.primary },
                    generalStyles.generateButton,
                ]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleSubmit((data) => handleAddPlayer(data))}
            >
                {player.name ? t("update") : t("add")}
            </Button>

            {player.name && (
                <Button
                    disabled={loading}
                    mode="contained"
                    style={[
                        { backgroundColor: MD3Colors.error50 },
                        generalStyles.generateButton,
                    ]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(player)}
                >
                    {t("remove")}
                </Button>
            )}
        </ContainerBackground>
    );
};

export default FormCreatePlayer