import { ITeam } from "./Team";

export interface IMatchStore {
    match: IGetMatch;
    showForm: boolean;
    hideAndShowMatch: (show: boolean) => void;
    getMatch: (data: IMatch) => void;
}

export interface IGetMatch {
    local?: IMatchTeam;
    visitant?: IMatchTeam;
    referee?: string;
    stadium?: string;
    isEdit?: boolean;
    date?: Date;
}

export interface IMatch {
    local: IMatchTeam;
    visitant: IMatchTeam;
    referee: string;
    stadium: string;
    isEdit: boolean;
    date?: Date;
}

export interface IMatchTeam {
    team: ITeam;
    score: number;
}