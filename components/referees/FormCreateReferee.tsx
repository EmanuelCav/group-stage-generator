import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";

import ContainerBackground from "../general/ContainerBackground";

import { FormCreateRefereePropsType } from "@/types/referees.types";
import { ICreate } from "@/interface/Team";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { refereeSchema } from "@/schema/referee.schema";

const FormCreateReferee = ({ colors, hideAndShowAddReferee, createReferee, referee, updateReferee, openSure }: FormCreateRefereePropsType) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(refereeSchema),
        defaultValues: {
            name: referee.name ? referee.name : ""
        }
    })

    const handleAddStadium = (stadiumCreated: ICreate) => {

        if (referee.name) {
            updateReferee({
                name: stadiumCreated.name
            })
        } else {
            createReferee({
                name: stadiumCreated.name
            })

            reset()
        }

        hideAndShowAddReferee(false)
    }

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowAddReferee(false)}
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
                        label="Referee name"
                        autoFocus
                        mode="outlined"
                        style={createStyles.inputAdd}
                    />
                )} />

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleSubmit((data) => handleAddStadium(data))}>
                {
                    referee.name ? "UPDATE" : "ADD"
                }
            </Button>

            {
                referee.name && <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }} onPress={() => openSure(referee)}>
                    REMOVE
                </Button>
            }


        </ContainerBackground>
    );
};

export default FormCreateReferee
