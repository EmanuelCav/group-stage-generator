import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            name: "group_stage_avoiding_generator_storage",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)