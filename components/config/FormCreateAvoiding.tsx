import { useEffect } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button, Checkbox } from "react-native-paper";
import i18n from '@/i18n'

import { View } from "../Themed";
import ContainerBackground from "../general/ContainerBackground";

import { FormCreateAvoidingPropsType } from "@/types/config.types";
import { ICreateAvoiding, ITeam } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";
import { configStyles } from "@/styles/config.styles";

import { avoidingSchema } from "@/schema/config.schema";

import { generateAvoidingTeams, generateId } from "@/utils/defaultGroup";

const FormCreateAvoiding = ({ colors, group, hideAndShowAddAvoiding, createAvoiding, avoiding, updateAvoiding, openSure, teamsAvoiding, setTeamsAvoiding }: FormCreateAvoidingPropsType) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(avoidingSchema),
        defaultValues: {
            title: avoiding.title ?? "",
            max: avoiding.max ?? 1
        }
    })

    const handleAddAvoiding = (avoidingCreated: ICreateAvoiding) => {

        const arrTeamsAvoid = Object.keys(teamsAvoiding).map(String)

        let updateTeams: ITeam[] = []

        for (let i = 0; i < arrTeamsAvoid.length; i++) {
            updateTeams.push(group.teams?.find(p => p.id === arrTeamsAvoid[i])!)
        }

        if (avoiding.title) {
            updateAvoiding({
                id: avoiding.id! + 1,
                title: avoidingCreated.title,
                teams: [...updateTeams],
                max: Number(avoidingCreated.max)
            })
        } else {
            createAvoiding({
                id: generateId(),
                title: avoidingCreated.title,
                teams: [...updateTeams],
                max: Number(avoidingCreated.max)
            })

            reset()
        }

        hideAndShowAddAvoiding(false)
    }

    const toggleCheckbox = (teamId: string) => {
        setTeamsAvoiding((prev) => ({
            ...prev,
            [teamId]: !prev[teamId],
        }))
    }

    useEffect(() => {

        if (avoiding.id) {
            let idsTeams: Record<string, boolean> = {};

            for (let i = 0; i < group.teams.length; i++) {
                if (group.avoidingMatches?.find(am => am.teams?.find(t => t.id === group.teams[i].id))) {
                    idsTeams[group.teams[i].id!] = true;
                }
            }

            setTeamsAvoiding(idsTeams);
        }

    }, [])

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowAddAvoiding(false)}
            />

            <Controller
                name="title"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={i18n.t("avoiding.title")}
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

            <View style={configStyles.labelSettings}>
                <Text variant="bodyLarge" style={{ textAlign: 'center', marginTop: Dimensions.get("window").height / 28 }}>
                    {i18n.t("avoiding.maxTeamsLabel")}
                </Text>
                <Controller
                    name="max"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            inputMode="numeric"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedText = text.replace(/\D/g, '');
                                onChange(formattedText);
                            }}
                            onBlur={onBlur}
                            value={String(value)}
                            style={configStyles.inputSettingsNumber}
                        />
                    )}
                />
            </View>

            <Text variant="labelLarge" style={{ marginVertical: Dimensions.get("window").height / 28 }}>
                {i18n.t("avoiding.selectTeams")}
            </Text>

            <ScrollView>
                {generateAvoidingTeams(group, avoiding)?.map((team) => (
                    <Checkbox.Item
                        key={team.id}
                        label={team.name!}
                        status={teamsAvoiding[team.id!] ? "checked" : "unchecked"}
                        onPress={() => toggleCheckbox(String(team.id))}
                    />
                ))}
            </ScrollView>

            <Button
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleSubmit((data) => handleAddAvoiding(data))}
            >
                {avoiding.id ? i18n.t("general.update") : i18n.t("general.add")}
            </Button>

            {avoiding.id && (
                <Button
                    mode="contained"
                    style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(avoiding)}
                >
                    {i18n.t("general.remove")}
                </Button>
            )}
        </ContainerBackground>
    );
};

export default FormCreateAvoiding
