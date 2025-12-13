import { create } from "zustand";

import { IAvoidingMatches, IAvoidingStore } from "@/interface/Avoiding";

export const avoidingStore = create<IAvoidingStore>(
    (set) => ({
        avoiding: {},
        isSure: false,
        showForm: false,
        hideAndShowAddAvoiding: (show: boolean) => set(() => ({
            showForm: show
        })),
        sureRemoveAvoiding: (sure: boolean) => set(() => ({
            isSure: sure
        })),
        getAvoiding: (data: IAvoidingMatches) => set(() => ({
            avoiding: data
        }))
    })
)