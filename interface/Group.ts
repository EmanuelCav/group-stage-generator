import { IMatch } from "./Match";
import { IPlayer } from "./Player";
import { IReferee } from "./Referee";
import { IVenue } from "./Venue";
import { ITeam } from "./Team";

import { KeyTieBreakCriteriaPropsType } from "@/types/props.types";

export interface IGroupStore {
    idGroup: number;
    groups: IGroup[];
    group: IGroup;
    isSureRemove: boolean;
    isSureRestart: boolean;
    isSureRestartElimination: boolean;
    setGroups: (data: IGroup[]) => void;
    sureRemoveGroup: (sure: boolean) => void;
    sureRestartGroup: (sure: boolean) => void;
    sureRestartElimination: (sure: boolean) => void;
    drawedElimination: (data: boolean) => void;
    generateMatches: (data: IMatch[][][], teamsPerGroup: number, amountGroups: number, amountClassified: number) => void;
    generateElimination: (data: IMatch[][]) => void;
    updateTeam: (data: ITeam) => void;
    updateReferee: (data: IReferee) => void;
    updateStadium: (data: IVenue) => void;
    updatePlayer: (data: IPlayer) => void;
    updateMatchGroup: (data: IMatch[][][]) => void;
    updateMatchKnockGroup: (data: IMatch[][]) => void;
    getGroup: (data: IGroup) => void;
    createGroup: (data: IGroup) => void;
    updateGroup: (data: IGroup) => void;
    removeGroup: (data: IGroup) => void;
    restartGroup: () => void;
    restartElimination: () => void;
    createTeam: (data: ITeam) => void;
    createReferee: (data: IReferee) => void;
    createStadium: (data: IVenue) => void;
    createPlayer: (data: IPlayer) => void;
    removeTeam: (data: ITeam) => void;
    removeReferee: (data: IReferee) => void;
    removeStadium: (data: IVenue) => void;
    removePlayer: (data: IPlayer) => void;
    updateCreateElimination: (data: boolean) => void;
    updateGenerateAgain: (data: boolean) => void;
    updateShuffledKnockout: (data: boolean) => void;
    matchdayViewUpdated: (data: string) => void;
    matchdayNumber: (data: string) => void;
    removeMatchday: (groupIndex: number, matchdayIndex: number) => void;
    addMatchday: (groupIndex: number) => void;
    removeMatches: () => void;
    updateTeamMatch: (groupIndex: number, matchdayIndex: number, matchIndex: number, isLocal: boolean, teamData: ITeam) => void;
    updateTeamMatchElimination: (indexRound: number, indexMatch: number, isLocal: boolean, team: ITeam) => void;
}

export interface IGroup {
    id?: string;
    user_id?: string | null;
    logo?: string;
    title?: string;
    matches?: IMatch[][][];
    teams: ITeam[]
    stadiums?: IVenue[];
    referees?: IReferee[];
    players?: IPlayer[];
    tie_breakCriteria?: KeyTieBreakCriteriaPropsType[],
    avoidingMatches?: any[];
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
    matchdayNumber?: string;
    isGroupStageEliminationDrawed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISetting {
    title: string;
    amountClassified: number;
    amountGroups: number;
    teamsPerGroup: number;
    pointsWin: number;
    pointsDraw: number;
    pointsLoss: number;
}
