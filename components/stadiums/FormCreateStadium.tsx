import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateStadiumPropsType } from "@/types/stadiums.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { stadiumSchema } from "@/schema/stadium.schema";

const FormCreateStadium = ({ colors, hideAndShowAddStadium, createStadium, stadium, updateStadium, openSure }: FormCreateStadiumPropsType) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(stadiumSchema),
        defaultValues: {
            name: stadium.name ? stadium.name : ""
        }
    })

    const handleAddStadium = (stadiumCreated: ICreate) => {

        if (stadium.name) {
            updateStadium({
                name: stadiumCreated.name
            })
        } else {
            createStadium({
                name: stadiumCreated.name
            })

            reset()
        }

        hideAndShowAddStadium(false)
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
                        label="Stadium name"
                        autoFocus
                        mode="outlined"
                        style={createStyles.inputAdd}
                    />
                )} />

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleSubmit((data) => handleAddStadium(data))}>
                {
                    stadium.name ? "UPDATE" : "ADD"
                }
            </Button>

            {
                stadium.name && <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }} onPress={() => openSure(stadium)}>
                    REMOVE
                </Button>
            }


        </ContainerBackground>
    );
};

export default FormCreateStadium
