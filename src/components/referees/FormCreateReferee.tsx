import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, MD3Colors, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateRefereePropsType } from "@/types/referees.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { refereeSchema } from "@/schema/referee.schema";

import { generateId } from "@/utils/defaultGroup";

import { interstitialService } from "@/services/interstitialService";

const FormCreateReferee = ({ colors, group, hideAndShowAddReferee, createReferee, referee, updateReferee, openSure, premium, spacing, t }: FormCreateRefereePropsType) => {

    const [loading, setLoading] = useState<boolean>(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(refereeSchema),
        defaultValues: {
            name: referee.name ?? ""
        }
    })

    const handleAddReferee = async (refereeCreated: ICreate) => {

        if (!referee.id) {

            if (group.referees!.find((r) => r.name === refereeCreated.name)) {
                Toast.show({
                    type: 'error',
                    text1: t("referee.name.title"),
                    text2: t("referee.name.existsError")
                });
                return
            }

            if (!premium && group.referees?.length! >= 15) {
                Toast.show({
                    type: 'error',
                    text1: t("limit_referees"),
                    text2: t("limit_referees_description")
                });
                return
            }

        }

        try {

            setLoading(true)

            if (referee.id) {
                updateReferee({
                    id: referee.id,
                    name: refereeCreated.name
                })
            } else {
                createReferee({
                    id: generateId(),
                    name: refereeCreated.name
                })

                try {

                    const storedCount = await AsyncStorage.getItem("reviewCount");
                    const count = storedCount ? parseInt(storedCount, 10) : 0;

                    if (group.referees?.length !== 0) {
                        if (group.referees?.length === 1 || group.referees!.length % 7 === 0) {
                            if (interstitialService.isLoaded() && count > 3 && !premium) {
                                interstitialService.show()
                            }
                        }
                    }

                } catch (error) {
                    console.log(error);
                }

            }

            hideAndShowAddReferee(false)
            reset()

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    return (
        <ContainerBackground zIndex={20} onClose={() => hideAndShowAddReferee(false)}>

            <Toast />

            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={t("refereeName")}
                        mode="outlined"
                        style={[createStyles.inputGeneralCreate,
                        { backgroundColor: colors.tertiary }]}
                        maxLength={30}
                    />
                )}
            />

            {errors.name && (
                <Text
                    variant="labelMedium"
                    style={{ color: MD3Colors.error50, marginTop: spacing.h106 }}
                >
                    {t(errors.name.message!, { defaultValue: errors.name.message })}
                </Text>
            )}

            <Button
                loading={loading}
                disabled={loading}
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleSubmit((data) => handleAddReferee(data))}
            >
                {referee.id ? t("update") : t("add")}
            </Button>

            {referee.id && (
                <Button
                    disabled={loading}
                    mode="contained"
                    style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(referee)}
                >
                    {t("remove")}
                </Button>
            )}

        </ContainerBackground>
    );
};

export default FormCreateReferee