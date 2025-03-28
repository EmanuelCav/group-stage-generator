import { IMatch } from "@/interface/Match"

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