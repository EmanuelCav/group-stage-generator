import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Text, IconButton, MD3Colors, Button } from "react-native-paper";

import ContainerBackground from "../general/ContainerBackground";

import { ICreate } from "@/interface/Team";
import { FormCreatePlayerPropsType } from "@/types/player.types";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { playerSchema } from "@/schema/player.schema";

const FormCreatePlayer = ({ colors, group, hideAndShowAddPlayer, createPlayer, player, updatePlayer, openSure }: FormCreatePlayerPropsType) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(playerSchema),
        defaultValues: {
            name: player.name ? player.name : ""
        }
    })

    const handleAddStadium = (playerCreated: ICreate) => {

        if (player.name) {
            updatePlayer({
                id: player.id,
                name: playerCreated.name
            })
        } else {
            createPlayer({
                id: group.players?.length as number + 1,
                name: playerCreated.name
            })

            reset()
        }

        hideAndShowAddPlayer(false)
    }

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowAddPlayer(false)}
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
                        style={createStyles.inputGeneralCreate}
                    />
                )} />

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={handleSubmit((data) => handleAddStadium(data))}>
                {
                    player.name ? "UPDATE" : "ADD"
                }
            </Button>

            {
                player.name && <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }} onPress={() => openSure(player)}>
                    REMOVE
                </Button>
            }


        </ContainerBackground>
    );
};

export default FormCreatePlayer
