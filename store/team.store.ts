import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ITeam, ITeamStore } from "@/interface/Team";

export const teamStore = create(
    persist<ITeamStore>(
        (set) => ({
            team: {},
            isSure: false,
            showForm: false,
            hideAndShowAddTeam: (show: boolean) => set(() => ({
                showForm: show
            })),
            sureRemoveTeam: (sure: boolean) => set(() => ({
                isSure: sure
            })),
            getTeam: (data: ITeam) => set(() => ({
                team: data
            }))
        }),
        {
            name: 'group_fase_team_generator_storage'
        }
    )
)