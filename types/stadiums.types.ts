import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IStadium } from "@/interface/Stadium";
import { IGroup } from "@/interface/Group";

export type FormCreateStadiumPropsType = {
    colors: MD3Colors;
    hideAndShowAddStadium: (show: boolean) => void;
    createStadium: (stadium: IStadium) => void;
    updateStadium: (data: IStadium) => void;
    openSure: (data: IStadium) => void;
    stadium: IStadium;
    group: IGroup;
}

export type StadiumPropsType = {
    stadium: IStadium;
    handleUpdateStadium: (stadium: IStadium) => void;
}