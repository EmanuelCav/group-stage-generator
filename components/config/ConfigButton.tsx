import { Button, Text } from "react-native-paper"
import { View } from "../Themed"
import i18n from '@/i18n'

import { ConfigButtonPropsType } from "@/types/config.types"

import { generalStyles } from "@/styles/general.styles"
import { configStyles } from "@/styles/config.styles"

const ConfigButton = ({ text, colors, func }: ConfigButtonPropsType) => {
    return (
        <View style={configStyles.containerConfigButton}>
            <Text variant="bodyLarge">{text}</Text>
            <Button
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={func}
            >
                {i18n.t("general.setup")}
            </Button>
        </View>
    )
}

export default ConfigButton