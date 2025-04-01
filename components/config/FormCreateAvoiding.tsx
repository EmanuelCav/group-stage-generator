import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button, Checkbox } from "react-native-paper";

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateAvoidingPropsType } from "@/types/config.types";
import { ICreateStatistic, ITeam } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { avoidingSchema } from "@/schema/config.schema";

const FormCreateAvoiding = ({ colors, group, hideAndShowAddAvoiding, createAvoiding, avoiding, updateAvoiding, openSure, teamsAvoiding, setTeamsAvoiding }: FormCreateAvoidingPropsType) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(avoidingSchema),
        defaultValues: {
            title: avoiding.title ? avoiding.title : ""
        }
    })

    const handleAddAvoiding = (avoidingCreated: ICreateStatistic) => {

        const arrTeamsAvoid = Object.keys(teamsAvoiding).map(Number)

        let updateTeams: ITeam[] = []

        for (let i = 0; i < arrTeamsAvoid.length; i++) {
            updateTeams.push(group.teams?.find(p => p.id === arrTeamsAvoid[i])!)
        }

        if (avoiding.title) {
            updateAvoiding({
                id: avoiding.id! + 1,
                title: avoidingCreated.title,
                teams: [...updateTeams]
            })
        } else {
            createAvoiding({
                id: group.avoidingMatches?.length! + 1,
                title: avoidingCreated.title,
                teams: [...updateTeams]
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

        if(avoiding.id) {
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
                        label="Avoiding matches title"
                        autoFocus
                        mode="outlined"
                        style={createStyles.inputGeneralCreate}
                    />
                )} />

            {
                errors.title && <Text variant="labelMedium"
                    style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 106 }}>
                    {errors.title.message}
                </Text>
            }

            <Text variant="labelLarge" style={{ marginVertical: Dimensions.get("window").height / 28 }}>
                Select teams:
            </Text>

            <ScrollView>
                {group.teams?.map((team) => (
                    <Checkbox.Item
                        key={team.id}
                        label={team.name!}
                        status={teamsAvoiding[team.id!] ? "checked" : "unchecked"}
                        onPress={() => toggleCheckbox(String(team.id))}
                    />
                ))}
            </ScrollView>

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleSubmit((data) => handleAddAvoiding(data))}>
                {
                    avoiding.id ? "UPDATE" : "ADD"
                }
            </Button>

            {
                avoiding.id && <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }} onPress={() => openSure(avoiding)}>
                    REMOVE
                </Button>
            }


        </ContainerBackground>
    );
};

export default FormCreateAvoiding
