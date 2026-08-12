import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IMatch } from "@/interface/Match";
import { ITeam } from "@/interface/Team";

export type TeamMatchesInformationPropsType = {
    colors: MD3Colors;
    matchesInformation: IMatch[];
    title: string;
    team: ITeam;
}

export type MatchRowPropsType = {
    match: IMatch;
    colors: MD3Colors;
    team: ITeam;
}