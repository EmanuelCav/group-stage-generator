import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { InterstitialAd } from "react-native-google-mobile-ads";
import { Router } from "expo-router";

import { IGetMatch, IGetMatchKnockout, IMatch, IMatchStatistic, IMatchTeam, ISummary } from "@/interface/Match"
import { IGroup } from "@/interface/Group";
import { ILineup } from "@/interface/Player";
import { Spacing } from "./props.types";

export type TitleMatchPropsType = {
    match: IGetMatch;
    colors: MD3Colors;
    hideAndShowUpdateMatch: (show: boolean) => void;
}

export type ScoreTeamsPropsType = {
    match: IMatch;
    colors: MD3Colors;
    spacing: Spacing;
    isFullName: boolean;
}

export type InformationPropsType = {
    match: IMatch;
    colors: MD3Colors;
}

export type TagInformationPropsType = {
    colors: MD3Colors;
    source: string;
    info: string;
}

export type FormUpdateMatchPropsType = {
    colors: MD3Colors;
    hideAndShowUpdateMatch: (show: boolean) => void;
    updateMatch: (data: IGetMatch) => void;
    updateMatchGroup: (data: IMatch[][][]) => void;
    match: IMatch;
    group: IGroup;
    matchday: number;
    premium: boolean;
    interstitial: InterstitialAd;
    isIntersitialLoaded: boolean;
    spacing: Spacing;
    isFullName: boolean;
}

export type TeamUpdateScorePropsType = {
    colors: MD3Colors;
}

export type FormLineUpPropsType = {
    colors: MD3Colors;
    isFullName: boolean;
    hideAndShowPlayers: (show: boolean) => void;
    group: IGroup;
    match: IMatch;
    updateMatch: (data: IGetMatch) => void;
    updateMatchGroup: (data: IMatch[][][]) => void;
    updateEliminationMatch: (data: IGetMatchKnockout) => void;
    updateMatchKnockGroup: (data: IMatch[][]) => void;
    matchday: number;
    round: number;
    isKnockout: boolean;
    spacing: Spacing;
}

export type FormStatisticsMatchPropsType = {
    colors: MD3Colors;
    isFullName: boolean;
    hideAndShowStatistics: (show: boolean) => void;
    sureRemoveStatistic: (data: boolean) => void;
    match: IMatch;
    group: IGroup;
    statistic: IMatchStatistic;
    updateMatch: (data: IGetMatch) => void;
    updateMatchGroup: (data: IMatch[][][]) => void;
    updateEliminationMatch: (data: IGetMatchKnockout) => void;
    updateMatchKnockGroup: (data: IMatch[][]) => void;
    getStatistic: (data: IMatchStatistic) => void;
    matchday: number;
    round: number;
    isKnockout: boolean;
    spacing: Spacing;
    premium: boolean;
}

export type FormSummaryPropsType = {
    colors: MD3Colors;
    spacing: Spacing;
    hideAndShowSummary: (show: boolean) => void;
    updateMatch: (data: IGetMatch) => void;
    updateMatchGroup: (data: IMatch[][][]) => void;
    sureRemoveSummary: (data: boolean) => void;
    updateEliminationMatch: (data: IGetMatchKnockout) => void;
    updateMatchKnockGroup: (data: IMatch[][]) => void;
    getSummary: (data: ISummary) => void;
    matchday: number;
    summary: ISummary;
    match: IMatch;
    group: IGroup;
    round: number;
    isKnockout: boolean;
    router: Router;
    premium: boolean;
}

export type SummaryPropsType = {
    summary: ISummary;
    match: IMatch;
    colors: MD3Colors;
    handleUpdateSummary: (data: ISummary) => void;
}

export type PlayersMatchPropsType = {
    player: ILineup;
    colors: MD3Colors;
    hideAndShowPlayers: (show: boolean) => void;
}

export type StatisticMatchPropsType = {
    colors: MD3Colors;
    statistic: IMatchStatistic;
    handleUpdateStatistic: (data: IMatchStatistic) => void;
}

export type TeamViewPropsType = {
    colors: MD3Colors;
    team: IMatchTeam;
    spacing: Spacing;
    isFullName: boolean;
}

export type ScoreViewPropsType = {
    colors: MD3Colors;
    match: IMatch;
    spacing: Spacing;
}