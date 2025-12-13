export interface ITeamStore {
    team: ITeam;
    showForm: boolean;
    isSure: boolean;
    hideAndShowAddTeam: (show: boolean) => void;
    sureRemoveTeam: (sure: boolean) => void;
    getTeam: (data: ITeam) => void;
}

export interface ITeam {
    id?: string;
    color?: string;
    logo?: string;
    plot?: number;
    name?: string;
    groupAssigned?: number;
    group?: number;
}

export interface ICreate {
    name: string;
}

export interface ICreatePlayer {
    name: string;
    position?: string;
}

export interface ICreateStatistic {
    title: string;
}

export interface ICreateAvoiding {
    title: string;
    max: number;
}

export interface ICreateSummary {
    time: string;
}

export interface IPlot {
    label: string;
    value: number;
}

export interface IDropdown {
    label: string;
    value: string;
}

export interface IPoints {
    id: string;
    name: string;
    won: number;
    color: string;
    tied: number;
    lost: number;
    played: number;
    positive: number;
    negative: number;
    logo: string;
    group: number;
}