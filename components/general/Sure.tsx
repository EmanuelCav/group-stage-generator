import { Dimensions } from "react-native"
import { Button, IconButton, MD3Colors, Text } from "react-native-paper"

import ContainerBackground from "./ContainerBackground"

import { generalStyles } from "@/styles/general.styles"

import { SurePropsType } from "@/types/props.types"

const Sure = ({ func, text, close }: SurePropsType) => {
    return (
        <ContainerBackground zIndex={50}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={close}
            />
            <Text variant="titleSmall" style={{ marginTop: Dimensions.get("window").height / 24 }}>{text}</Text>
            <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={func}>
                REMOVE
            </Button>
        </ContainerBackground>
    )
}

export default Sure