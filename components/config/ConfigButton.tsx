import { Button } from "react-native-paper"
import { Text, View } from "../Themed"

import { ConfigButtonPropsType } from "@/types/config.types"

import { generalStyles } from "@/styles/general.styles"
import { configStyles } from "@/styles/config.styles"

const ConfigButton = ({ text, colors }: ConfigButtonPropsType) => {
    return (
        <View style={configStyles.containerConfigButton}>
            <Text>{text}</Text>
            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}>
                APPLY CHANGES
            </Button>
        </View>
    )
}

export default ConfigButton