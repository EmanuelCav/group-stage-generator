import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { InterstitialAd } from "react-native-google-mobile-ads";

import { IPlayer, IValueStatistic } from "@/interface/Player";
import { IGroup } from "@/interface/Group";
import { Spacing } from "./props.types";

export type FormCreatePlayerPropsType = {
    colors: MD3Colors;
    hideAndShowAddPlayer: (show: boolean) => void;
    createPlayer: (team: IPlayer) => void;
    updatePlayer: (data: IPlayer) => void;
    openSure: (data: IPlayer) => void;
    player: IPlayer;
    group: IGroup;
    interstitial: InterstitialAd;
    isIntersitialLoaded: boolean;
    premium: boolean;
    spacing: Spacing;
}

export type PlayerPropsType = {
    player: IPlayer;
    colors: MD3Colors;
    handleUpdatePlayer: (player: IPlayer) => void;
}

export type StatisticPlayerPropsType = {
    isLast: boolean;
    colors: MD3Colors;
    statistic: IValueStatistic;
    title: string;
}