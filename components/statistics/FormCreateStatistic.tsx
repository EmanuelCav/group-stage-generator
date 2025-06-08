import { Dimensions } from "react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import i18n from '@/i18n'

import ContainerBackground from "../general/ContainerBackground";
import { View } from "../Themed";

import { FormCreateStatisticPropsType } from "@/types/statistics.types";
import { ICreateStatistic } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { statisticSchema } from "@/schema/statistic.schema";

const FormCreateStatistic = ({ colors, group, statistic, createStatistic, hideAndShowAddStatistic, openSure, handleUpdateValueStatistic, handleUpdateTitleStatistic }: FormCreateStatisticPropsType) => {

    const [valueStatistic, setValueStatistic] = useState<string>(statistic.value ? String(statistic.value) : "0")

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(statisticSchema),
        defaultValues: {
            title: statistic.title ?? ""
        }
    })

    const handleAddStatistic = (statisticCreated: ICreateStatistic) => {

        if (statistic.id) {
            handleUpdateValueStatistic({
                id: statistic.id,
                title: statisticCreated.title,
                value: Number(valueStatistic),
                defaultValue: statistic.defaultValue
            })
            handleUpdateTitleStatistic({
                id: statistic.id,
                title: statisticCreated.title,
                value: Number(valueStatistic),
                defaultValue: statistic.defaultValue
            })
        } else {
            createStatistic({
                id: group.players![0].statistics?.length! + 1,
                title: statisticCreated.title,
                value: Number(valueStatistic),
                defaultValue: Number(valueStatistic)
            })
        }

        reset()

        hideAndShowAddStatistic(false)
    }

    return (
        <ContainerBackground zIndex={30}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowAddStatistic(false)}
            />

            <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        label={i18n.t("statisticTitle")}
                        mode="outlined"
                        style={createStyles.inputGeneralCreate}
                    />
                )}
            />

            {errors.title && (
                <Text
                    variant="labelMedium"
                    style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 106 }}
                >
                    {errors.title.message}
                </Text>
            )}

            <Text variant="bodyMedium" style={{ marginTop: Dimensions.get("window").height / 74 }}>
                {statistic.id ? i18n.t("statisticValue") : i18n.t("statisticInitialValueOptional")}
            </Text>

            <View style={createStyles.updateValue}>
                <IconButton
                    icon="minus"
                    mode="contained"
                    size={24}
                    style={{ backgroundColor: "#ffffff" }}
                    onPress={() => setValueStatistic(String(Number(valueStatistic) - 1))}
                />

                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/[^-?\d]/g, '');
                        if (/^-?\d*$/.test(formattedText)) {
                            setValueStatistic(formattedText);
                        }
                    }}
                    value={String(valueStatistic)}
                    style={createStyles.inputNumberCreate}
                />

                <IconButton
                    icon="plus"
                    mode="contained"
                    style={{ backgroundColor: "#ffffff" }}
                    size={24}
                    onPress={() => setValueStatistic(String(Number(valueStatistic) + 1))}
                />
            </View>

            <Button
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleSubmit((data) => handleAddStatistic(data))}
            >
                {statistic.id ? i18n.t("update") : i18n.t("create")}
            </Button>

            {statistic.id && (
                <Button
                    mode="contained"
                    style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(statistic)}
                >
                    {i18n.t("remove")}
                </Button>
            )}
        </ContainerBackground>
    );
};

export default FormCreateStatistic
