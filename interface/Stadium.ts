export interface IStadiumStore {
    stadium: IStadium;
    showForm: boolean;
    isSure: boolean;
    hideAndShowAddStadium: (show: boolean) => void;
    sureRemoveStadium: (sure: boolean) => void;
    getStadium: (data: IStadium) => void;
}

export interface IStadium {
    id?: number;
    name?: string;
}