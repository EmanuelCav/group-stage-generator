import { useState } from "react"
import { Dimensions } from "react-native"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, IconButton, MD3Colors, Text, TextInput } from "react-native-paper"

import { FormStatisticsMatchPropsType } from "@/types/match.types"

import { View } from "../Themed"
import ContainerBackground from "../general/ContainerBackground"

import { ICreateStatistic } from "@/interface/Team";

import { generalStyles } from "@/styles/general.styles"
import { matchStyles } from "@/styles/match.styles"
import { createStyles } from "@/styles/create.styles"

import { statisticSchema } from "@/schema/statistic.schema";

const FormStatisticsMatch = ({ colors, hideAndShowStatistics, match, group, statistic }: FormStatisticsMatchPropsType) => {

    const [valueLocal, setValueLocal] = useState<string>(statistic.teamLocal?.value ? String(statistic.teamLocal.value) : "0")
    const [valueVisitant, setValueVisitant] = useState<string>(statistic.teamVisitant?.value ? String(statistic.teamVisitant.value) : "0")

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(statisticSchema),
        defaultValues: {
            title: statistic.title ? statistic.title : ""
        }
    })

    const handleAddStatistic = (data: ICreateStatistic) => {

    }

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowStatistics(false)}
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
                        label="Statistic title"
                        autoFocus
                        mode="outlined"
                        style={createStyles.inputGeneralCreate}
                    />
                )} />

            {
                errors.title?.message && <Text variant="labelMedium" 
                style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 106 }}>
                    {errors.title.message}
                </Text>
            }

            <Text variant="labelLarge" style={{ marginVertical: Dimensions.get("window").height / 74 }}>Statistic's Value</Text>

            <View style={matchStyles.scoreTeamForm}>
                <View style={matchStyles.teamForm}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} />
                    )}
                    <Text variant='bodyMedium' style={{ marginTop: Dimensions.get("window").height / 106 }}>
                        {match.local.team.name}
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setValueLocal(formattedText);
                    }}
                    value={valueLocal}
                    style={createStyles.inputNumberCreate}
                />
            </View>

            <View style={matchStyles.scoreTeamForm}>
                <View style={matchStyles.teamForm}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={32} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={32} />
                    )}
                    <Text variant='bodyMedium' style={{ marginTop: Dimensions.get("window").height / 106 }}>
                        {match.local.team.name}
                    </Text>
                </View>
                <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const formattedText = text.replace(/\D/g, '');
                        setValueVisitant(formattedText);
                    }}
                    value={valueVisitant}
                    style={createStyles.inputNumberCreate}
                />
            </View>

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleSubmit((data) => handleAddStatistic(data))}>
                CREATE
            </Button>
        </ContainerBackground>
    )
}

export default FormStatisticsMatch