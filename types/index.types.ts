import { Router } from "expo-router";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"

export type TournamentsPropsType = {
    groups: IGroup[];
    colors: MD3Colors;
    handleGroup: (group: IGroup) => void;
}

export type TournamentPropsType = {
    colors: MD3Colors;
    group: IGroup;
    handleGroup: (group: IGroup) => void;
}

export type AddGroupStagePropsType = {
    colors: MD3Colors;
    handleCreateTournament: () => void;
}

export type HeaderTournamentsPropsType = {
    router: Router;
}

export type AddTournamentPropsType = {
    colors: MD3Colors;
    handleCreateTournament: () => void;
}