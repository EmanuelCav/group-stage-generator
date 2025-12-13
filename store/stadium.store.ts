import { create } from "zustand";

import { IStadium, IStadiumStore } from "@/interface/Stadium";

export const stadiumStore = create<IStadiumStore>(
    (set) => ({
        stadium: {},
        isSure: false,
        showForm: false,
        hideAndShowAddStadium: (show: boolean) =>
            set(() => ({
                showForm: show,
            })),
        sureRemoveStadium: (sure: boolean) =>
            set(() => ({
                isSure: sure,
            })),
        getStadium: (data: IStadium) =>
            set(() => ({
                stadium: data,
            })),
    })
);
