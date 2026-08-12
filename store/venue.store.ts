import { create } from "zustand";

import { IVenue, IVenueStore } from "@/interface/Venue";

export const useVenueStore = create<IVenueStore>(
    (set) => ({
        venue: {},
        isSure: false,
        showForm: false,
        hideAndShowAddVenue: (show: boolean) =>
            set(() => ({
                showForm: show,
            })),
        sureRemoveVenue: (sure: boolean) =>
            set(() => ({
                isSure: sure,
            })),
        getVenue: (data: IVenue) =>
            set(() => ({
                venue: data,
            })),
    })
);
