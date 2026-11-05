import { useEffect, useState } from "react";
import { Dimensions, Keyboard, KeyboardEvent, Modal, ScrollView, View } from "react-native";
import { IconButton, MD3Colors, useTheme } from "react-native-paper";
import Toast from 'react-native-toast-message';

import { generalStyles } from "../../styles/general.styles";

import { ContainerBackgroundPropsType } from "@/types/props.types";

const ContainerBackground = ({ children, zIndex, onClose }: ContainerBackgroundPropsType) => {

  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const { colors } = useTheme();

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
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={[
        generalStyles.containerBackground,
        {
          zIndex,
          height: Dimensions.get("window").height - keyboardHeight,
          backgroundColor: "rgba(58, 64, 73, 0.5)"
        }
      ]}>
        <Toast />

        <View style={[generalStyles.cardBackground, { backgroundColor: colors.background, position: 'relative' }]}>
          <IconButton
            icon="close"
            iconColor={MD3Colors.error50}
            size={24}
            onPress={onClose}
            style={generalStyles.buttonClose}
          />
          <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ContainerBackground;