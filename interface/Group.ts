import { IAvoidingMatches } from "./Avoiding";
import { IMatch } from "./Match";
import { IPlayer } from "./Player";
import { IReferee } from "./Referee";
import { IStadium } from "./Stadium";
import { ITeam } from "./Team";

import { KeyTieBreakCriteriaPropsType } from "@/types/props.types";

export interface IGroupStore {
    groups: IGroup[];
    group: IGroup;
    isSureRemove: boolean;
    isSureRestart: boolean;
    sureRemoveGroup: (sure: boolean) => void;
    sureRestartGroup: (sure: boolean) => void;
    drawedElimination: (data: boolean) => void;
    generateMatches: (data: IMatch[][][], teamsPerGroup: number, amountGroups: number, amountClassified: number) => void;
    generateElimination: (data: IMatch[][]) => void;
    updateTeam: (data: ITeam) => void;
    updateReferee: (data: IReferee) => void;
    updateStadium: (data: IStadium) => void;
    updatePlayer: (data: IPlayer) => void;
    updateAvoiding: (data: IAvoidingMatches) => void;
    updateMatchGroup: (data: IMatch[][][]) => void;
    updateMatchKnockGroup: (data: IMatch[][]) => void;
    getGroup: (data: IGroup) => void;
    createGroup: (data: IGroup) => void;
    updateGroup: (data: IGroup) => void;
    removeGroup: (data: IGroup) => void;
    restartGroup: () => void;
    createTeam: (data: ITeam) => void;
    createReferee: (data: IReferee) => void;
    createStadium: (data: IStadium) => void;
    createPlayer: (data: IPlayer) => void;
    createAvoiding: (data: IAvoidingMatches) => void;
    removeTeam: (data: ITeam) => void;
    removeReferee: (data: IReferee) => void;
    removeStadium: (data: IStadium) => void;
    removePlayer: (data: IPlayer) => void;
    removeAvoiding: (data: IAvoidingMatches) => void;
    updateCreateElimination: (data: boolean) => void;
    updateGenerateAgain: (data: boolean) => void;
    updateShuffledKnockout: (data: boolean) => void;
    matchdayViewUpdated: (data: string) => void;
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
    tie_breakCriteria?: KeyTieBreakCriteriaPropsType[],
    avoidingMatches?: IAvoidingMatches[];
    isDrawed?: boolean;
    eliminationMatches?: IMatch[][];
    isManualConfiguration?: boolean;
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
    isKnockoutGenerated?: boolean;
    pointsMode?: string;
    matchdayView?: string;
    isGroupStageEliminationDrawed?: boolean;
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
