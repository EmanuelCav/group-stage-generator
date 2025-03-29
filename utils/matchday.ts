import { IMatch } from "@/interface/Match"
import { ILineup, IPlayer } from "@/interface/Player"

export const getMatchdaysGroupState = (matches: IMatch[][][]): IMatch[][] => {

    let schedule: IMatch[][] = []

    for (let k = 0; k < matches[0].length; k++) {

        let matchday: IMatch[] = []

        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i][k].length; j++) {
                matchday.push(matches[i][k][j])
            }
        }

        schedule.push(matchday)
    }

    return schedule

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
        if(isMax) {
            if(playersVisitant[i]) {
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
            if(playersLocal[i]) {
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