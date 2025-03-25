import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IPlayer } from "@/interface/Player";
import { IGroup } from "@/interface/Group";

export type FormCreatePlayerPropsType = {
    colors: MD3Colors;
    hideAndShowAddPlayer: (show: boolean) => void;
    createPlayer: (team: IPlayer) => void;
    updatePlayer: (data: IPlayer) => void;
    openSure: (data: IPlayer) => void;
    player: IPlayer;
    group: IGroup;
}

export type PlayerPropsType = {
    player: IPlayer;
    handleUpdatePlayer: (player: IPlayer) => void;
}