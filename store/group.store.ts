import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IGroup, IGroupStore, IMatch } from "@/interface/Group";
import { ITeam } from "@/interface/Team";

export const groupStore = create(
    persist<IGroupStore>(
        (set) => ({
            group: {
                teams: []
            },
            groups: [],
            getGroup: (data: IGroup) => set(() => ({
                group: data
            })),
            createGroup: (data: IGroup) => set((state) => ({
                groups: [...state.groups, data],
                group: data
            })),
            updateGroup: (data: IGroup) => set((state) => ({
                groups: state.groups.map((g) => g.id === data.id ? data : g),
                group: data
            })),
            createTeam: (data: ITeam) => set((state) => ({
                group: {...state.group, teams: [...state.group.teams, data]},
                groups: state.groups.map((g) => g.id === state.group.id ? {...state.group, teams: [...state.group.teams, data]} : g)
            })),
            generateMatches: (data: IMatch[][][]) => set((state) => ({
                group: {...state.group, matches: data, isGenerated: true},
                groups: state.groups.map((g) => g.id === state.group.id ? {...state.group, groupsMatches: data, isGenerated: true} : g)
            })),
            updateTeam: (data: ITeam) => set((state) => ({
                group: {...state.group, teams: state.group.teams.map((t) => t.id === data.id ? data : t)},
                groups: state.groups.map((g) => g.id === state.group.id ? {...state.group, teams: state.group.teams.map((t) => t.id === data.id ? data : t)} : g)
            })),
            removeTeam: (data: ITeam) => set((state) => ({
                group: {...state.group, teams: state.group.teams.filter((t) => t.id !== data.id)},
                groups: state.groups.map((g) => g.id === state.group.id ? {...state.group, teams: state.group.teams.filter((t) => t.id !== data.id)} : g)
            })),
            updateGenerateAgain: () => set((state) => ({
                group: {...state.group, isGeneratedAgain: false},
                groups: state.groups.map((g) => g.id === state.group.id ? {...state.group, isGeneratedAgain: false} : g)
            })),
        }),
        {
            name: 'group_fase_generator_storage'
        }
    )
)