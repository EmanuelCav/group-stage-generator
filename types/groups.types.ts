import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"
import { ITeam } from "@/interface/Team";

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
}

export type CellPropsType = {
    item: string;
    colors: MD3Colors;
}