import React, { useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Card, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import i18n from '@/i18n'

import { View } from "../Themed";
import ContainerBackground from "../general/ContainerBackground";

import { FormCreateTeamPropsType } from "@/types/create.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { dataPlots, teamValue } from "@/utils/defaultGroup";
import { uploadImageToCloudinary } from "@/utils/cloudinary";

import { teamSchema } from "@/schema/team.schema";

const FormCreateTeam = ({ colors, hideAndShowAddTeam, createTeam, group, team, updateTeam, openSure }: FormCreateTeamPropsType) => {

  const [plot, setPlot] = useState<string>(team.plot ? `${i18n.t("plot")} ${team.plot}` : `${i18n.t("plot")} 1`)
  const [image, setImage] = useState<string>(team.logo ?? "")
  const [isFocus, setIsFocus] = useState<boolean>(false)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(teamSchema),
    defaultValues: {
      name: team.name ?? ""
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
  };


  const handleAddTeam = async (teamCreated: ICreate) => {

    if (group.teams.find((t) => t.name === teamCreated.name)) {
      Toast.show({
        type: 'error',
        text1: "Team's name",
        text2: 'The name of the team already exists'
      });
      return
    }

    let imageUrl = image

    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    if (team.id) {
      updateTeam({
        id: team.id,
        group: team.group,
        logo: imageUrl || "",
        name: teamCreated.name.trim(),
        plot: Number(plot[plot.length - 1])
      })
    } else {
      createTeam(
        teamValue(
          group.teams.length + 1, imageUrl || "", teamCreated.name.trim(), Number(plot[plot.length - 1])
        )
      )
      reset()
      setImage("")
    }

    hideAndShowAddTeam(false)
  }

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
        <Card style={createStyles.cardAddTeam} onPress={pickImage}>
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
            style={createStyles.inputAdd}
            maxLength={25}
          />
        )}
      />

      {group.isManualConfiguration && (
        <View style={createStyles.selectInputContain}>
          <Text variant="labelLarge">{i18n.t("teamForm.plotOptional")}</Text>
          <Dropdown
            style={[createStyles.dropdown, isFocus && { borderColor: colors.primary }]}
            placeholderStyle={{ fontSize: Dimensions.get("window").height / 47 }}
            selectedTextStyle={{ fontSize: Dimensions.get("window").height / 47 }}
            data={dataPlots(group.teamsPerGroup!)}
            maxHeight={Dimensions.get("window").height / 5}
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

      <Button
        mode="contained"
        style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
        labelStyle={{ color: "#ffffff" }}
        onPress={handleSubmit((data) => handleAddTeam(data))}
      >
        {team.id ? i18n.t("teamForm.update") : i18n.t("teamForm.add")}
      </Button>

      {team.id && group.isGeneratedAgain && (
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
