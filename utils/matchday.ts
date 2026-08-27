import { Router } from "expo-router"

import { IMatch } from "@/interface/Match"
import { ILineup, IPlayer } from "@/interface/Player"
import { ITeam } from "@/interface/Team"
import { MatchResultType } from "@/types/matchdays.props"

export const getMatchdaysGroupState = (matches: IMatch[][][], matchdayView: string, matchdayNumber: string, router: Router): IMatch[][] => {

    let schedule: IMatch[][] = []

    if (matches.length === 0) {
        router.replace("/home")
        return []
    }

    for (let k = 0; k < getIndexMaxLength(matches); k++) {

        let matchday: IMatch[] = []

        for (let i = 0; i < matches.length; i++) {
            if (matchdayView !== "all") {
                if (i === (Number(matchdayView.split(" ")[1]) - 1)) {
                    if (matches[i][k]) {
                        for (let j = 0; j < matches[i][k].length; j++) {
                            matchday.push(matches[i][k][j])
                        }
                    }
                }
            } else {
                if (matches[i][k]) {
                    for (let j = 0; j < matches[i][k].length; j++) {
                        matchday.push(matches[i][k][j])
                    }
                }
            }
        }

        schedule.push(matchday)
    }

    if (matchdayNumber === "all") return schedule

    return [[...schedule[Number(matchdayNumber.split(" ")[1]) - 1]]]

}

export const iconEvent = (event: string): string => {
    switch (event) {
        case "goal":
            return "soccer"

        case "yellow card":
            return "card"

        case "red card":
            return "card"

        case "injury":
            return "swap-horizontal"

        case "substitution":
            return "medical-bag"

        default:
            return "alert-circle-outline";
    }
}

export const labelSummaryEvent = (event: string, t: (scope: string, options?: object | undefined) => string): string => {
    switch (event) {
        case "goal":
            return t("sumarry_select_player_goal")

        case "yellow card":
            return t("sumarry_select_player_yellow")

        case "red card":
            return t("sumarry_select_player_red")

        case "substitution":
            return t("sumarry_select_player_change")

        case "injury":
            return t("sumarry_select_player_injury")

        default:
            return t("sumarry_select_player")
    }
}

export const evaluateGenerateAgain = (matches: IMatch[][][]): boolean => {

    for (let i = 0; i < matches.length; i++) {
        for (let j = 0; j < matches[i].length; j++) {
            for (let k = 0; k < matches[i][j].length; k++) {
                if (matches[i][j][k].isEdit) {
                    return false
                }
            }
        }

    }

    return true
}

export const lineupPlayers = (playersLocal: IPlayer[], playersVisitant: IPlayer[]): ILineup[] => {

    let lineup: ILineup[] = []

    let isMax = playersLocal.length > playersVisitant.length

    for (let i = 0; i < (isMax ? playersLocal.length : playersVisitant.length); i++) {
        if (isMax) {
            if (playersVisitant[i]) {
                lineup.push({
                    playersLocal: playersLocal[i],
                    playersVisitant: playersVisitant[i]
                })
            } else {
                lineup.push({
                    playersLocal: playersLocal[i]
                })
            }
        } else {
            if (playersLocal[i]) {
                lineup.push({
                    playersLocal: playersLocal[i],
                    playersVisitant: playersVisitant[i]
                })
            } else {
                lineup.push({
                    playersVisitant: playersVisitant[i]
                })
            }
        }
    }

    return lineup

}

export const getGroupUpdateTeamMatch = (matches: IMatch[][][], match: IMatch, matchdayIndex: number): number => {

    if (!matches) return 0

    for (let i = 0; i < matches.length; i++) {

        if (!matches[i][matchdayIndex]) return 0

        for (let k = 0; k < matches[i][matchdayIndex].length; k++) {
            if (matches[i][matchdayIndex][k].local.team.id === match.local.team.id && matches[i][matchdayIndex][k].visitant.team.id === match.visitant.team.id) {
                return i
            }
        }
    }

    return 0
}

export const getIndexMatchGroup = (groupIndex: number, matchdayIndex: number, matches: IMatch[][][], match: IMatch): number => {

    if (!matches[groupIndex][matchdayIndex]) return 0;

    for (let i = 0; i < matches[groupIndex][matchdayIndex].length; i++) {
        if (matches[groupIndex][matchdayIndex][i].local.team.id === match.local.team.id && matches[groupIndex][matchdayIndex][i].visitant.team.id === match.visitant.team.id) {
            return i
        }
    }

    return 0
}

