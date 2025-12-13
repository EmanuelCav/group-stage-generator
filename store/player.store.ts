import { create } from "zustand";

import { IPlayer, IPlayerStore, IStatistic } from "@/interface/Player";

export const playerStore = create<IPlayerStore>(
  (set) => ({
    player: {},
    statistic: {},
    isSure: false,
    isSureStatistic: false,
    showForm: false,
    showFormStatistic: false,
    hideAndShowAddPlayer: (show: boolean) => set(() => ({
      showForm: show
    })),
    hideAndShowAddStatistic: (show: boolean) => set(() => ({
      showFormStatistic: show
    })),
    sureRemovePlayer: (sure: boolean) => set(() => ({
      isSure: sure
    })),
    sureRemoveStatistic: (sure: boolean) => set(() => ({
      isSureStatistic: sure
    })),
    getPlayer: (data: IPlayer) => set(() => ({
      player: data
    })),
    getStatistic: (data: IStatistic) => set(() => ({
      statistic: data
    }))
  })
);
