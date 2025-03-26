import { IMatch } from "./Match";
import { IPlayer, IStatistic } from "./Player";
import { IReferee } from "./Referee";
import { IStadium } from "./Stadium";
import { ITeam } from "./Team";

export interface IGroupStore {
    groups: IGroup[];
    group: IGroup;
    isSureRemove: boolean;
    isSureRestart: boolean;
    sureRemoveGroup: (sure: boolean) => void;
    sureRestartGroup: (sure: boolean) => void;
    generateMatches: (data: IMatch[][][]) => void;
    updateTeam: (data: ITeam) => void;
    updateReferee: (data: IReferee) => void;
    updateStadium: (data: IStadium) => void;
    updatePlayer: (data: IPlayer) => void;
    updateStatisticTitle: (data: IStatistic) => void;
    updateStatisticValue: (data: IStatistic, player: IPlayer) => void;
    getGroup: (data: IGroup) => void;
    createGroup: (data: IGroup) => void;
    updateGroup: (data: IGroup) => void;
    removeGroup: (data: IGroup) => void;
    createTeam: (data: ITeam) => void;
    createReferee: (data: IReferee) => void;
    createStadium: (data: IStadium) => void;
    createPlayer: (data: IPlayer) => void;
    createStatistic: (data: IStatistic) => void;
    removeTeam: (data: ITeam) => void;
    removeReferee: (data: IReferee) => void;
    removeStadium: (data: IStadium) => void;
    removePlayer: (data: IPlayer) => void;
    removeStatistic: (data: IStatistic) => void;
    updateGenerateAgain: () => void;
}

export interface IGroup {
    id?: number;
    logo?: string;
    title?: string;
    matches?: IMatch[][][];
    teams: ITeam[]
    stadiums?: IStadium[];
    referees?: IReferee[];
    players?: IPlayer[];
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