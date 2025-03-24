import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IMatch, IMatchStore } from "@/interface/Match";

export const matchStore = create(
    persist<IMatchStore>(
        (set) => ({
            match: {},
            showForm: false,
            hideAndShowMatch: (show: boolean) => set(() => ({
                showForm: show
            })),
            getMatch: (data: IMatch) => set(() => ({
                match: data
            }))
        }),
        {
            name: 'group_fase_match_generator_storage'
        }
    )
)