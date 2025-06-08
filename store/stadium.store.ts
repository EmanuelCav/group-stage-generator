import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IStadium, IStadiumStore } from "@/interface/Stadium";

export const stadiumStore = create(
    persist<IStadiumStore>(
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
        }),
        {
            name: "group_stage_stadium_generator_storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
