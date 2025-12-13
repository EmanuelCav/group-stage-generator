import { Router } from "expo-router";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { User } from "@supabase/supabase-js";

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
    user: User | null;
    router: Router;
    setIsSureLogOut: (isSureLogOut: boolean) => void;
}