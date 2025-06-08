import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      name: "group_stage_team_generator_storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
