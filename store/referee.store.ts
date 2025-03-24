import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IReferee, IRefereeStore } from "@/interface/Referee";

export const refereeStore = create(
    persist<IRefereeStore>(
        (set) => ({
            referee: {},
            isSure: false,
            showForm: false,
            hideAndShowAddReferee: (show: boolean) => set(() => ({
                showForm: show
            })),
            sureRemoveReferee: (sure: boolean) => set(() => ({
                isSure: sure
            })),
            getReferee: (data: IReferee) => set(() => ({
                referee: data
            }))
        }),
        {
            name: 'group_fase_referee_generator_storage'
        }
    )
)