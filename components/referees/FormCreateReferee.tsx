import { Dimensions } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";
import Toast from 'react-native-toast-message';
import i18n from '@/i18n'

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateRefereePropsType } from "@/types/referees.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { refereeSchema } from "@/schema/referee.schema";

const FormCreateReferee = ({ colors, group, hideAndShowAddReferee, createReferee, referee, updateReferee, openSure }: FormCreateRefereePropsType) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(refereeSchema),
        defaultValues: {
            name: referee.name ?? ""
        }
    })

    const handleAddReferee = (refereeCreated: ICreate) => {

        if (group.referees!.find((r) => r.name === refereeCreated.name)) {
            Toast.show({
                type: 'error',
                text1: i18n.t("referee.name.title"),
                text2: i18n.t("referee.name.existsError")
            });
            return
        }

        if (referee.name) {
            updateReferee({
                id: referee.id,
                name: refereeCreated.name
            })
        } else {
            createReferee({
                id: group.referees?.length as number + 1,
                name: refereeCreated.name
            })

            reset()
        }

        hideAndShowAddReferee(false)
    }

    return (
        <ContainerBackground zIndex={20}>

            <Toast />

            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowAddReferee(false)}
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
                        label={i18n.t("refereeName")}
                        mode="outlined"
                        style={createStyles.inputGeneralCreate}
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
                onPress={handleSubmit((data) => handleAddReferee(data))}
            >
                {referee.id ? i18n.t("update") : i18n.t("add")}
            </Button>

            {referee.id && (
                <Button
                    mode="contained"
                    style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(referee)}
                >
                    {i18n.t("remove")}
                </Button>
            )}

        </ContainerBackground>
    );
};

export default FormCreateReferee
