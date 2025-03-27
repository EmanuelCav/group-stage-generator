import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGetMatch, IMatch } from "@/interface/Match"

export type TitleMatchPropsType = {
    match: IGetMatch;
    colors: MD3Colors;
    hideAndShowUpdateMatch: (show: boolean) => void;
}

export type ScoreTeamsPropsType = {
    match: IMatch;
}

export type InformationPropsType = {
    match: IMatch;
    colors: MD3Colors;
}

export type TagInformationPropsType = {
    colors: MD3Colors;
    source: string;
    info: string;
}

export type FormUpdateMatchPropsType = {
    colors: MD3Colors;
    hideAndShowUpdateMatch: (show: boolean) => void;
}

export type TeamUpdateScorePropsType = {
    colors: MD3Colors;
}