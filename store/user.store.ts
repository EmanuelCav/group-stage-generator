import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUserStore } from "@/interface/User";

export const userStore = create(
    persist<IUserStore>(
        (set) => ({
            premium: false,
            setPremium: (data: boolean) => set(() => ({
                premium: data
            }))
        }),
        {
            name: "group_stage_user_storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)