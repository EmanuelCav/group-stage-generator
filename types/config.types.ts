import { PropsWithChildren } from "react";
import { Control, UseFormHandleSubmit } from "react-hook-form";

import { IGroup, ISetting } from "@/interface/Group";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { Spacing } from "./props.types";

export type SwitchSettingsPropsType = {
    text: string;
    setValue: (data: boolean) => void;
    value: boolean;
    colors: MD3Colors;
    spacing: Spacing;
};

export type MainScreenPropsType = PropsWithChildren<{
    colors: MD3Colors;
}>

export type InputSettingsPropsType = {
    text: string;
    name: keyof ISetting;
    control: Control<ISetting>;
    error?: string;
    defaultValue: string;
    colors: MD3Colors;
    handleFocus: (v: number) => void;
    spacing: Spacing;
};

export type SettingsButtonPropsType = {
    colors: MD3Colors;
    handleSumbit: UseFormHandleSubmit<ISetting>;
    handleConfig: (data: ISetting) => void;
    loading: boolean;
}

export type HeaderConfigPropsType = {
    colors: MD3Colors;
    comeBack: () => void;
}