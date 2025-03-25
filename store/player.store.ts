import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IPlayer, IPlayerStore } from "@/interface/Player";

export const playerStore = create(
    persist<IPlayerStore>(
        (set) => ({
            player: {},
            isSure: false,
            showForm: false,
            hideAndShowAddPlayer: (show: boolean) => set(() => ({
                showForm: show
            })),
            sureRemovePlayer: (sure: boolean) => set(() => ({
                isSure: sure
            })),
            getPlayer: (data: IPlayer) => set(() => ({
                player: data
            }))
        }),
        {
            name: 'group_fase_player_generator_storage'
        }
    )
)