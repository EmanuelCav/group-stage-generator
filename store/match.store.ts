import { create } from "zustand";

import {
  IGetMatch,
  IGetMatchKnockout,
  IMatchStatistic,
  IMatchStore,
  ISummary
} from "@/interface/Match";

export const matchStore = create<IMatchStore>(
  (set) => ({
    match: {},
    matchknockout: {},
    summary: {},
    statistic: {},
    segmentedButton: "summary",
    isSureSummary: false,
    isSureStatistic: false,
    showForm: false,
    showFormPlayers: false,
    showFormStatistics: false,
    showFormSummary: false,
    getMatch: (data: IGetMatch) => set(() => ({
      match: data
    })),
    getMatchKnockout: (data: IGetMatchKnockout) => set(() => ({
      matchknockout: data
    })),
    getSummary: (data: ISummary) => set(() => ({
      summary: data
    })),
    getStatistic: (data: IMatchStatistic) => set(() => ({
      statistic: data
    })),
    sureRemoveSummary: (show: boolean) => set(() => ({
      isSureSummary: show
    })),
    sureRemoveStatistic: (show: boolean) => set(() => ({
      isSureStatistic: show
    })),
    handleSegmented: (data: string) => set(() => ({
      segmentedButton: data
    })),
    hideAndShowUpdateMatch: (show: boolean) => set(() => ({
      showForm: show
    })),
    hideAndShowPlayers: (show: boolean) => set(() => ({
      showFormPlayers: show
    })),
    hideAndShowStatistics: (show: boolean) => set(() => ({
      showFormStatistics: show
    })),
    hideAndShowSummary: (show: boolean) => set(() => ({
      showFormSummary: show
    })),
    updateMatch: (data: IGetMatch) => set(() => ({
      match: data
    })),
    updateEliminationMatch: (data: IGetMatchKnockout) => set(() => ({
      matchknockout: data
    })),
    handleGetMatch: () => set(() => ({
      showForm: false,
      showFormPlayers: false,
      showFormStatistics: false,
      showFormSummary: false,
      isSureStatistic: false,
      isSureSummary: false,
      statistic: {},
      summary: {}
    }))
  })
);
