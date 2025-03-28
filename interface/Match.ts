import { IPlayer } from "./Player";
import { ITeam } from "./Team";

export interface IMatchStore {
    match: IGetMatch;
    segmentedButton: string;
    showForm: boolean;
    getMatch: (data: IGetMatch) => void;
    handleSegmented: (data: string) => void;
    hideAndShowUpdateMatch: (show: boolean) => void;
    updateMatch: (data: IGetMatch) => void;
}

export interface IGetMatch {
    match?: IMatch;
    matchday?: number;
}

export interface IMatch {
    local: IMatchTeam;
    visitant: IMatchTeam;
    referee: string;
    stadium: string;
    isEdit: boolean;
    summary: ISummary[];
    statistics: IMatchStatistic[];
    date?: Date;
}

export interface IMatchTeam {
    team: ITeam;
    score: number | null;
}

export interface ISummary {
    title: string;
    player: IPlayer;
    time: Date;
}

export interface IMatchStatistic {
    title: string;
    teamLocal: IMatchStatisticTeam;
    teamVisitant: IMatchStatisticTeam;
}

export interface IMatchStatisticTeam {
    team: ITeam;
    value: number;
}