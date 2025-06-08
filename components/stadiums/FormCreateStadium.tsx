import { Dimensions } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import Toast from 'react-native-toast-message';
import i18n from '@/i18n'

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateStadiumPropsType } from "@/types/stadiums.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { stadiumSchema } from "@/schema/stadium.schema";

const FormCreateStadium = ({ colors, group, hideAndShowAddStadium, createStadium, stadium, updateStadium, openSure }: FormCreateStadiumPropsType) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(stadiumSchema),
        defaultValues: {
            name: stadium.name ?? ""
        }
    })

    const handleAddStadium = (stadiumCreated: ICreate) => {

        if (group.stadiums!.find((s) => s.name === stadiumCreated.name)) {
            Toast.show({
                type: 'error',
                text1: "Stadium's name",
                text2: 'The name of the stadium already exists'
            });
            return
        }

        if (stadium.name) {
            updateStadium({
                id: stadium.id,
                name: stadiumCreated.name
            })
        } else {
            createStadium({
                id: group.referees?.length as number + 1,
                name: stadiumCreated.name
            })

            reset()
        }

        hideAndShowAddStadium(false)
    }

    return (
        <ContainerBackground zIndex={20}>

            <Toast />

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
                        style={createStyles.inputGeneralCreate}
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
