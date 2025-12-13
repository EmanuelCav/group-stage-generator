import { create } from "zustand";

import { ITeam, ITeamStore } from "@/interface/Team";

export const teamStore = create<ITeamStore>(
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
  })
);
