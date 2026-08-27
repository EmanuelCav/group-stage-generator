import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"
import { IPoints } from "@/interface/Team";
import { Spacing } from "./props.types";
import { MatchResultType } from "./matchdays.props";

export type GroupsListPropsType = {
    group: IGroup;
    colors: MD3Colors;
    t: (scope: string, options?: object | undefined) => string;
}

export type GroupTeamPropsType = {
    group: IGroup;
    colors: MD3Colors;
    groupNumber: number;
    t: (scope: string, options?: object | undefined) => string;
}

export type HeaderGroupPropsType = {
    group: IGroup;
    groupNumber: number;
    colors: MD3Colors;
    spacing: Spacing;
    t: (scope: string, options?: object | undefined) => string;
}

export type CellPropsType = {
    item: string;
    colors: MD3Colors;
    isMatchCell: boolean;
}

export type NameGroupPropsType = {
    colors: MD3Colors;
    index: number;
    item: IPoints;
    isFullName: boolean;
    spacing: Spacing;
    group: IGroup;
}

export type FormBadgesPropsType = {
    t: (scope: string, options?: object | undefined) => string;
    form: MatchResultType[];
}