import { Control, UseFormHandleSubmit } from "react-hook-form";
import { IGroup, ISetting } from "@/interface/Group";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { IAvoidingMatches } from "@/interface/Avoiding";
import { PropsWithChildren } from "react";

export type SwitchSettingsPropsType = {
    text: string;
    setValue: (data: boolean) => void;
    value: boolean;
    colors: MD3Colors;
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

export type ConfigButtonPropsType = {
    text: string;
    colors: MD3Colors;
    func: () => void;
}

export type TieBreakCriteriaPropsType = {
    initialData: { label: string, id: string }[];
    setInitialData: React.Dispatch<React.SetStateAction<{
        label: string;
        id: string;
    }[]>>;
}

export type AvoidingMatchesPropsType = {
    group: IGroup;
    colors: MD3Colors;
    openCreateAvoiding: () => void;
    handleUpdateAvoiding: (data: IAvoidingMatches) => void;
    close: () => void;
}

export type FormCreateAvoidingPropsType = {
    colors: MD3Colors;
    hideAndShowAddAvoiding: (show: boolean) => void;
    createAvoiding: (team: IAvoidingMatches) => void;
    updateAvoiding: (data: IAvoidingMatches) => void;
    openSure: (data: IAvoidingMatches) => void;
    avoiding: IAvoidingMatches;
    group: IGroup;
    teamsAvoiding: Record<string, boolean>;
    setTeamsAvoiding: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export type AvoidingPropsType = {
    avoiding: IAvoidingMatches;
    handleUpdateAvoiding: (avoiding: IAvoidingMatches) => void;
}