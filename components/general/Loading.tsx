import { Dimensions } from "react-native"
import { ActivityIndicator, Text, useTheme } from "react-native-paper"

import { View } from "../Themed"

import { generalStyles } from "@/styles/general.styles"

const Loading = ({ text }: { text: string }) => {

  const { colors } = useTheme()

  return (
    <View style={generalStyles.containerLoading}>
      <ActivityIndicator animating={true} color={colors.primary} size="large" />
      <Text variant="bodyLarge" style={{ color: colors.primary, marginTop: Dimensions.get("window").height / 41 }}>
        {text}
      </Text>
    </View>
  )
}

export default Loading