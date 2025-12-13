import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { InterstitialAd } from "react-native-google-mobile-ads";

import { IReferee } from "@/interface/Referee";
import { IGroup } from "@/interface/Group";

export type FormCreateRefereePropsType = {
    colors: MD3Colors;
    hideAndShowAddReferee: (show: boolean) => void;
    createReferee: (team: IReferee) => void;
    updateReferee: (data: IReferee) => void;
    openSure: (data: IReferee) => void;
    referee: IReferee;
    premium: boolean;
    group: IGroup;
    interstitial: InterstitialAd;
    isIntersitialLoaded: boolean;
}

export type RefereePropsType = {
    referee: IReferee;
    handleUpdateReferee: (referee: IReferee) => void;
    colors: MD3Colors;
}