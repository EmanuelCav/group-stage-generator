import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { PropsWithChildren } from "react";
import { Router } from "expo-router";

import { IGetMatch, IMatch } from "@/interface/Match";
import { IGroup } from "@/interface/Group";

export type Action = {
    type: string;
    payload: any;
}

export type ContainerBackgroundPropsType = PropsWithChildren<{
    zIndex: number
}>

export type HeaderGeneralPropsTypes = {
    colors: MD3Colors;
    router: Router;
    title: string;
    groups: IGroup[];
    group: IGroup;
    premium: boolean;
    createGroup: (data: IGroup) => void;
    goBack: () => void;
    sureRemoveGroup: (sure: boolean) => void;
    sureRestartGroup: (sure: boolean) => void;
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