import { Router } from "expo-router";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export type HeaderSettingsPropsType = {
    colors: MD3Colors;
    router: Router;
}

export type ListItemSwitchPropsType = {
    colors: MD3Colors;
    value: boolean;
    setValue: (value: boolean) => void;
    iconName: any;
    title: string;
}

export type ListItemButtonPropsType = {
    colors: MD3Colors;
    handleFunction: () => void;
    iconName: any;
    title: string;
    borderColor: string;
}