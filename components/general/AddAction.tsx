import { Button } from "react-native-paper"

import { View } from "../Themed"

import { AddActionPropsType } from "@/types/props.types"

import { createStyles } from "@/styles/create.styles"

const AddAction = ({ openForm, colors, text }: AddActionPropsType) => {

    return (
        <View style={createStyles.containerAddTeam}>
            <Button
                mode="contained"
                icon="plus-circle"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={() => openForm(true)}>
                {text}
            </Button>
        </View>
    )
}

export default AddAction