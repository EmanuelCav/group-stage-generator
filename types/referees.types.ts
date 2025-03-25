import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { IReferee } from "@/interface/Referee";
import { IGroup } from "@/interface/Group";

export type FormCreateRefereePropsType = {
    colors: MD3Colors;
    hideAndShowAddReferee: (show: boolean) => void;
    createReferee: (team: IReferee) => void;
    updateReferee: (data: IReferee) => void;
    openSure: (data: IReferee) => void;
    referee: IReferee;
    group: IGroup;
}

export type RefereePropsType = {
    referee: IReferee;
    handleUpdateReferee: (referee: IReferee) => void;
}