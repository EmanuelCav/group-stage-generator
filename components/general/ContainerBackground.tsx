import { View } from "react-native"

import { generalStyles } from "../../styles/general.styles"

import { ContainerBackgroundPropsType } from "@/types/props.types"

const ContainerBackground = ({ children, zIndex }: ContainerBackgroundPropsType) => {
  return (
    <View style={[generalStyles.containerBackground, { zIndex }]}>
      <View style={generalStyles.cardBackground}>
        {children}
      </View>
    </View>
  )
}

export default ContainerBackground