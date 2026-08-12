export interface IVenueStore {
    venue: IVenue;
    showForm: boolean;
    isSure: boolean;
    hideAndShowAddVenue: (show: boolean) => void;
    sureRemoveVenue: (sure: boolean) => void;
    getVenue: (data: IVenue) => void;
}

export interface IVenue {
    id?: string;
    name?: string;
}