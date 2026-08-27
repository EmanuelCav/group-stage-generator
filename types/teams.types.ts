import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IMatch } from "@/interface/Match";
import { ITeam } from "@/interface/Team";

export type TeamMatchesInformationPropsType = {
    colors: MD3Colors;
    matchesInformation: IMatch[];
    title: string;
    team: ITeam;
    t: (scope: string, options?: object | undefined) => string;
}

export type MatchRowPropsType = {
    match: IMatch;
    team: ITeam;
    t: (scope: string, options?: object | undefined) => string;
}