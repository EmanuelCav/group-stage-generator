import { Dimensions } from "react-native"
import { Button, MD3Colors, Text } from "react-native-paper"

import ContainerBackground from "./ContainerBackground"

import { generalStyles } from "@/styles/general.styles"

import { SurePropsType } from "@/types/props.types"

const Sure = ({ func, text, close, labelButton }: SurePropsType) => {
    return (
        <ContainerBackground zIndex={50} onClose={close}>
            <Text variant="titleSmall" style={{ marginTop: Dimensions.get("window").height / 24, textAlign: "center" }}>{text}</Text>
            <Button mode="contained" style={[{ backgroundColor: MD3Colors.error50 }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={func}>
                {labelButton}
            </Button>
        </ContainerBackground>
    )
}

export default Sure