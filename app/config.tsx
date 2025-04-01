import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { MD3Colors, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { View } from "@/components/Themed";
import HeaderConfig from "@/components/config/HeaderConfig";
import SwitchSettings from "@/components/config/SwitchSettings";
import InputSettings from "@/components/config/InputSettings";
import SettingsButton from "@/components/config/SettingsButton";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import ConfigButton from "@/components/config/ConfigButton";
import TieBreakCriteria from "@/components/config/TieBreakCriteria";
import AvoidingMatches from "@/components/config/AvoidingMatches";
import Sure from "@/components/general/Sure";
import FormCreateAvoiding from "@/components/config/FormCreateAvoiding";

import { IGroup, ISetting } from "@/interface/Group";
import { IAvoidingMatches } from "@/interface/Avoiding";

import { configStyles } from "@/styles/config.styles";
import { createStyles } from "@/styles/create.styles";

import { groupStore } from "@/store/group.store";
import { avoidingStore } from "@/store/avoiding.store";

import { configSchema } from "@/schema/config.schema";

const Config = () => {

    const { colors } = useTheme()
    const { group, updateGroup, sureRemoveGroup, sureRestartGroup, updateAvoiding, removeAvoiding, createAvoiding } = groupStore()
    const { avoiding, hideAndShowAddAvoiding, showForm, isSure, getAvoiding, sureRemoveAvoiding } = avoidingStore()

    const [initialData, setInitialData] = useState<{ label: string, id: string }[]>(
        [{ label: "points", id: "1" },
        { label: "difference", id: "2" },
        { label: "favor", id: "3" },
        { label: "won", id: "4" }])

    const [isAvoidingMatches, setIsAvoidingMatches] = useState<boolean>(false)
    const [isTieBreakCriteria, setIsTieBreakCriteria] = useState<boolean>(false)
    const [teamsAvoiding, setTeamsAvoiding] = useState<Record<string, boolean>>({})

    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(configSchema),
        defaultValues: {
            title: group.title,
            amountClassified: group.amountClassified,
            amountGroups: group.amountGroups,
            isRoundTripElimination: group.isRoundTripElimination,
            isRoundTripGroupStage: group.isRoundTripGroupStage,
            pointsWin: group.pointsWin,
            pointsDraw: group.pointsDraw,
            pointsLoss: group.pointsLoss
        }
    })

    const handleUpdate = (data: IAvoidingMatches) => {
        updateAvoiding!(data)
        getAvoiding({})
    }

    const handleUpdateAvoiding = (data: IAvoidingMatches) => {
        getAvoiding(data)
        hideAndShowAddAvoiding(true)
    }

    const openSure = (data: IAvoidingMatches) => {
        getAvoiding(data)
        sureRemoveAvoiding(true)
    }

    const handleRemoveAvoiding = () => {
        sureRemoveAvoiding(false)
        hideAndShowAddAvoiding(false)
        removeAvoiding(avoiding)
        getAvoiding({})
    }

    const close = () => {
        sureRemoveAvoiding(false)
    }

    const openCreateAvoiding = () => {
        getAvoiding({})
        hideAndShowAddAvoiding(true)
    }

    const handleConfig = (data: ISetting) => {

        const updateData: IGroup = {
            id: group.id,
            title: data.title,
            logo: group.logo,
            matches: group.matches,
            teams: group.teams,
            pointsWin: data.pointsWin,
            pointsDraw: data.pointsDraw,
            pointsLoss: data.pointsLoss,
            isGenerated: group.isGenerated,
            isRoundTripElimination: data.isRoundTripElimination,
            isRoundTripGroupStage: data.isRoundTripGroupStage,
            amountGroups: data.amountGroups,
            amountClassified: data.amountClassified,
            teamsPerGroup: data.teamsPerGroup,
            createdAt: group.createdAt,
            updatedAt: new Date()
        }

        updateGroup!(updateData)

        if (group.isGenerated) {
            router.replace("/(tabs)/matchdays")
        } else {
            router.replace("/create")
        }
    }

    const comeBack = () => {
        if (group.isGenerated) {
            router.replace("/(tabs)/matchdays")
        } else {
            router.replace("/create")
        }
    }

    const goBack = () => {
        router.replace("/(tabs)/groups")
    }

    useEffect(() => {
        hideAndShowAddAvoiding(false)
        sureRemoveAvoiding(false)
        setIsTieBreakCriteria(false)
        setIsAvoidingMatches(false)
        getAvoiding({})
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {
                isTieBreakCriteria && <TieBreakCriteria initialData={initialData} setInitialData={setInitialData} />
            }
            {
                isAvoidingMatches && <AvoidingMatches group={group} colors={colors} handleUpdateAvoiding={handleUpdateAvoiding}
                openCreateAvoiding={openCreateAvoiding} close={() => setIsAvoidingMatches(false)} />
            }
            {
                isSure && <Sure func={handleRemoveAvoiding} text="Are you sure you want to delete?" close={close} labelButton="REMOVE" />
            }
            {
                showForm && <FormCreateAvoiding group={group} colors={colors} avoiding={avoiding} openSure={openSure} setTeamsAvoiding={setTeamsAvoiding}
                    hideAndShowAddAvoiding={hideAndShowAddAvoiding} createAvoiding={createAvoiding!} updateAvoiding={handleUpdate} teamsAvoiding={teamsAvoiding} />
            }
            {
                group.isGenerated ? <HeaderGeneral colors={colors} router={router} title="Settings" goBack={goBack}
                    sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
                    : <HeaderConfig colors={colors} comeBack={comeBack} />
            }
            <ScrollView style={configStyles.containerSettings}>
                {errors.title && <Text variant='bodySmall'
                    style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 185 }}>
                    {errors.title.message}
                </Text>
                }
                <Controller
                    name="title"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            autoCapitalize="none"
                            onBlur={onBlur}
                            label="Group Stage name"
                            autoFocus
                            mode="outlined"
                            style={createStyles.inputAdd}
                        />
                    )} />
                <SwitchSettings text="Round trip in the group stage" name="isRoundTripGroupStage" control={control} />
                <SwitchSettings text="Round trip in the elimination phase" name="isRoundTripElimination" control={control} />
                <InputSettings text="Number of groups" name="amountGroups" control={control} error={errors.amountGroups?.message} />
                <InputSettings text="Number of teams per group" name="teamsPerGroup" control={control} error={errors.teamsPerGroup?.message} />
                <InputSettings text="Number of classifieds" name="amountClassified" control={control} error={errors.amountClassified?.message} />
                <InputSettings text="Points to the winner" name="pointsWin" control={control} error={errors.pointsWin?.message} />
                <InputSettings text="Points to tie" name="pointsDraw" control={control} error={errors.pointsDraw?.message} />
                <InputSettings text="Points to the loser" name="pointsLoss" control={control} error={errors.pointsLoss?.message} />
                <ConfigButton colors={colors} text="Tie-break criteria" func={() => setIsTieBreakCriteria(true)} />
                <ConfigButton colors={colors} text="Avoiding matches" func={() => setIsAvoidingMatches(true)} />
            </ScrollView>
            <SettingsButton colors={colors} handleSumbit={handleSubmit} handleConfig={handleConfig} />
        </View>
    );
};

export default Config;
