import { View, Keyboard, KeyboardEvent, Dimensions, ScrollView } from "react-native"
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import Toast from 'react-native-toast-message';

import { generalStyles } from "../../styles/general.styles"

import { ContainerBackgroundPropsType } from "@/types/props.types"

const ContainerBackground = ({ children, zIndex }: ContainerBackgroundPropsType) => {

  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const { colors } = useTheme()

  useEffect(() => {
    const onKeyboardDidShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onKeyboardDidHide = () => {
      setKeyboardHeight(0);
    };

    const showSubscription = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  return (
    <View style={[generalStyles.containerBackground,
    {
      zIndex, height: Dimensions.get("window").height - keyboardHeight,
      backgroundColor: "rgba(58, 64, 73, 0.5)"
    }]}>
      <Toast />
      <ScrollView style={[generalStyles.cardBackground,
      { backgroundColor: colors.background }]}>
        {children}
      </ScrollView>
    </View>
  )
}

export default ContainerBackground