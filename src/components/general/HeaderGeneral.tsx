import { memo } from "react";
import { DrawerActions } from "expo-router/react-navigation";
import { useNavigation } from "expo-router";
import { Appbar } from "react-native-paper";

import { HeaderGeneralPropsTypes } from "@/types/props.types";

const HeaderGeneral = memo(({ colors, title, goBack, isMatchdaysScreen, isEditMode, setIsEditMode, isCalendarMode, setIsCalendarMode, isCalendar }: HeaderGeneralPropsTypes) => {

    const navigation = useNavigation();

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={goBack} />
            <Appbar.Content title={title} color="#ffffff" />

            {
                isCalendar && <Appbar.Action
                    icon={isCalendarMode ? "calendar-multiple" : "calendar-month"}
                    color="#ffffff"
                    onPress={() => {
                        setIsEditMode!(false)
                        setIsCalendarMode!(!isCalendarMode)
                    }}
                />
            }

            {
                isMatchdaysScreen && <Appbar.Action
                    icon={isEditMode ? "eye" : "square-edit-outline"}
                    color="#ffffff"
                    onPress={() => {
                        setIsEditMode!(!isEditMode)
                        if (isCalendar) {
                            setIsCalendarMode!(false)
                        }
                    }}
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