export interface IRefereeStore {
    referee: IReferee;
    showForm: boolean;
    isSure: boolean;
    hideAndShowAddReferee: (show: boolean) => void;
    sureRemoveReferee: (sure: boolean) => void;
    getReferee: (data: IReferee) => void;
}

export interface IReferee {
    name?: string;
}