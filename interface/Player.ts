import { ITeam } from "./Team";

export interface IPlayerStore {
    player: IPlayer;
    showForm: boolean;
    isSure: boolean;
    hideAndShowAddPlayer: (show: boolean) => void;
    sureRemovePlayer: (sure: boolean) => void;
    getPlayer: (data: IPlayer) => void;
}

export interface IPlayer {
    id?: number;
    name?: string;
    team?: ITeam;
    statistics?: IStatistic[];
}

export interface IStatistic {
    id: number;
    title: string;
    value: number;
}