import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { MD3Colors, Switch, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import i18n from '@/i18n'

import { View } from "@/components/Themed";
import HeaderConfig from "@/components/config/HeaderConfig";
import SwitchSettings from "@/components/config/SwitchSettings";
import InputSettings from "@/components/config/InputSettings";
import SettingsButton from "@/components/config/SettingsButton";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import TieBreakCriteria from "@/components/config/TieBreakCriteria";
import AvoidingMatches from "@/components/config/AvoidingMatches";
import Sure from "@/components/general/Sure";
import ConfigButton from "@/components/config/ConfigButton";
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

    const [isManualConfiguration, setIsManuelConfiguration] = useState<boolean>(group.isManualConfiguration!)
    const [isPoints, setIsPoints] = useState<boolean>(group.isPoints!)

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
            teamsPerGroup: group.teamsPerGroup,
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
            eliminationMatches: group.eliminationMatches,
            isDrawed: group.isDrawed,
            isKnockoutGenerated: group.isKnockoutGenerated,
            title: data.title,
            logo: group.logo,
            matches: group.matches,
            teams: group.teams,
            pointsWin: data.pointsWin,
            pointsDraw: data.pointsDraw,
            pointsLoss: data.pointsLoss,
            isGenerated: group.isGenerated,
            isPoints,
            isRoundTripElimination: data.isRoundTripElimination,
            isRoundTripGroupStage: data.isRoundTripGroupStage,
            isManualConfiguration,
            avoidingMatches: group.avoidingMatches,
            isGeneratedAgain: group.isGeneratedAgain,
            players: group.players,
            referees: group.referees,
            stadiums: group.stadiums,
            tie_breakCriteria: group.tie_breakCriteria,
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

    const handleChangeAutomatize = (v: boolean) => {
        setIsManuelConfiguration(v)
    }

    const handleIsPoints = (v: boolean) => {
        setIsPoints(v)
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
            {isTieBreakCriteria && (
                <TieBreakCriteria initialData={initialData} setInitialData={setInitialData} />
            )}
            {isAvoidingMatches && (
                <AvoidingMatches
                    group={group}
                    colors={colors}
                    handleUpdateAvoiding={handleUpdateAvoiding}
                    openCreateAvoiding={openCreateAvoiding}
                    close={() => setIsAvoidingMatches(false)}
                />
            )}
            {isSure && (
                <Sure
                    func={handleRemoveAvoiding}
                    text={i18n.t('areYouSureDelete')}
                    close={close}
                    labelButton={i18n.t('remove')}
                />
            )}
            {showForm && (
                <FormCreateAvoiding
                    group={group}
                    colors={colors}
                    avoiding={avoiding}
                    openSure={openSure}
                    setTeamsAvoiding={setTeamsAvoiding}
                    hideAndShowAddAvoiding={hideAndShowAddAvoiding}
                    createAvoiding={createAvoiding!}
                    updateAvoiding={handleUpdate}
                    teamsAvoiding={teamsAvoiding}
                />
            )}
            {group.isGenerated ? (
                <HeaderGeneral
                    colors={colors}
                    router={router}
                    title={i18n.t('settings')}
                    goBack={goBack}
                    sureRemoveGroup={sureRemoveGroup}
                    sureRestartGroup={sureRestartGroup}
                />
            ) : (
                <HeaderConfig colors={colors} comeBack={comeBack} />
            )}

            <ScrollView style={configStyles.containerSettings}>
                {errors.title && (
                    <Text
                        variant="bodySmall"
                        style={{
                            color: MD3Colors.error50,
                            marginTop: Dimensions.get('window').height / 185,
                        }}
                    >
                        {errors.title.message}
                    </Text>
                )}

                <Controller
                    name="title"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            autoCapitalize="none"
                            onBlur={onBlur}
                            label={i18n.t('groupStageName')}
                            mode="outlined"
                            style={createStyles.inputAdd}
                        />
                    )}
                />

                <View style={configStyles.labelSettings}>
                    <Text variant="bodyLarge">{i18n.t('manuallyTitle')}</Text>
                    <Switch
                        style={{ marginTop: Dimensions.get('window').height / 192 }}
                        value={isManualConfiguration}
                        onValueChange={(v) => handleChangeAutomatize(v)}
                    />
                </View>

                {isManualConfiguration && (
                    <>
                        <InputSettings
                            text={i18n.t('numberOfGroups')}
                            name="amountGroups"
                            control={control}
                            error={errors.amountGroups?.message}
                            defaultValue={String(group.amountGroups)}
                        />
                        <InputSettings
                            text={i18n.t('teamsPerGroup')}
                            name="teamsPerGroup"
                            control={control}
                            error={errors.teamsPerGroup?.message}
                            defaultValue={String(group.teamsPerGroup)}
                        />
                        <InputSettings
                            text={i18n.t('numberOfClassifieds')}
                            name="amountClassified"
                            control={control}
                            error={errors.amountClassified?.message}
                            defaultValue={String(group.amountClassified)}
                        />
                    </>
                )}

                <View style={configStyles.labelSettings}>
                    <Text variant="bodyLarge">{i18n.t('showPoints')}</Text>
                    <Switch
                        style={{ marginTop: Dimensions.get('window').height / 192 }}
                        value={isPoints}
                        onValueChange={(v) => handleIsPoints(v)}
                    />
                </View>

                {isPoints && (
                    <>
                        <InputSettings
                            text={i18n.t('pointsToTheWinner')}
                            name="pointsWin"
                            control={control}
                            error={errors.pointsWin?.message}
                            defaultValue={String(group.pointsWin)}
                        />
                        <InputSettings
                            text={i18n.t('pointsToTie')}
                            name="pointsDraw"
                            control={control}
                            error={errors.pointsDraw?.message}
                            defaultValue={String(group.pointsDraw)}
                        />
                        <InputSettings
                            text={i18n.t('pointsToTheLoser')}
                            name="pointsLoss"
                            control={control}
                            error={errors.pointsLoss?.message}
                            defaultValue={String(group.pointsLoss)}
                        />
                    </>
                )}

                <SwitchSettings
                    text={i18n.t('roundTripGroupStage')}
                    name="isRoundTripGroupStage"
                    control={control}
                />
                <SwitchSettings
                    text={i18n.t('roundTripElimination')}
                    name="isRoundTripElimination"
                    control={control}
                />

                <ConfigButton
                    colors={colors}
                    text={i18n.t('tieBreakCriteria')}
                    func={() => setIsTieBreakCriteria(true)}
                />
                <ConfigButton
                    colors={colors}
                    text={i18n.t('avoidingMatches')}
                    func={() => setIsAvoidingMatches(true)}
                />
            </ScrollView>

            <SettingsButton
                colors={colors}
                handleSumbit={handleSubmit}
                handleConfig={handleConfig}
            />
        </View>
    );

};

export default Config;
