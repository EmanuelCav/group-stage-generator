import React, { useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Card, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';

import { View } from "../Themed";
import ContainerBackground from "../general/ContainerBackground";

import { FormCreateTeamPropsType } from "@/types/create.types";
import { ICreateTeam } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { dataPlots, teamValue } from "@/utils/defaultGroup";

import { teamSchema } from "@/schema/team.schema";

const FormCreateTeam = ({ colors, hideAndShowAddTeam, createTeam, group, team, updateTeam, openSure }: FormCreateTeamPropsType) => {

  const [plot, setPlot] = useState<string>(team.plot ? `Plot ${team.plot}` : `Plot 1`)
  const [image, setImage] = useState<string | null>(team.logo ? team.logo : null)
  const [isFocus, setIsFocus] = useState<boolean>(false)

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(teamSchema),
    defaultValues: {
      name: team.name ? team.name : ""
    }
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }

  }

  const handleAddTeam = (teamCreated: ICreateTeam) => {

    if (team.id) {
      updateTeam({
        id: team.id,
        group: team.group,
        logo: image ? image : "",
        name: teamCreated.name.trim(),
        plot: Number(plot[plot.length - 1]),
        points: team.points
      })
    } else {
      createTeam(
        teamValue(
          group.teams.length + 1, image ? image : "", teamCreated.name.trim(), Number(plot[plot.length - 1])
        )
      )
      reset()
      setImage(null)
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
      {
        image ? <Card style={createStyles.cardAddTeam}>
          <Image source={{ uri: image }} style={createStyles.imageCard} />
        </Card>
          : <TouchableOpacity onPress={pickImage} style={createStyles.cardShieldTeam}>
            <Text variant="labelLarge">
              {image ? "Change image" : "Select a shield (optional)"}
            </Text>
            <IconButton
              icon="shield-outline"
              iconColor={MD3Colors.neutral50}
              size={50}
            />
          </TouchableOpacity>
      }
      {
        errors.name && <Text variant="labelMedium" style={{ color: MD3Colors.error50 }}>
          {errors.name.message}
        </Text>
      }
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            onBlur={onBlur}
            label="Team name"
            autoFocus
            mode="outlined"
            style={createStyles.inputAdd}
          />
        )} />
      <View style={createStyles.selectInputContain}>
        <Text variant="labelLarge">Plot (optional):</Text>
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
            setPlot(item.value)
            setIsFocus(false)
          }}
        />
      </View>

      <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
        labelStyle={{ color: "#ffffff" }} onPress={handleSubmit((data) => handleAddTeam(data))}>
        {
          team.id ? "UPDATE" : "ADD"
        }
      </Button>

      {
        team.id && <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
          labelStyle={{ color: "#ffffff" }} onPress={() => openSure(team)}>
          REMOVE
        </Button>
      }


    </ContainerBackground>
  );
};

export default FormCreateTeam
