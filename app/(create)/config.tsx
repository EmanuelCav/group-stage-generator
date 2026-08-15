import { useEffect, useRef, useState } from "react";
import { Image, Platform, ScrollView, TouchableOpacity, KeyboardAvoidingView, View } from "react-native";
import { Card, IconButton, MD3Colors, Switch, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { ErrorToast } from 'react-native-toast-message';
import i18n from '@/i18n'

import HeaderConfig from "@/components/config/HeaderConfig";
import SwitchSettings from "@/components/config/SwitchSettings";
import InputSettings from "@/components/config/InputSettings";
import SettingsButton from "@/components/config/SettingsButton";
import MainScreen from "@/components/general/MainScreen";
import CustomDropdown from "@/components/general/CustomDropdown";

import { IGroup, ISetting } from "@/interface/Group";

import { configStyles } from "@/styles/config.styles";
import { createStyles } from "@/styles/create.styles";

import { useGroupStore } from "@/store/group.store";

import { normalizeUri, uploadImageToCloudinary } from "@/utils/cloudinary";
import { powerRange } from "@/utils/defaultGroup";

import { configSchema } from "@/schema/config.schema";

import { useSpacing } from "@/hooks/useSpacing";
import { useIsFullName } from "@/hooks/useIsFullName";

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
};

