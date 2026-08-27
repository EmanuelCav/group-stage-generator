import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { Router } from "expo-router";

import { IGroup } from "@/interface/Group";
import { ITeam } from "@/interface/Team"
import { Spacing } from "./props.types";

export type GenerateButtonPropsType = {
    teams: ITeam[];
    colors: MD3Colors;
    generateGroups: () => void;
    loading: boolean;
    t: (scope: string, options?: object | undefined) => string;
}

export type AddTeamPropsType = {
    colors: MD3Colors;
    openForm: (show: boolean) => void;
    t: (scope: string, options?: object | undefined) => string;
}

export type FormCreateTeamPropsType = {
    colors: MD3Colors;
    hideAndShowAddTeam: (show: boolean) => void;
    createTeam: (team: ITeam) => void;
    updateTeam: (data: ITeam) => void;
    openSure: (data: ITeam) => void;
    group: IGroup;
    team: ITeam;
    premium: boolean;
    t: (scope: string, options?: object | undefined) => string;
}

export type HeaderCreatePropsType = {
    colors: MD3Colors;
    router: Router;
    t: (scope: string, options?: object | undefined) => string;
}

export type AddButtonPropsType = {
    colors: MD3Colors;
    handleAdd: () => void;
}

export type TeamAddedPropsType = {
    team: ITeam;
    isManualConfiguration: boolean;
    handleUpdateTeam: (data: ITeam) => void;
    colors: MD3Colors;
    spacing: Spacing;
    t: (scope: string, options?: object | undefined) => string;
}