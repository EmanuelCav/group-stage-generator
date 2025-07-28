import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  IGetMatch,
  IGetMatchKnockout,
  IMatchStatistic,
  IMatchStore,
  ISummary
} from "@/interface/Match";

export const matchStore = create(
  persist<IMatchStore>(
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
    }),
    {
      name: `group_stage_match_generator_storage`,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