const ConfigScreen = () => {

  const scrollRef = useRef<ScrollView>(null);

  const { group, updateGroup } = useGroupStore()

  const { colors } = useTheme()

  const spacing = useSpacing()

  const [isManualConfiguration, setIsManuelConfiguration] = useState<boolean>(group.isManualConfiguration!)
  const [pointsModeSelected, setPointsSelected] = useState<string>(group.pointsMode!)
  const [image, setImage] = useState<string>(group.logo ?? "")
  const [loading, setLoading] = useState<boolean>(false)
  const [picking, setPicking] = useState<boolean>(false)
  const [isRoundTripElimination, setIsRoundTripElimination] = useState<boolean>(group.isRoundTripElimination!)
  const [isRoundTripGroupStage, setIsRoundTripGroupStage] = useState<boolean>(group.isRoundTripGroupStage!)
  const { isFullName, setIsFullName } = useIsFullName()

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

    if (picking) return;

    setPicking(true)

    try {

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Toast.show({
          type: 'error',
          text1: i18n.t("permissions.galleryAccess.title"),
          text2: i18n.t("permissions.galleryAccess.message")
        })
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: Platform.OS === 'ios',
        quality: 0.8
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const normalizedUri = await normalizeUri(result.assets[0].uri);
        setImage(normalizedUri);
      }

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t("permissions.galleryAccess.title"),
        text2: i18n.t("permissions.galleryAccess.message")
      });
    } finally {
      setPicking(false)
    }

  }

  const handleFocus = (y: number) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  }

  const handleConfig = async (data: ISetting) => {

    try {

      setLoading(true)

      let imageUrl = image

      if (image && image !== group.logo) {
        try {
          imageUrl = await uploadImageToCloudinary(image);
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
        user_id: group.user_id,
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
        amountClassified: group.teams.length >= 2 ? data.amountClassified > group.teams.length ? Math.pow(2, powerRange(group.teams.length >= 2 ? group.teams.length : 2)) : data.amountClassified : 2,
        teamsPerGroup: data.teamsPerGroup,
        matchdayNumber: "all",
        matchdayView: "all",
        createdAt: group.createdAt,
        updatedAt: new Date()
      }

      updateGroup!(updateData)

      router.back()

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const handleChangeAutomatize = (v: boolean) => {
    setIsManuelConfiguration(v)
  }

  const handleFullName = async (v: boolean) => {
    await AsyncStorage.setItem("isFullName", v ? "yes" : "no");
  }

  const comeBack = () => {
    router.back()
  }

  useEffect(() => {
    const checkPendingResult = async () => {

      try {

        const result = await ImagePicker.getPendingResultAsync();

        if (!result) return;

        if ('assets' in result && !result.canceled && result.assets && result.assets.length > 0) {
          const normalizedUri = await normalizeUri(result.assets[0].uri);
          setImage(normalizedUri);
        }

      } catch (e) {
        console.error("Error en pending result:", e);
      }
    };

    checkPendingResult();
  }, []);

  return (
    <MainScreen colors={colors}>

      <HeaderConfig colors={colors} comeBack={comeBack} />

      <Toast config={toastConfig} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
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
                marginTop: spacing.h185,
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
              style={{ marginTop: spacing.h192 }}
              value={isManualConfiguration}
              onValueChange={(v) => handleChangeAutomatize(v)}
            />
          </View>

          {isManualConfiguration && (
            <>
              <InputSettings
                handleFocus={handleFocus}
                colors={colors}
                text={i18n.t('numberOfGroups')}
                name="amountGroups"
                control={control}
                error={errors.amountGroups?.message}
                defaultValue={String(group.amountGroups)}
                spacing={spacing}
              />
              <InputSettings
                handleFocus={handleFocus}
                colors={colors}
                text={i18n.t('teamsPerGroup')}
                name="teamsPerGroup"
                control={control}
                error={errors.teamsPerGroup?.message}
                defaultValue={String(group.teamsPerGroup)}
                spacing={spacing}
              />
              <InputSettings
                handleFocus={handleFocus}
                colors={colors}
                text={i18n.t('numberOfClassifieds')}
                name="amountClassified"
                control={control}
                error={errors.amountClassified?.message}
                defaultValue={String(group.amountClassified)}
                spacing={spacing}
              />
            </>
          )}

          <View style={[createStyles.selectInputDropdownContain, { backgroundColor: colors.background }]}>
            <Text variant="labelLarge">{i18n.t("selectMode")}</Text>
            <CustomDropdown
              data={[{
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
              }]}
              value={pointsModeSelected}
              colors={colors}
              onChange={(item) => {
                setPointsSelected(item.value);
              }}
            />
          </View>

          {pointsModeSelected === "points" && (
            <>
              <InputSettings
                handleFocus={handleFocus}
                colors={colors}
                text={i18n.t('pointsToTheWinner')}
                name="pointsWin"
                control={control}
                error={errors.pointsWin?.message}
                defaultValue={String(group.pointsWin)}
                spacing={spacing}
              />
              <InputSettings
                handleFocus={handleFocus}
                colors={colors}
                text={i18n.t('pointsToTie')}
                name="pointsDraw"
                control={control}
                error={errors.pointsDraw?.message}
                defaultValue={String(group.pointsDraw)}
                spacing={spacing}
              />
              <InputSettings
                handleFocus={handleFocus}
                colors={colors}
                text={i18n.t('pointsToTheLoser')}
                name="pointsLoss"
                control={control}
                error={errors.pointsLoss?.message}
                defaultValue={String(group.pointsLoss)}
                spacing={spacing}
              />
            </>
          )}

          <SwitchSettings
            text={i18n.t('roundTripGroupStage')}
            value={isRoundTripGroupStage}
            setValue={setIsRoundTripGroupStage}
            colors={colors}
            spacing={spacing}
          />
          <SwitchSettings
            text={i18n.t('roundTripElimination')}
            value={isRoundTripElimination}
            setValue={setIsRoundTripElimination}
            colors={colors}
            spacing={spacing}
          />

          <View style={[configStyles.labelSettings, { backgroundColor: colors.background }]}>
            <Text variant="bodyLarge">{i18n.t("displayFullName")}</Text>
            <Switch
              style={{ marginTop: spacing.h192 }}
              value={isFullName}
              onValueChange={(v) => {
                setIsFullName(v)
                handleFullName(v)
              }}
            />
          </View>

        </ScrollView>

      </KeyboardAvoidingView>

      <SettingsButton
        colors={colors}
        loading={loading}
        handleSumbit={handleSubmit}
        handleConfig={handleConfig}
      />

    </MainScreen>
  );
}

export default ConfigScreen