import { ITeam } from "./Team";

export interface IGroupStore {
    groups: IGroup[];
    group: IGroup;
    generateMatches: (data: IMatch[][][]) => void;
    updateTeam: (data: ITeam) => void;
    getGroup: (data: IGroup) => void;
    createGroup: (data: IGroup) => void;
    updateGroup: (data: IGroup) => void;
    createTeam: (data: ITeam) => void;
    removeTeam: (data: ITeam) => void;
    updateGenerateAgain: () => void;
}

export interface IGroup {
    id?: number;
    logo?: string;
    title?: string;
    matches?: IMatch[][][];
    teams: ITeam[]
    isRoundTripGroupStage?: boolean;
    isRoundTripElimination?: boolean;
    amountClassified?: number;
    amountGroups?: number;
    teamsPerGroup?: number;
    pointsWin?: number;
    pointsDraw?: number;
    pointsLoss?: number;
    isGenerated?: boolean;
    isGeneratedAgain?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISetting {
    title: string;
    isRoundTripGroupStage?: boolean;
    isRoundTripElimination?: boolean;
    amountClassified: number;
    amountGroups: number;
    teamsPerGroup: number;
    pointsWin: number;
    pointsDraw: number;
    pointsLoss: number;
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