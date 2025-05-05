import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IAvoidingMatches, IAvoidingStore } from "@/interface/Avoiding";

export const avoidingStore = create(
    persist<IAvoidingStore>(
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
        }),
        {
            // name: `${AVOIDING_STORAGE}`
            name: "group_stage_avoiding_generator_storage"
        }
    )
)