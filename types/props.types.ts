import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { PropsWithChildren } from "react";
import { Router } from "expo-router";

import { IMatch } from "@/interface/Match";

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
    goBack: () => void;
    sureRemoveGroup: (sure: boolean) => void;
    sureRestartGroup: (sure: boolean) => void;
}

export type SurePropsType = {
    func: () => void;
    text: string;
    close: () => void;
}

export type GenerateAgainPropsType = {
    colors: MD3Colors;
}

export type MatchPropsType = {
    colors: MD3Colors;
    match: IMatch;
}

export type AddActionPropsType = {
    colors: MD3Colors;
    openForm: (show: boolean) => void;
    text: string;
}