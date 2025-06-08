import { View, Keyboard, KeyboardEvent, Dimensions, ScrollView } from "react-native"
import { useEffect, useState } from "react";

import { generalStyles } from "../../styles/general.styles"

import { ContainerBackgroundPropsType } from "@/types/props.types"

const ContainerBackground = ({ children, zIndex }: ContainerBackgroundPropsType) => {

  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
    { zIndex, height: Dimensions.get("window").height - keyboardHeight }]}>
      <ScrollView style={generalStyles.cardBackground}>
        {children}
      </ScrollView>
    </View>
  )
}

export default ContainerBackground