import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IGroup } from "@/interface/Group"
import { ITeam } from "@/interface/Team";

export type GroupsListPropsType = {
    group: IGroup;
    colors: MD3Colors;
}

export type GroupTeamPropsType = {
    team: ITeam;
    group: IGroup;
    colors: MD3Colors;
    index: number;
}