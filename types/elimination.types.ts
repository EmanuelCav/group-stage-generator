import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"
import { IGetMatchKnockout, IMatch } from "@/interface/Match";
import { Spacing } from "./props.types";
import { ITeam } from "@/interface/Team";

export type EliminationStagePropsType = {
    group: IGroup;
    colors: MD3Colors;
    handleGetMatch: (data: IGetMatchKnockout) => void;
    spacing: Spacing;
    isFullName: boolean;
    isEditMode: boolean;
    handleUpdateTeamMatch: (indexRound: number, indexMatch: number, isLocal: boolean, team: ITeam) => void;
}

export type ColumnEliminationPropsType = {
    text: string;
    matches: IMatch[];
    colors: MD3Colors;
    group: IGroup;
    indexElimination: number;
    handleGetMatch: (data: IGetMatchKnockout) => void;
    spacing: Spacing;
    isFullName: boolean;
    isEditMode: boolean;
    handleUpdateTeamMatch: (indexRound: number, indexMatch: number, isLocal: boolean, team: ITeam) => void;
}

export type MatchEliminationPropsType = {
    colors: MD3Colors;
    group: IGroup;
    indexElimination: number;
    match: IMatch;
    handleGetMatch: (data: IGetMatchKnockout) => void;
    spacing: Spacing;
    isFullName: boolean;
    isEditMode: boolean;
    handleUpdateTeamMatch: (indexRound: number, indexMatch: number, isLocal: boolean, team: ITeam) => void;
    index: number;
}

export type ShuffleAgainPropsType = {
    colors: MD3Colors;
    updateShuffledKnockout: (data: boolean) => void;
    generateElimination: (data: IMatch[][]) => void;
    drawedElimination: (data: boolean) => void;
    group: IGroup;
}

export type FormEliminationMatchPropsType = {
    colors: MD3Colors;
    hideAndShowUpdateMatch: (show: boolean) => void;
    updateEliminationMatch: (data: IGetMatchKnockout) => void;
    updateMatchKnockGroup: (data: IMatch[][]) => void;
    match: IMatch;
    group: IGroup;
    round: number;
    premium: boolean;
    isFullName: boolean;
    spacing: Spacing;
}

export type CreateEliminationPropsType = {
    colors: MD3Colors;
    updateCreateElimination: (data: boolean) => void;
    spacing: Spacing;
}