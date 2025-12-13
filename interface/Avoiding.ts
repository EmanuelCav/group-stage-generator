import { ITeam } from "./Team";

export interface IAvoidingStore {
    avoiding: IAvoidingMatches;
    showForm: boolean;
    isSure: boolean;
    hideAndShowAddAvoiding: (show: boolean) => void;
    sureRemoveAvoiding: (sure: boolean) => void;
    getAvoiding: (data: IAvoidingMatches) => void;
}

export interface IAvoidingMatches {
    id?: string;
    teams?: ITeam[];
    title?: string;
    max?: number;
}