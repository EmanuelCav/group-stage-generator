import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { Router } from "expo-router";

import { IGroup } from "@/interface/Group"
import { IGetMatch } from "@/interface/Match";
import { Spacing } from "./props.types";
import { ITeam } from "@/interface/Team";

export type SchedulePropsType = {
    group: IGroup;
    colors: MD3Colors;
    handleGetMatch: (data: IGetMatch) => void;
    router: Router;
    spacing: Spacing;
    isEditMode: boolean;
    setIsSureRemoveMatchday: (isSureRemoveMatch: boolean) => void;
    handleUpdateTeamMatch: (indexGroup: number, indexMatchday: number, indexMatch: number, isLocal: boolean, team: ITeam) => void;
    setIndexMatchday: (indexMatchday: number) => void;
}

export type GroupLabelPropsType = {
    colors: MD3Colors;
    group: IGroup;
    matchdayViewUpdated: (data: string) => void;
    spacing: Spacing;
}

export type MatchdayLabelPropsType = {
    colors: MD3Colors;
    group: IGroup;
    matchdayNumber: (data: string) => void;
    spacing: Spacing;
}

export type ManualFixtureCardPropsType = {
    colors: MD3Colors;
    setIsSureClearFixture: (isSureClearFixture: boolean) => void;
    setIsCardClear: (isCardClear: boolean) => void;
}