export interface ITeamStore {
    team: ITeam;
    showForm: boolean;
    isSure: boolean;
    hideAndShowAddTeam: (show: boolean) => void;
    sureRemoveTeam: (sure: boolean) => void;
    getTeam: (data: ITeam) => void;
}

export interface ITeam {
    id?: number;
    logo?: string;
    plot?: number;
    name?: string;
    group?: number;
    points?: IPoints;
}

export interface ICreate {
    name: string;
}

export interface IPlot {
    label: string;
    value: number;
}

export interface IPoints {
    won: number;
    tied: number;
    lost: number;
    played: number;
    positive: number;
    negative: number;
}