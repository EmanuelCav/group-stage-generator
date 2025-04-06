import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IMatch } from "@/interface/Match";
import { IGroup, IGroupStore } from "@/interface/Group";
import { ITeam } from "@/interface/Team";
import { IReferee } from "@/interface/Referee";
import { IStadium } from "@/interface/Stadium";
import { IPlayer, IStatistic } from "@/interface/Player";
import { IAvoidingMatches } from "@/interface/Avoiding";

export const groupStore = create(
    persist<IGroupStore>(
        (set) => ({
            group: {
                teams: []
            },
            groups: [],
            isSureRemove: false,
            isSureRestart: false,
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
            removeGroup: (data: IGroup) => set((state) => ({
                groups: state.groups.filter(g => g.id !== data.id),
                group: {
                    teams: []
                },
            })),
            restartGroup: () => set((state) => ({
                group: {
                    ...state.group, isGeneratedAgain: true, isGenerated: false,
                    matches: [], players: [], referees: [], stadiums: [], eliminationMatches: [], tie_breakCriteria: []
                },
                groups: state.groups.map((g) => g.id === state.group.id ? {
                    ...state.group, isGeneratedAgain: true, isGenerated: false,
                    matches: [], players: [], referees: [], stadiums: [], eliminationMatches: [], tie_breakCriteria: []
                } : g)
            })),
            createTeam: (data: ITeam) => set((state) => ({
                group: { ...state.group, teams: [...state.group.teams, data] },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, teams: [...state.group.teams, data] } : g)
            })),
            createReferee: (data: IReferee) => set((state) => ({
                group: { ...state.group, referees: [...state.group.referees!, data] },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, referees: [...state.group.referees!, data] } : g)
            })),
            createStadium: (data: IStadium) => set((state) => ({
                group: { ...state.group, stadiums: [...state.group.stadiums!, data] },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, stadiums: [...state.group.stadiums!, data] } : g)
            })),
            createPlayer: (data: IPlayer) => set((state) => ({
                group: { ...state.group, players: [...state.group.players!, data] },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, players: [...state.group.players!, data] } : g)
            })),
            createStatistic: (data: IStatistic) => set((state) => ({
                group: { ...state.group, players: state.group.players?.map((p) => ({ ...p, statistics: [...p.statistics!, data] })) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, players: state.group.players?.map((p) => ({ ...p, statistics: [...p.statistics!, data] })) } : g)
            })),
            createAvoiding: (data: IAvoidingMatches) => set((state) => ({
                group: { ...state.group, avoidingMatches: [...state.group.avoidingMatches!, data] },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, avoidingMatches: [...state.group.avoidingMatches!, data] } : g)
            })),
            generateMatches: (data: IMatch[][][], teamsPerGroup: number, amountGroups: number, amountClassified: number) => set((state) => ({
                group: { ...state.group, matches: data, isGenerated: true, teamsPerGroup, amountGroups, amountClassified },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, matches: data, isGenerated: true, teamsPerGroup, amountGroups, amountClassified } : g)
            })),
            generateElimination: (data: IMatch[][]) => set((state) => ({
                group: { ...state.group, eliminationMatches: data },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, eliminationMatches: data } : g)
            })),
            updateTeam: (data: ITeam) => set((state) => ({
                group: { ...state.group, teams: state.group.teams.map((t) => t.id === data.id ? data : t) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, teams: state.group.teams.map((t) => t.id === data.id ? data : t) } : g)
            })),
            updateReferee: (data: IReferee) => set((state) => ({
                group: { ...state.group, referees: state.group.referees!.map((r) => r.id === data.id ? data : r) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, referees: state.group.referees!.map((r) => r.id === data.id ? data : r) } : g)
            })),
            updateStadium: (data: IStadium) => set((state) => ({
                group: { ...state.group, stadiums: state.group.stadiums!.map((s) => s.id === data.id ? data : s) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, stadiums: state.group.stadiums!.map((s) => s.id === data.id ? data : s) } : g)
            })),
            updatePlayer: (data: IPlayer) => set((state) => ({
                group: { ...state.group, players: state.group.players!.map((p) => p.id === data.id ? data : p) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, players: state.group.players!.map((p) => p.id === data.id ? data : p) } : g)
            })),
            updateStatisticTitle: (data: IStatistic) => set((state) => ({
                group: { ...state.group, players: state.group.players?.map((p) => ({ ...p, statistics: p.statistics?.map((s) => ({ ...s, title: data.title })) })) },
                groups: state.groups.map((g) => g.id === state.group.id ? {
                    ...state.group, players: state.group.players?.map((p) => (
                        { ...p, statistics: p.statistics?.map((s) => ({ ...s, title: data.title })) }))
                } : g)
            })),
            updateStatisticValue: (data: IStatistic, player: IPlayer) => set((state) => ({
                group: { ...state.group, players: state.group.players?.map((p) => player.id === p.id ? { ...p, statistics: p.statistics?.map((s) => s.id === data.id ? { ...s, value: data.value } : s) } : p) },
                groups: state.groups.map((g) => g.id === state.group.id ? {
                    ...state.group, players: state.group.players?.map((p) => player.id === p.id ? { ...p, statistics: p.statistics?.map((s) => s.id === data.id ? { ...s, value: data.value } : s) } : p)
                } : g)
            })),
            updateMatchGroup: (data: IMatch[][][]) => set((state) => ({
                group: { ...state.group, matches: data, isGeneratedAgain: false },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, matches: data, isGeneratedAgain: false } : g)
            })),
            updateAvoiding: (data: IAvoidingMatches) => set((state) => ({
                group: { ...state.group, avoidingMatches: state.group.avoidingMatches!.map((am) => am.id === data.id ? data : am) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, avoidingMatches: state.group.avoidingMatches!.map((am) => am.id === data.id ? data : am) } : g)
            })),
            removeTeam: (data: ITeam) => set((state) => ({
                group: { ...state.group, teams: state.group.teams.filter((t) => t.id !== data.id) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, teams: state.group.teams.filter((t) => t.id !== data.id) } : g)
            })),
            removeReferee: (data: IReferee) => set((state) => ({
                group: { ...state.group, referees: state.group.referees!.filter((r) => r.id !== data.id) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, referees: state.group.referees!.filter((r) => r.id !== data.id) } : g)
            })),
            removeStadium: (data: IStadium) => set((state) => ({
                group: { ...state.group, stadiums: state.group.stadiums!.filter((s) => s.id !== data.id) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, stadiums: state.group.stadiums!.filter((s) => s.id !== data.id) } : g)
            })),
            removePlayer: (data: IPlayer) => set((state) => ({
                group: { ...state.group, players: state.group.players!.filter((p) => p.id !== data.id) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, players: state.group.players!.filter((p) => p.id !== data.id) } : g)
            })),
            removeStatistic: (data: IStatistic) => set((state) => ({
                group: { ...state.group, players: state.group.players?.map((p) => ({ ...p, statistics: p.statistics?.filter((s) => s.id !== data.id) })) },
                groups: state.groups.map((g) => g.id === state.group.id ? {
                    ...state.group, players: state.group.players?.map((p) => (
                        { ...p, statistics: p.statistics?.filter((s) => s.id !== data.id) }))
                } : g)
            })),
            removeAvoiding: (data: IAvoidingMatches) => set((state) => ({
                group: { ...state.group, avoidingMatches: state.group.avoidingMatches!.filter((am) => am.id !== data.id) },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, avoidingMatches: state.group.avoidingMatches!.filter((am) => am.id !== data.id) } : g)
            })),
            updateGenerateAgain: () => set((state) => ({
                group: { ...state.group, isGeneratedAgain: false },
                groups: state.groups.map((g) => g.id === state.group.id ? { ...state.group, isGeneratedAgain: false } : g)
            })),
            sureRemoveGroup: (sure: boolean) => set(() => ({
                isSureRemove: sure
            })),
            sureRestartGroup: (sure: boolean) => set(() => ({
                isSureRestart: sure
            })),
        }),
        {
            name: 'group_stage_generator_storage'
        }
    )
)