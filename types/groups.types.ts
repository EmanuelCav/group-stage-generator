import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"
import { IPoints } from "@/interface/Team";
import { Spacing } from "./props.types";

export type GroupsListPropsType = {
    group: IGroup;
    colors: MD3Colors;
}

export type GroupTeamPropsType = {
    group: IGroup;
    colors: MD3Colors;
    groupNumber: number;
}

export type HeaderGroupPropsType = {
    group: IGroup;
    groupNumber: number;
    colors: MD3Colors;
    spacing: Spacing;
}

export type CellPropsType = {
    item: string;
    colors: MD3Colors;
}

export type NameGroupPropsType = {
    colors: MD3Colors;
    index: number;
    item: IPoints;
    isFullName: boolean;
    spacing: Spacing;
}