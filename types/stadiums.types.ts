import { InterstitialAd } from "react-native-google-mobile-ads";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IStadium } from "@/interface/Stadium";
import { IGroup } from "@/interface/Group";
import { Spacing } from "./props.types";

export type FormCreateStadiumPropsType = {
    colors: MD3Colors;
    hideAndShowAddStadium: (show: boolean) => void;
    createStadium: (stadium: IStadium) => void;
    updateStadium: (data: IStadium) => void;
    openSure: (data: IStadium) => void;
    stadium: IStadium;
    premium: boolean;
    group: IGroup;
    interstitial: InterstitialAd;
    isIntersitialLoaded: boolean;
    spacing: Spacing;
}

export type StadiumPropsType = {
    stadium: IStadium;
    handleUpdateStadium: (stadium: IStadium) => void;
    colors: MD3Colors;
    spacing: Spacing;
}