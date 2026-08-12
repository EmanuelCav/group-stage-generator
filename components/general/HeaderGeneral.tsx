import { memo } from "react";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Appbar } from "react-native-paper";

import { HeaderGeneralPropsTypes } from "@/types/props.types";

const HeaderGeneral = memo(({ colors, title, goBack, isMatchdaysScreen, isEditMode, setIsEditMode }: HeaderGeneralPropsTypes) => {

    const navigation = useNavigation();

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={goBack} />
            <Appbar.Content title={title} color="#ffffff" />
            {
                isMatchdaysScreen && <Appbar.Action
                    icon={isEditMode ? "eye" : "square-edit-outline"}
                    color="#ffffff"
                    onPress={() => setIsEditMode!(!isEditMode)}
                />
            }
            <Appbar.Action
                icon="menu"
                color="#ffffff"
                onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer())
                }}
            />
        </Appbar.Header>
    )
})

export default HeaderGeneral;