import { IPlayer, IStatistic } from "./Player";
import { ITeam } from "./Team";

export interface IMatchStore {
    match: IGetMatch;
    matchknockout: IGetMatchKnockout;
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
    getMatchKnockout: (data: IGetMatchKnockout) => void;
    getSummary: (data: ISummary) => void;
    getStatistic: (data: IMatchStatistic) => void;
    sureRemoveSummary: (show: boolean) => void;
    sureRemoveStatistic: (show: boolean) => void;
    handleSegmented: (data: string) => void;
    hideAndShowUpdateMatch: (show: boolean) => void;
    hideAndShowPlayers: (show: boolean) => void;
    hideAndShowStatistics: (show: boolean) => void;
    hideAndShowSummary: (show: boolean) => void;
    updateMatch: (data: IGetMatch) => void;
    updateEliminationMatch: (data: IGetMatchKnockout) => void;
    handleGetMatch: () => void;
}

export interface IGetMatch {
    match?: IMatch;
    matchday?: number;
}

export interface IGetMatchKnockout {
    match?: IMatch;
    round?: number;
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
    date?: string;
    time?: { hours: number; minutes: number }
}

export interface IMatchTeam {
    team: ITeam;
    score: null | number;
    scoreTrip?: null | number;
    scoreTieBreaker?: null | number;
}

export interface ISummary {
    id?: string;
    title?: string;
    player?: IPlayer;
    secondaryPlayer?: IPlayer;
    time?: string;
}

export interface IMatchStatistic {
    id?: string;
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

export interface IDetectChanges {
    areChanges: boolean;
    eliminationMatches: IMatch[][];
}