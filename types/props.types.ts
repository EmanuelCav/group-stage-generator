import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { PropsWithChildren } from "react";
import { Router } from "expo-router";

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
}

export type SurePropsType = {
    func: () => void;
    text: string;
    close: () => void;
}

export type GenerateAgainPropsType = {
    colors: MD3Colors;
}