import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { PropsWithChildren } from "react";
import { Router } from "expo-router";

import { IGetMatch, IMatch } from "@/interface/Match";
import { IGroup } from "@/interface/Group";
import { IDropdown, ITeam } from "@/interface/Team";

export type Action = {
    type: string;
    payload: any;
}

export type ContainerBackgroundPropsType = PropsWithChildren<{
    zIndex: number;
    onClose: () => void;
}>

export type HeaderGeneralPropsTypes = {
    colors: MD3Colors;
    title: string;
    isMatchdaysScreen: boolean;
    isEditMode?: boolean;
    setIsEditMode?: (isEditMode: boolean) => void;
    goBack: () => void;
}

export type SurePropsType = {
    func: () => void;
    text: string;
    close: () => void;
    labelButton: string;
}

export type GenerateAgainPropsType = {
    colors: MD3Colors;
}

export type MatchPropsType = {
    colors: MD3Colors;
    item: IMatch[];
    group: IGroup;
    match: IMatch;
    index: number;
    handleGetMatch: (data: IGetMatch) => void;
    matchdayNumber: number;
    spacing: Spacing;
    isEditMode: boolean;
    handleUpdateTeamMatch: (indexGroup: number, indexMatchday: number, indexMatch: number, isLocal: boolean, team: ITeam) => void;
    t: (scope: string, options?: object | undefined) => string;
}

export type AddActionPropsType = {
    colors: MD3Colors;
    openForm: (show: boolean) => void;
    text: string;
}

export type SettingsFABPropsType = {
    router: Router;
    colors: MD3Colors;
}

export type KeyTieBreakCriteriaPropsType = 'points' | 'won' | 'difference' | 'favor'

export type Spacing = {
    h106: number;
    w72: number;
    h47: number;
    h74: number;
    w36: number;
    h28: number;
    h3_8: number;
    w45: number;
    h5: number;
    h148: number;
    w18: number;
    h185: number;
    h192: number;
    h41: number;
    w120: number;
    w3: number;
    w6: number;
    w57: number;
}

export type CustomDropdownPropsType = {
    data: IDropdown[];
    value: string;
    onChange: (item: IDropdown) => void;
    colors: MD3Colors;
}

export type CustomPickerPropsType = {
    items: IDropdown[];
    value: string;
    onChange: (value: string) => void;
    colors: MD3Colors;
    title: string;
}