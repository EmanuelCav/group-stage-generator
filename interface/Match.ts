import { IPlayer, IStatistic } from "./Player";
import { ITeam } from "./Team";

export interface IMatchStore {
    match: IGetMatch;
    summary: ISummary;
    statistic: IMatchStatistic;
    segmentedButton: string;
    showForm: boolean;
    showFormPlayers: boolean;
    showFormStatistics: boolean;
    showFormSummary: boolean;
    isSureSummary: boolean;
    isSureStatistic: boolean;
    getMatch: (data: IGetMatch) => void;
    getSummary: (data: ISummary) => void;
    getStatistic: (data: IStatistic) => void;
    sureRemoveSummary: (show: boolean) => void;
    sureRemoveStatistic: (show: boolean) => void;
    handleSegmented: (data: string) => void;
    hideAndShowUpdateMatch: (show: boolean) => void;
    hideAndShowPlayers: (show: boolean) => void;
    hideAndShowStatistics: (show: boolean) => void;
    hideAndShowSummary: (show: boolean) => void;
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
    players: IPlayer[];
    date?: Date;
}

export interface IMatchTeam {
    team: ITeam;
    score: number | null;
}

export interface ISummary {
    id?: number;
    title?: string;
    player?: IPlayer;
    time?: string;
}

export interface IMatchStatistic {
    id?: number;
    title?: string;
    teamLocal?: IMatchStatisticTeam;
    teamVisitant?: IMatchStatisticTeam;
}

export interface IMatchStatisticTeam {
    team: ITeam;
    value: number;
}

export interface IGenerateMatch {
    groupsMatches: IMatch[][][];
    groupsSorted: ITeam[][];
}