import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IGetMatch, IMatchStatistic, IMatchStore, ISummary } from "@/interface/Match";

export const matchStore = create(
    persist<IMatchStore>(
        (set) => ({
            match: {},
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
            }))
        }),
        {
            name: 'group_stage_match_generator_storage'
        }
    )
)