import { Router } from "expo-router";
import { MD3Colors } from "react-native-paper/lib/typescript/types"

import { IPlayer, IStatistic } from "@/interface/Player";
import { IGroup } from "@/interface/Group";

export type AddPlayersPropsType = {
    colors: MD3Colors;
    router: Router;
}

export type AddStatisticsPropsType = {
    colors: MD3Colors;
    hideAndShowAddStatistic: (show: boolean) => void;
}

export type StatisticPropsType = {
    colors: MD3Colors;
    player: IPlayer;
}

export type FormCreateStatisticPropsType = {
    colors: MD3Colors;
    statistic: IStatistic;
    hideAndShowAddStatistic: (show: boolean) => void;
    handleUpdateTitleStatistic: (data: IStatistic) => void;
    handleUpdateValueStatistic: (data: IStatistic) => void;
    createStatistic: (data: IStatistic) => void;
    group: IGroup;
    openSure: (data: IStatistic) => void;
}

export type ShowStatisticsPropsType = {
    colors: MD3Colors;
    group: IGroup;
    hideAndShowAddStatistic: (show: boolean) => void;
}