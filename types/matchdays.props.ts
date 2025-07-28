import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { Router } from "expo-router";

import { IGroup } from "@/interface/Group"
import { IGetMatch } from "@/interface/Match";

export type SchedulePropsType = {
    group: IGroup;
    colors: MD3Colors;
    handleGetMatch: (data: IGetMatch) => void;
    router: Router
}

export type GroupLabelPropsType = {
    colors: MD3Colors;
    group: IGroup;
    matchdayViewUpdated: (data: string) => void;
}