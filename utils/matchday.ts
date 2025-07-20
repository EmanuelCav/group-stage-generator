import i18n from "@/i18n"
import { IMatch } from "@/interface/Match"
import { ILineup, IPlayer } from "@/interface/Player"

export const getMatchdaysGroupState = (matches: IMatch[][][], matchdayView: string): IMatch[][] => {

    let schedule: IMatch[][] = []

    for (let k = 0; k < matches[0].length; k++) {

        let matchday: IMatch[] = []

        for (let i = 0; i < matches.length; i++) {
            if (matchdayView !== "all") {
                if (i === (Number(matchdayView.split(" ")[1]) - 1)) {
                    for (let j = 0; j < matches[i][k].length; j++) {
                        matchday.push(matches[i][k][j])
                    }
                }
            } else {
                for (let j = 0; j < matches[i][k].length; j++) {
                    matchday.push(matches[i][k][j])
                }
            }
        }

        schedule.push(matchday)
    }

    return schedule

}

export const iconEvent = (event: string): string => {
    switch (event) {
        case i18n.t("goals"):
            return "soccer"

        case i18n.t("yellow"):
            return "card"

        case i18n.t("red"):
            return "card"

        case i18n.t("substitution"):
            return "swap-horizontal"

        case i18n.t("injury"):
            return "medical-bag"

        default:
            return "alert-circle-outline";
    }
}

export const labelSummaryEvent = (event: string): string => {
    switch (event) {
        case i18n.t("goals"):
            return i18n.t("sumarry_select_player_goal")

        case i18n.t("yellow"):
            return i18n.t("sumarry_select_player_yellow")

        case i18n.t("red"):
            return i18n.t("sumarry_select_player_red")

        case i18n.t("substitution"):
            return i18n.t("sumarry_select_player_change")

        case i18n.t("injury"):
            return i18n.t("sumarry_select_player_injury")

        default:
            return i18n.t("sumarry_select_player")
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

    return false

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