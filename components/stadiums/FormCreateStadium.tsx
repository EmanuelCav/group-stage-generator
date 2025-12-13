import { useState } from "react";
import { Dimensions } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import i18n from '@/i18n'

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateStadiumPropsType } from "@/types/stadiums.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { stadiumSchema } from "@/schema/stadium.schema";

import { generateId } from "@/utils/defaultGroup";

const FormCreateStadium = ({ colors, group, hideAndShowAddStadium, createStadium, stadium, updateStadium, openSure, interstitial, isIntersitialLoaded, premium }: FormCreateStadiumPropsType) => {

    const [loading, setLoading] = useState<boolean>(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(stadiumSchema),
        defaultValues: {
            name: stadium.name ?? ""
        }
    })

    const handleAddStadium = async (stadiumCreated: ICreate) => {

        if (!stadium.id) {

            if (group.stadiums!.find((s) => s.name === stadiumCreated.name)) {
                Toast.show({
                    type: 'error',
                    text1: i18n.t("stadium.name.title"),
                    text2: i18n.t("stadium.name.existsError")
                });
                return
            }

            if (!premium && group.stadiums?.length! >= 48) {
                Toast.show({
                    type: 'error',
                    text1: i18n.t("limit_stadiums"),
                    text2: i18n.t("limit_stadiums_description")
                });
                return
            }

        }

        setLoading(true)

        if (stadium.id) {
            updateStadium({
                id: stadium.id,
                name: stadiumCreated.name
            })
        } else {
            createStadium({
                id: generateId(),
                name: stadiumCreated.name
            })

            try {

                const storedCount = await AsyncStorage.getItem("reviewCount");
                const count = storedCount ? parseInt(storedCount, 10) : 0;

                if (group.stadiums?.length !== 0) {
                    if (group.stadiums?.length === 1 || group.stadiums!.length % 8 === 0) {
                        if ((interstitial.loaded || isIntersitialLoaded) && count > 3 && !premium) {
                            interstitial.show()
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }

            reset()
        }

        setTimeout(() => {
            hideAndShowAddStadium(false)
            setLoading(false)
        }, 300)
    }

    return (
        <ContainerBackground zIndex={20}>

            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowAddStadium(false)}
            />
            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={i18n.t("stadiumName")}
                        mode="outlined"
                        style={[createStyles.inputGeneralCreate, { backgroundColor: colors.tertiary }]}
                        maxLength={30}
                    />
                )}
            />

            {errors.name && (
                <Text
                    variant="labelMedium"
                    style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 106 }}
                >
                    {errors.name.message}
                </Text>
            )}

            <Button
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleSubmit((data) => handleAddStadium(data))}
            >
                {stadium.name ? i18n.t("update") : i18n.t("add")}
            </Button>

            {stadium.name && (
                <Button
                    loading={loading}
                    disabled={loading}
                    mode="contained"
                    style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(stadium)}
                >
                    {i18n.t("remove")}
                </Button>
            )}

        </ContainerBackground>
    );
};

export default FormCreateStadium
