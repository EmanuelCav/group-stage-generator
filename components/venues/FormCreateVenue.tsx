import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, MD3Colors, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateVenuePropsType } from "@/types/venues.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { venueSchema } from "@/schema/venue.schema";

import { generateId } from "@/utils/defaultGroup";

import { interstitialService } from "@/services/interstitialService";

const FormCreateVenue = ({ colors, group, hideAndShowAddVenue, createVenue, venue, updateVenue, openSure, premium, spacing, t }: FormCreateVenuePropsType) => {

    const [loading, setLoading] = useState<boolean>(false)

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(venueSchema),
        defaultValues: {
            name: venue.name ?? ""
        }
    })

    const handleAddVenue = async (venueCreated: ICreate) => {

        if (!venue.id) {

            if (group.stadiums!.find((s) => s.name === venueCreated.name)) {
                Toast.show({
                    type: 'error',
                    text1: t("stadium.name.title"),
                    text2: t("stadium.name.existsError")
                });
                return
            }

            if (!premium && group.stadiums?.length! >= 48) {
                Toast.show({
                    type: 'error',
                    text1: t("limit_stadiums"),
                    text2: t("limit_stadiums_description")
                });
                return
            }

        }

        try {

            setLoading(true)

            if (venue.id) {
                updateVenue({
                    id: venue.id,
                    name: venueCreated.name
                })
            } else {
                createVenue({
                    id: generateId(),
                    name: venueCreated.name
                })

                try {

                    const storedCount = await AsyncStorage.getItem("reviewCount");
                    const count = storedCount ? parseInt(storedCount, 10) : 0;

                    if (group.stadiums?.length !== 0) {
                        if (group.stadiums?.length === 1 || group.stadiums!.length % 8 === 0) {
                            if (interstitialService.isLoaded() && count > 3 && !premium) {
                                interstitialService.show()
                            }
                        }
                    }

                } catch (error) {
                    console.log(error);
                }

            }

            hideAndShowAddVenue(false)
            reset()

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <ContainerBackground zIndex={20} onClose={() => hideAndShowAddVenue(false)}>

            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        label={t("stadiumName")}
                        mode="outlined"
                        style={[createStyles.inputGeneralCreate, { backgroundColor: colors.tertiary }]}
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
                onPress={handleSubmit((data) => handleAddVenue(data))}
            >
                {venue.name ? t("update") : t("add")}
            </Button>

            {venue.name && (
                <Button
                    disabled={loading}
                    mode="contained"
                    style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }}
                    onPress={() => openSure(venue)}
                >
                    {t("remove")}
                </Button>
            )}

        </ContainerBackground>
    );
};

export default FormCreateVenue