import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { InterstitialAd } from "react-native-google-mobile-ads";
import { Router } from "expo-router";

import { IGroup } from "@/interface/Group";
import { ITeam } from "@/interface/Team"

export type GenerateButtonPropsType = {
    teams: ITeam[];
    colors: MD3Colors;
    generateGroups: () => void;
    loading: boolean;
}

export type AddTeamPropsType = {
    colors: MD3Colors;
    openForm: (show: boolean) => void;
    length: number;
}

export type FormCreateTeamPropsType = {
    colors: MD3Colors;
    hideAndShowAddTeam: (show: boolean) => void;
    createTeam: (team: ITeam) => void;
    updateTeam: (data: ITeam) => void;
    openSure: (data: ITeam) => void;
    group: IGroup;
    team: ITeam;
    interstitial: InterstitialAd;
    isIntersitialLoaded: boolean;
}

export type HeaderCreatePropsType = {
    colors: MD3Colors;
    groups: IGroup[];
    router: Router;
    group: IGroup;
}

export type AddButtonPropsType = {
    colors: MD3Colors;
    handleAdd: () => void;
}

export type TeamAddedPropsType = {
    team: ITeam;
    handleUpdateTeam: (data: ITeam) => void;
    colors: MD3Colors;
}