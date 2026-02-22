import React, { useMemo, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Card, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from '@/i18n'

import { View } from "../Themed";
import ContainerBackground from "../general/ContainerBackground";

import { FormCreateTeamPropsType } from "@/types/create.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { dataGroupNumber, dataPlots, generateId, teamValue } from "@/utils/defaultGroup";
import { normalizeUri, uploadImageToCloudinary } from "@/utils/cloudinary";

import { teamSchema } from "@/schema/team.schema";

const FormCreateTeam = ({ colors, hideAndShowAddTeam, createTeam, group, team, updateTeam, openSure, interstitial, isIntersitialLoaded, premium, spacing }: FormCreateTeamPropsType) => {

  const [plot, setPlot] = useState<string>(team.plot ? `${i18n.t("plot")} ${team.plot}` : `${i18n.t("plot")} 1`)
  const [groupNumber, setGroupNumber] = useState<string>(team.groupAssigned ? `${i18n.t("group.title")} ${team.groupAssigned}` : "")
  const [image, setImage] = useState<string>(team.logo ?? "")
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [picking, setPicking] = useState<boolean>(false)
  const [isFocusGroup, setIsFocusGroup] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(teamSchema),
    defaultValues: {
      name: team.name ?? ""
    }
  })

  const pickImage = async () => {

    if (!premium && group.teams.filter(t => t.logo).length >= 24) {
      Toast.show({
        type: 'error',
        text1: i18n.t("limit_images"),
        text2: i18n.t("limit_images_description")
      });
      return
    }

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
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.canceled && result.assets.length > 0) {
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

  const handleAddTeam = async (teamCreated: ICreate) => {

    if (!team.id) {

      if (group.teams.find((t) => (t.name === teamCreated.name))) {
        Toast.show({
          type: 'error',
          text1: i18n.t("errorTeamNameTitle"),
          text2: i18n.t("errorTeamNameDescription")
        });
        return
      }

      if (!premium && group.teams.length >= 48) {
        Toast.show({
          type: 'error',
          text1: i18n.t("errorLimitTitle"),
          text2: i18n.t("errorLimitDescription")
        });
        return
      }
    }

    setLoading(true)

    let imageUrl = image
    let timeLoading = 300

    if (image) {

      try {
        imageUrl = await uploadImageToCloudinary(image);
        timeLoading = 1200
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: i18n.t("errorUploadImageTitle"),
          text2: i18n.t("errorUploadImageDescription")
        });
        setLoading(false)
        return
      }
    }

    const plotSelected: number = isNaN(Number(plot)) ? Number(plot[plot.length - 1]) : Number(plot)
    const groupSelected: number = isNaN(Number(groupNumber)) ? Number(groupNumber[groupNumber.length - 1]) : Number(groupNumber)

    if (team.id) {
      updateTeam({
        id: team.id,
        group: team.group,
        groupAssigned: groupSelected,
        color: team.color,
        logo: imageUrl || "",
        name: teamCreated.name.trim(),
        plot: plotSelected
      })
    } else {
      createTeam(
        teamValue(
          generateId(), imageUrl || "", teamCreated.name.trim(), plotSelected, groupSelected === 0 ? undefined : groupSelected
        )
      )

      try {

        const storedCount = await AsyncStorage.getItem("reviewCount");
        const count = storedCount ? parseInt(storedCount, 10) : 0;

        if (interstitial) {
          if (group.teams.length !== 0) {
            if (group.teams.length === 1 || group.teams.length % 8 === 0) {
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
      setImage("")
    }

    setTimeout(() => {
      setLoading(false)
      hideAndShowAddTeam(false)
    }, timeLoading)
  }

  const plotsData = useMemo(
    () => dataPlots(group.teamsPerGroup!),
    [group.teamsPerGroup]
  )

  const groupsData = useMemo(
    () => dataGroupNumber(group.amountGroups!),
    [group.amountGroups]
  )

  return (
    <ContainerBackground zIndex={20}>

      <IconButton
        icon="close"
        style={generalStyles.buttonClose}
        iconColor={MD3Colors.error50}
        size={24}
        onPress={() => hideAndShowAddTeam(false)}
      />

      {image ? (
        <Card style={[createStyles.cardAddTeam, { backgroundColor: colors.tertiary }]} onPress={pickImage}>
          <Image source={{ uri: image }} style={createStyles.imageCard} />
        </Card>
      ) : (
        <TouchableOpacity onPress={pickImage} style={createStyles.cardShieldTeam}>
          <Text variant="labelLarge">
            {image ? i18n.t("teamForm.changeImage") : i18n.t("teamForm.selectShield")}
          </Text>
          <IconButton icon="shield-outline" iconColor={MD3Colors.neutral50} size={50} />
        </TouchableOpacity>
      )}

      {errors.name && (
        <Text variant="labelMedium" style={{ color: MD3Colors.error50 }}>
          {errors.name.message}
        </Text>
      )}

      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            onBlur={onBlur}
            label={i18n.t("teamForm.teamName")}
            mode="outlined"
            style={[createStyles.inputAdd, { backgroundColor: colors.tertiary }]}
            maxLength={25}
          />
        )}
      />

      {group.isManualConfiguration && (
        <View style={[createStyles.selectInputContain, { backgroundColor: colors.background, flexDirection: 'column' }]}>
          <Text variant="labelLarge">{i18n.t("teamForm.plotOptional")}</Text>
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
            data={plotsData}
            maxHeight={spacing.h5}
            labelField="label"
            valueField="value"
            placeholder={String(plot)}
            value={plot}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setPlot(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      )}

      {group.isManualConfiguration && (
        <View style={[createStyles.selectInputContain, { backgroundColor: colors.background, flexDirection: 'column' }]}>
          <Text variant="labelLarge">{i18n.t("teamForm.defineGroupOptional")}</Text>
          <Dropdown
            style={[
              createStyles.dropdownComplete,
              { backgroundColor: colors.tertiary },
              isFocusGroup && { borderColor: colors.primary },
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
            data={groupsData}
            maxHeight={spacing.h5}
            labelField="label"
            valueField="value"
            placeholder={String(groupNumber)}
            value={groupNumber}
            onFocus={() => setIsFocusGroup(true)}
            onBlur={() => setIsFocusGroup(false)}
            onChange={item => {
              setGroupNumber(item.value);
              setIsFocusGroup(false);
            }}
          />
        </View>
      )}

      <Button
        disabled={loading}
        loading={loading}
        mode="contained"
        style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
        labelStyle={{ color: "#ffffff" }}
        onPress={handleSubmit((data) => handleAddTeam(data))}
      >
        {team.id ? i18n.t("teamForm.update") : i18n.t("teamForm.add")}
      </Button>

      {team.id && !group.isGenerated && (
        <Button
          mode="contained"
          style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
          labelStyle={{ color: "#ffffff" }}
          onPress={() => openSure(team)}
        >
          {i18n.t("teamForm.remove")}
        </Button>
      )}
    </ContainerBackground>
  );
};

export default FormCreateTeam
