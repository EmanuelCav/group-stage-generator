import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card, IconButton, MD3Colors, Switch, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from 'react-native-element-dropdown';
import Toast, { ErrorToast } from 'react-native-toast-message';
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
import MainScreen from "@/components/general/MainScreen";
import FormCreateAvoiding from "@/components/config/FormCreateAvoiding";
import SureGeneral from "@/components/general/SureGeneral";

import { IGroup, ISetting } from "@/interface/Group";
import { IAvoidingMatches } from "@/interface/Avoiding";

import { configStyles } from "@/styles/config.styles";
import { createStyles } from "@/styles/create.styles";

import { groupStore } from "@/store/group.store";
import { avoidingStore } from "@/store/avoiding.store";

import { configSchema } from "@/schema/config.schema";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { powerRange } from "@/utils/defaultGroup";

const modeData = [{
    value: "points",
    label: i18n.t("points_earned")
}, {
    value: "percentage",
    label: i18n.t("win_percentage")
}, {
    value: "wins",
    label: i18n.t("number_of_wins")
}, {
    value: "scored",
    label: i18n.t("points_scored")
}]

const toastConfig = {
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1NumberOfLines={1}
            text2NumberOfLines={3}
        />
    ),
};

const Config = () => {

    const { colors } = useTheme()
    const { group, updateGroup, sureRemoveGroup, sureRestartGroup, updateAvoiding, removeAvoiding, createAvoiding } = groupStore()
    const { avoiding, hideAndShowAddAvoiding, showForm, isSure, getAvoiding, sureRemoveAvoiding } = avoidingStore()

    const [isManualConfiguration, setIsManuelConfiguration] = useState<boolean>(group.isManualConfiguration!)
    const [pointsModeSelected, setPointsSelected] = useState<string>(group.pointsMode!)
    const [image, setImage] = useState<string>(group.logo ?? "")
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isRoundTripElimination, setIsRoundTripElimination] = useState<boolean>(group.isRoundTripElimination!)
    const [isRoundTripGroupStage, setIsRoundTripGroupStage] = useState<boolean>(group.isRoundTripGroupStage!)

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
            title: group.title as string,
            amountClassified: group.amountClassified as number,
            teamsPerGroup: group.teamsPerGroup as number,
            amountGroups: group.amountGroups as number,
            pointsWin: group.pointsWin as number,
            pointsDraw: group.pointsDraw as number,
            pointsLoss: group.pointsLoss as number
        }
    })

    const pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Toast.show({
                type: 'error',
                text1: i18n.t("permissions.galleryAccess.title"),
                text2: i18n.t("permissions.galleryAccess.message")
            });
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

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

    const handleConfig = async (data: ISetting) => {

        setLoading(true)

        let imageUrl = image
        let timeLoading = 500

        if (image) {
            try {
                imageUrl = await uploadImageToCloudinary(image);
                timeLoading = 1800
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: i18n.t("errorUploadImageTitle"),
                    text2: i18n.t("errorUploadImageDescription")
                });
            }
        }

        const updateData: IGroup = {
            id: group.id,
            eliminationMatches: group.eliminationMatches,
            isDrawed: group.isDrawed,
            isKnockoutGenerated: group.isKnockoutGenerated,
            title: data.title,
            logo: imageUrl || "",
            matches: group.matches,
            teams: (group.amountGroups !== data.amountGroups || group.teamsPerGroup !== data.teamsPerGroup) ? group.teams.map(t => ({ ...t, groupAssigned: undefined })) : group.teams,
            pointsWin: data.pointsWin,
            pointsDraw: data.pointsDraw,
            pointsLoss: data.pointsLoss,
            isGenerated: group.isGenerated,
            pointsMode: pointsModeSelected,
            isRoundTripElimination: isRoundTripElimination,
            isRoundTripGroupStage: isRoundTripGroupStage,
            isManualConfiguration,
            avoidingMatches: group.avoidingMatches,
            isGeneratedAgain: group.isGeneratedAgain,
            players: group.players,
            referees: group.referees,
            stadiums: group.stadiums,
            tie_breakCriteria: group.tie_breakCriteria,
            amountGroups: data.amountGroups,
            isGroupStageEliminationDrawed: group.isGroupStageEliminationDrawed,
            amountClassified: data.amountClassified > group.teams.length ? Math.pow(2, powerRange(group.teams.length >= 2 ? group.teams.length : 2)) : data.amountClassified,
            teamsPerGroup: data.teamsPerGroup,
            matchdayNumber: "all",
            matchdayView: "all",
            createdAt: group.createdAt,
            updatedAt: new Date()
        }

        updateGroup!(updateData)

        setTimeout(() => {
            if (group.isGenerated) {
                router.replace("/(tabs)/matchdays")
            } else {
                router.replace("/create")
            }

            setLoading(false)
        }, timeLoading)
    }

    const handleChangeAutomatize = (v: boolean) => {
        setIsManuelConfiguration(v)
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
        <MainScreen colors={colors}>

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

            <SureGeneral />

            <Toast config={toastConfig} />

            <ScrollView style={configStyles.containerSettings}>

                {image ? (
                    <Card style={[createStyles.cardAddTeam, { backgroundColor: colors.tertiary }]} onPress={pickImage}>
                        <Image source={{ uri: image }} style={createStyles.imageCard} />
                    </Card>
                ) : (
                    <TouchableOpacity onPress={pickImage} style={createStyles.cardShieldTeam}>
                        <Text variant="labelLarge">
                            {image ? i18n.t("teamForm.changeImage") : i18n.t("teamForm.selectLogo")}
                        </Text>
                        <IconButton icon="shield-outline" iconColor={MD3Colors.neutral50} size={50} />
                    </TouchableOpacity>
                )}

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
                            maxLength={20}
                            style={[createStyles.inputAdd, { backgroundColor: colors.tertiary }]}
                        />
                    )}
                />

                <View style={[configStyles.labelSettings, { backgroundColor: colors.background }]}>
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
                            colors={colors}
                            text={i18n.t('numberOfGroups')}
                            name="amountGroups"
                            control={control}
                            error={errors.amountGroups?.message}
                            defaultValue={String(group.amountGroups)}
                        />
                        <InputSettings
                            colors={colors}
                            text={i18n.t('teamsPerGroup')}
                            name="teamsPerGroup"
                            control={control}
                            error={errors.teamsPerGroup?.message}
                            defaultValue={String(group.teamsPerGroup)}
                        />
                        <InputSettings
                            colors={colors}
                            text={i18n.t('numberOfClassifieds')}
                            name="amountClassified"
                            control={control}
                            error={errors.amountClassified?.message}
                            defaultValue={String(group.amountClassified)}
                        />
                    </>
                )}

                <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
                    <Text variant="labelLarge">{i18n.t("selectMode")}</Text>
                    <Dropdown
                        style={[
                            createStyles.dropdownComplete,
                            { backgroundColor: colors.tertiary },
                            isFocus && { borderColor: colors.primary },
                        ]}
                        placeholderStyle={{
                            fontSize: Dimensions.get("window").height / 47,
                            color: colors.surface,
                            backgroundColor: colors.tertiary
                        }}
                        selectedTextStyle={{
                            fontSize: Dimensions.get("window").height / 47,
                            color: colors.surface,
                            backgroundColor: colors.tertiary
                        }}
                        itemTextStyle={{
                            color: colors.surface
                        }}
                        containerStyle={{
                            backgroundColor: colors.tertiary,
                        }}
                        data={modeData}
                        maxHeight={Dimensions.get("window").height / 3.8}
                        labelField="label"
                        valueField="value"
                        placeholder={String(pointsModeSelected)}
                        value={pointsModeSelected}
                        activeColor={colors.primary}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setPointsSelected(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>

                {pointsModeSelected === "points" && (
                    <>
                        <InputSettings
                            colors={colors}
                            text={i18n.t('pointsToTheWinner')}
                            name="pointsWin"
                            control={control}
                            error={errors.pointsWin?.message}
                            defaultValue={String(group.pointsWin)}
                        />
                        <InputSettings
                            colors={colors}
                            text={i18n.t('pointsToTie')}
                            name="pointsDraw"
                            control={control}
                            error={errors.pointsDraw?.message}
                            defaultValue={String(group.pointsDraw)}
                        />
                        <InputSettings
                            colors={colors}
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
                    value={isRoundTripGroupStage}
                    setValue={setIsRoundTripGroupStage}
                    colors={colors}
                />
                <SwitchSettings
                    text={i18n.t('roundTripElimination')}
                    value={isRoundTripElimination}
                    setValue={setIsRoundTripElimination}
                    colors={colors}
                />

                {/* <ConfigButton
                    colors={colors}
                    text={i18n.t('tieBreakCriteria')}
                    func={() => setIsTieBreakCriteria(true)}
                />
                <ConfigButton
                    colors={colors}
                    text={i18n.t('avoidingMatches')}
                    func={() => setIsAvoidingMatches(true)}
                /> */}
            </ScrollView>

            <SettingsButton
                colors={colors}
                loading={loading}
                handleSumbit={handleSubmit}
                handleConfig={handleConfig}
            />
        </MainScreen>
    );
};

export default Config;
