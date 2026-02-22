import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { Router } from "expo-router";

import { IGroup } from "@/interface/Group"
import { IGetMatch } from "@/interface/Match";
import { Spacing } from "./props.types";

export type SchedulePropsType = {
    group: IGroup;
    colors: MD3Colors;
    handleGetMatch: (data: IGetMatch) => void;
    router: Router;
    spacing: Spacing;
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