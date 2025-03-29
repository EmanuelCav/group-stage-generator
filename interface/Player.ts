import { ITeam } from "./Team";

export interface IPlayerStore {
    player: IPlayer;
    showForm: boolean;
    isSure: boolean;
    isSureStatistic: boolean;
    statistic: IStatistic;
    showFormStatistic: boolean;
    hideAndShowAddPlayer: (show: boolean) => void;
    hideAndShowAddStatistic: (show: boolean) => void;
    sureRemovePlayer: (sure: boolean) => void;
    sureRemoveStatistic: (sure: boolean) => void;
    getPlayer: (data: IPlayer) => void;
    getStatistic: (data: IStatistic) => void;
    updatePlayerStatisticTitle: (data: IStatistic) => void;
    updatePlayerStatisticValue: (data: IStatistic) => void;
    removePlayerStatisticValue: (data: IStatistic) => void;
}

export interface IPlayer {
    id?: number;
    name?: string;
    team?: ITeam;
    position?: string;
    statistics?: IStatistic[];
}

export interface IStatistic {
    id?: number;
    title?: string;
    value?: number;
    defaultValue?: number;
}

export interface ILineup {
    playersLocal?: IPlayer;
    playersVisitant?: IPlayer;
}