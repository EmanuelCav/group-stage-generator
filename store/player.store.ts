import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IPlayer, IPlayerStore, IStatistic } from "@/interface/Player";

export const playerStore = create(
    persist<IPlayerStore>(
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
            })),
            updatePlayerStatisticTitle: (data: IStatistic) => set((state) => ({
                player: {...state.player, statistics: state.player.statistics?.map((s) => ({ ...s, title: data.title }))}
            })),
            updatePlayerStatisticValue: (data: IStatistic) => set((state) => ({
                player: {...state.player,  statistics: state.player.statistics?.map((s) => s.id === data.id ? { ...s, value: data.value } : s)}
            })),
            removePlayerStatisticValue: (data: IStatistic) => set((state) => ({
                player: {...state.player,  statistics: state.player.statistics?.filter((s) => s.id !== data.id)}
            })),
        }),
        {
            name: 'group_stage_player_generator_storage'
        }
    )
)