export const getIndexMaxLength = (matches: IMatch[][][]): number => {

    let maxIndex = matches[0].length

    for (let i = 0; i < matches.length; i++) {
        if (matches[i].length > maxIndex) {
            maxIndex = matches[i].length
        }
    }

    return maxIndex
}

export const nextMatches = (matches: IMatch[][][], eliminationMatches: IMatch[][], team: ITeam): IMatch[] => {

    const listMatches: IMatch[] = []

    for (let i = 0; i < matches.length; i++) {
        for (let j = 0; j < matches[i].length; j++) {
            for (let k = 0; k < matches[i][j].length; k++) {
                if (matches[i][j][k].local.team.name === team.name) {
                    if (matches[i][j][k].local.score === null || matches[i][j][k].local.score === undefined) {
                        listMatches.push(matches[i][j][k])
                    }
                }

                if (matches[i][j][k].visitant.team.name === team.name) {
                    if (matches[i][j][k].visitant.score === null || matches[i][j][k].visitant.score === undefined) {
                        listMatches.push(matches[i][j][k])
                    }
                }
            }
        }
    }

    for (let i = 0; i < eliminationMatches.length; i++) {
        for (let j = 0; j < eliminationMatches[i].length; j++) {
            if (eliminationMatches[i][j].local.team.name === team.name) {
                if (eliminationMatches[i][j].local.score === null || eliminationMatches[i][j].local.score === undefined) {
                    listMatches.push(eliminationMatches[i][j])
                }
            }

            if (eliminationMatches[i][j].visitant.team.name === team.name) {
                if (eliminationMatches[i][j].visitant.score === null || eliminationMatches[i][j].visitant.score === undefined) {
                    listMatches.push(eliminationMatches[i][j])
                }
            }
        }
    }

    return listMatches

}

export const previousMatches = (matches: IMatch[][][], eliminationMatches: IMatch[][], team: ITeam): IMatch[] => {

    const listMatches: IMatch[] = []

    for (let i = 0; i < matches.length; i++) {
        for (let j = 0; j < matches[i].length; j++) {
            for (let k = 0; k < matches[i][j].length; k++) {
                if (matches[i][j][k].local.team.name === team.name) {
                    if (matches[i][j][k].local.score !== null && matches[i][j][k].local.score !== undefined) {
                        listMatches.push(matches[i][j][k])
                    }
                }

                if (matches[i][j][k].visitant.team.name === team.name) {
                    if (matches[i][j][k].visitant.score !== null && matches[i][j][k].visitant.score !== undefined) {
                        listMatches.push(matches[i][j][k])
                    }
                }
            }
        }
    }

    for (let i = 0; i < eliminationMatches.length; i++) {
        for (let j = 0; j < eliminationMatches[i].length; j++) {
            if (eliminationMatches[i][j].local.team.name === team.name) {
                if (eliminationMatches[i][j].local.score !== null && eliminationMatches[i][j].local.score !== undefined) {
                    listMatches.push(eliminationMatches[i][j])
                }
            }

            if (eliminationMatches[i][j].visitant.team.name === team.name) {
                if (eliminationMatches[i][j].visitant.score !== null && eliminationMatches[i][j].visitant.score !== undefined) {
                    listMatches.push(eliminationMatches[i][j])
                }
            }
        }
    }

    return listMatches.reverse()

}

export const getTeamForm = (matches: IMatch[][][], eliminationMatches: IMatch[][], team: ITeam): MatchResultType[] => {

    const teamMatches = previousMatches(matches, eliminationMatches, team);

    return teamMatches.slice(0, 5).map((match) => {
        const isVisitant = match.visitant.team.name === team.name;
        const teamScore = isVisitant ? match.visitant.score : match.local.score;
        const rivalScore = isVisitant ? match.local.score : match.visitant.score;

        if (teamScore! > rivalScore!) return "WIN";
        if (teamScore! < rivalScore!) return "LOSS";
        return "DRAW";
    });
};

export const idMatch = (teams: string): string => {

    const randomHash = Math.random().toString(36).substring(2, 9)

    return `${teams}-${randomHash}`
}