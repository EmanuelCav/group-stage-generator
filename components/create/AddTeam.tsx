import { Button, Text } from "react-native-paper"

import { View } from "../Themed"

import { AddTeamPropsType } from "@/types/create.types"

import { createStyles } from "@/styles/create.styles"

const AddTeam = ({ openForm, colors }: AddTeamPropsType) => {

    return (
        <View style={createStyles.containerAddTeam}>
            <Text variant="titleLarge" style={[createStyles.textHeader, { color: colors.primary }]}>Welcome!</Text>
            <Button
                mode="contained"
                icon="plus-circle"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={() => openForm(true)}>
                ADD TEAM
            </Button>
        </View>
    )
}

export default AddTeam