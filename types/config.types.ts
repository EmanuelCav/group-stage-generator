import { Control, UseFormHandleSubmit } from "react-hook-form";
import { ISetting } from "@/interface/Group";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export type SwitchSettingsPropsType = {
    text: string;
    name: keyof ISetting;
    control: Control<ISetting>;
};

export type InputSettingsPropsType = {
    text: string;
    name: keyof ISetting;
    control: Control<ISetting>;
    error?: string;
};

export type SettingsButtonPropsType = {
    colors: MD3Colors;
    handleSumbit: UseFormHandleSubmit<ISetting>;
    handleConfig: (data: ISetting) => void;
}

export type HeaderConfigPropsType = {
    colors: MD3Colors;
    comeBack: () => void;
}

export type ConfigButtonPropsType = {
    text: string;
    colors: MD3Colors;
}