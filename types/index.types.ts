import { Router } from "expo-router";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"

export type TournamentsPropsType = {
    groups: IGroup[];
    colors: MD3Colors;
    handleGroup: (group: IGroup) => void;
    t: (scope: string, options?: object | undefined) => string;
}

export type TournamentPropsType = {
    colors: MD3Colors;
    group: IGroup;
    handleGroup: (group: IGroup) => void;
    t: (scope: string, options?: object | undefined) => string;
}

export type AddGroupStagePropsType = {
    colors: MD3Colors;
    handleCreateTournament: () => void;
}

export type HeaderTournamentsPropsType = {
    router: Router;
    t: (scope: string, options?: object | undefined) => string;
}

export type AddTournamentPropsType = {
    colors: MD3Colors;
    handleCreateTournament: () => void;
    t: (scope: string, options?: object | undefined) => string;
}