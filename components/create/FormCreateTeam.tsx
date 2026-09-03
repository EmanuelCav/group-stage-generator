import React, { useEffect, useMemo, useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Card, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";

import ContainerBackground from "../general/ContainerBackground";
import CustomDropdown from "../general/CustomDropdown";

import { FormCreateTeamPropsType } from "@/types/create.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { dataGroupNumber, dataPlots, generateId, teamValue } from "@/utils/defaultGroup";
import { normalizeUri, updateImageLimit, uploadImageToCloudinary } from "@/utils/cloudinary";

import { teamSchema } from "@/schema/team.schema";

import { interstitialService } from "@/services/interstitialService";

const FormCreateTeam = ({ colors, hideAndShowAddTeam, createTeam, group, team, updateTeam, openSure, premium, t }: FormCreateTeamPropsType) => {

  const [plot, setPlot] = useState<number>(team.plot ?? 1)
  const [groupNumber, setGroupNumber] = useState<number>(team.groupAssigned ?? 0)
  const [image, setImage] = useState<string>(team.logo ?? "")
  const [picking, setPicking] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(teamSchema),
    defaultValues: {
      name: team.name ?? ""
    }
  })

  const pickImage = async () => {

    const image_limit = await AsyncStorage.getItem("image_limit_count");
    const image_limit_count = image_limit ? parseInt(image_limit, 10) : 0;

    if (!premium && image_limit_count >= 8) {
      Toast.show({
        type: 'error',
        text1: t("limit_images"),
        text2: t("limit_images_description")
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
          text1: t("permissions.galleryAccess.title"),
          text2: t("permissions.galleryAccess.message")
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
        text1: t("permissions.galleryAccess.title"),
        text2: t("permissions.galleryAccess.message")
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
          text1: t("errorTeamNameTitle"),
          text2: t("errorTeamNameDescription")
        });
        return
      }

      if (!premium && group.teams.length >= 48) {
        Toast.show({
          type: 'error',
          text1: t("errorLimitTitle"),
          text2: t("errorLimitDescription")
        });
        return
      }
    }

    try {

      setLoading(true)

      let imageUrl = image

      if (image && image !== team.logo) {

        try {
          imageUrl = await uploadImageToCloudinary(image);
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: t("errorUploadImageTitle"),
            text2: t("errorUploadImageDescription")
          });
          setLoading(false)
          return
        }
      }

      const groupSelected = groupNumber === 0 ? undefined : groupNumber

      if (team.id) {

        if (!team.logo && image) {
          await updateImageLimit(1)
        }

        updateTeam({
          id: team.id,
          group: team.group,
          groupAssigned: groupSelected,
          color: team.color,
          logo: imageUrl || "",
          name: teamCreated.name.trim(),
          plot
        })
      } else {
        createTeam(
          teamValue(
            generateId(), imageUrl || "", teamCreated.name.trim(), plot, groupSelected
          )
        )

        try {

          const storedCount = await AsyncStorage.getItem("reviewCount");
          const count = storedCount ? parseInt(storedCount, 10) : 0;

          if (group.teams.length !== 0) {
            if (group.teams.length === 1 || group.teams.length % 7 === 0) {
              if (interstitialService.isLoaded() && count > 3 && !premium) {
                interstitialService.show()
              }
            }
          }

        } catch (error) {
          console.log(error);
        }

        if (image) {
          await updateImageLimit(1);
        }

      }

      hideAndShowAddTeam(false)
      reset()
      setImage("")

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }

  }

  const plotsData = useMemo(
    () => dataPlots(group.teamsPerGroup!, t),
    [group.teamsPerGroup]
  )

  const groupsData = useMemo(
    () => dataGroupNumber(group.amountGroups!, t),
    [group.amountGroups]
  )

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
    <ContainerBackground zIndex={20} onClose={() => hideAndShowAddTeam(false)}>
      {image ? (
        <Card style={[createStyles.cardAddTeam, { backgroundColor: colors.tertiary }]} onPress={pickImage}>
          <Image source={{ uri: image }} style={createStyles.imageCard} />
        </Card>
      ) : (
        <TouchableOpacity onPress={pickImage} style={createStyles.cardShieldTeam}>
          <Text variant="labelLarge">
            {image ? t("teamForm.changeImage") : t("teamForm.selectShield")}
          </Text>
          <IconButton icon="shield-outline" iconColor={MD3Colors.neutral50} size={50} />
        </TouchableOpacity>
      )}

      {errors.name && (
        <Text variant="labelMedium" style={{ color: MD3Colors.error50 }}>
          {t(errors.name.message!, { defaultValue: errors.name.message })}
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
            label={t("teamForm.teamName")}
            mode="outlined"
            style={[createStyles.inputAdd, { backgroundColor: colors.tertiary }]}
            maxLength={25}
          />
        )}
      />

      {group.isManualConfiguration && (
        <View style={[createStyles.selectInputContain, { backgroundColor: colors.background, flexDirection: 'column' }]}>
          <Text variant="labelLarge">{t("teamForm.plotOptional")}</Text>
          <CustomDropdown
            data={plotsData}
            value={String(plot)}
            colors={colors}
            onChange={(item) => {
              setPlot(Number(item.value));
            }}
          />
        </View>
      )}

      {group.isManualConfiguration && (
        <View style={[createStyles.selectInputContain, { backgroundColor: colors.background, flexDirection: 'column' }]}>
          <Text variant="labelLarge">{t("teamForm.defineGroupOptional")}</Text>
          <CustomDropdown
            data={groupsData}
            value={String(groupNumber)}
            colors={colors}
            onChange={(item) => {
              setGroupNumber(Number(item.value));
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
        {team.id ? t("teamForm.update") : t("teamForm.add")}
      </Button>

      {team.id && !group.isGenerated && (
        <Button
          disabled={loading}
          mode="contained"
          style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
          labelStyle={{ color: "#ffffff" }}
          onPress={() => openSure(team)}
        >
          {t("teamForm.remove")}
        </Button>
      )}
    </ContainerBackground>
  );
};

export default FormCreateTeam
