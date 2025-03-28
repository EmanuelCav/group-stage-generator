import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IGetMatch, IMatchStore } from "@/interface/Match";

export const matchStore = create(
    persist<IMatchStore>(
        (set) => ({
            match: {},
            segmentedButton: "summary",
            showForm: false,
            getMatch: (data: IGetMatch) => set(() => ({
                match: data
            })),
            handleSegmented: (data: string) => set(() => ({
                segmentedButton: data
            })),
            hideAndShowUpdateMatch: (show: boolean) => set(() => ({
                showForm: show
            })),
            updateMatch: (data: IGetMatch) => set(() => ({
                match: data
            }))
        }),
        {
            name: 'group_stage_match_generator_storage'
        }
    )
)