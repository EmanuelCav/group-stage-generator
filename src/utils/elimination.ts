import { IPoints } from "@/interface/Team";
import { IGroup } from "@/interface/Group";
import { IDetectChanges, IMatch, IMatchTeam } from "@/interface/Match";

import { generatePoints, getMaxGroup, orderPoints } from "./points";
import { shuffle } from "./generator";

export const getElimationTeams = (group: IGroup, isShuffled: boolean, t: (scope: string, options?: object | undefined) => string): IMatch[][] => {

    let pointsGroup: IPoints[][] = []

    for (let i = 0; i < getMaxGroup(group.teams); i++) {
        const points = generatePoints(group.teams.filter(t => t.group === i + 1), group.matches!, group)
        pointsGroup.push(points)
    }

    let classifields: IPoints[][] = []
    let amount = group.amountClassified!

    for (let i = 0; i < pointsGroup.length; i++) {

        let classifieldGroup: IPoints[] = []

        for (let j = 0; j < Math.ceil(group.amountClassified! / pointsGroup.length); j++) {
            classifieldGroup.push(pointsGroup[i][j])
        }

        amount -= classifieldGroup.length
        classifields.push(classifieldGroup)
    }

    let positionGroup: IPoints[][] = []

    for (let i = 0; i < classifields[0].length; i++) {

        let position: IPoints[] = []

        for (let j = 0; j < classifields.length; j++) {
            position.push(classifields[j][i])
        }

        positionGroup.push(position)
    }

    if (amount < 0) {
        positionGroup[positionGroup.length - 1] = orderPoints(group, positionGroup[positionGroup.length - 1])
        positionGroup[positionGroup.length - 1] = positionGroup[positionGroup.length - 1].slice(0, positionGroup[positionGroup.length - 1].length - Math.abs(amount))

        for (let i = 0; i < positionGroup.length - 1; i++) {

            let timesPositionGroup = positionGroup[positionGroup.length - i - 1].length

            for (let j = 0; j < timesPositionGroup; j++) {
                positionGroup[positionGroup.length - i - 1].push(positionGroup[positionGroup.length - i - 2][j])
                positionGroup[positionGroup.length - i - 2].splice(j, 1)
            }
        }

    }

    if (isShuffled) {
        for (let i = 0; i < positionGroup.length; i++) {
            positionGroup[i] = [...shuffle([...positionGroup[i]])]
        }
    }

    const flat = positionGroup.flat().filter(pg => pg !== undefined);

    const result = [];

    for (let i = 0; i < flat.length; i += (Number(group.amountClassified) / 2)) {
        result.push(flat.slice(i, i + (Number(group.amountClassified) / 2)));
    }

    positionGroup = result;

    let match: IMatch[] = []
    let indexPositionGroupMatch = positionGroup[0].length

    if (group.matches?.length! > 1) {

        let matchFirst = 0
        let matchSecond = group.amountClassified === 2 ? 0 : 1

        for (let i = 0; i < indexPositionGroupMatch; i++) {
            match.push({
                local: {
                    score: null,
                    team: {
                        id: positionGroup[0][matchFirst].id,
                        logo: positionGroup[0][matchFirst].logo,
                        name: positionGroup[0][matchFirst].name,
                        color: positionGroup[0][matchFirst].color,
                        group: positionGroup[0][matchFirst].group
                    }
                },
                visitant: {
                    score: null,
                    team: {
                        id: positionGroup[1][matchSecond].id,
                        logo: positionGroup[1][matchSecond].logo,
                        name: positionGroup[1][matchSecond].name,
                        color: positionGroup[1][matchSecond].color,
                        group: positionGroup[1][matchSecond].group,
                    }
                },
                isEdit: false,
                referee: "",
                stadium: "",
                statistics: [],
                summary: [],
                players: []
            })

            if (matchSecond === positionGroup[0].length - 1) {
                matchFirst = 1
                matchSecond = 0
            } else {
                matchFirst += 2
                matchSecond += 2
            }

        }

    } else {

        let matchFirst = 0
        let matchSecond = positionGroup[1].length - 1

        for (let i = 0; i < indexPositionGroupMatch; i++) {

            match.push({
                local: {
                    score: null,
                    team: {
                        id: positionGroup[0][matchFirst].id,
                        logo: positionGroup[0][matchFirst].logo,
                        name: positionGroup[0][matchFirst].name,
                        color: positionGroup[0][matchFirst].color,
                        group: positionGroup[0][matchFirst].group
                    }
                },
                visitant: {
                    score: null,
                    team: {
                        id: positionGroup[1][matchSecond].id,
                        logo: positionGroup[1][matchSecond].logo,
                        name: positionGroup[1][matchSecond].name,
                        color: positionGroup[1][matchSecond].color,
                        group: positionGroup[1][matchSecond].group,
                    }
                },
                isEdit: false,
                referee: "",
                stadium: "",
                statistics: [],
                summary: [],
                players: []
            })

            if (i % 2 === 0) {
                matchFirst = positionGroup[0].length - 1 - ((i / 2))
                matchSecond = 0 + (i / 2)
            } else {
                matchFirst = 0 + ((i + 1) / 2)
                matchSecond = positionGroup[0].length - 1 - ((i + 1) / 2)
            }

        }
    }

    if (amount < 0) {
        for (let i = 0; i < match.length; i++) {
            if (match[i].local.team.group === match[i].visitant.team.group) {
                for (let j = i + 1; j < match.length; j++) {
                    if (match[j].local.team.group === match[j].visitant.team.group) {
                        let auxLocal = match[i].local
                        match[i].local = match[j].local
                        match[j].local = auxLocal
                        break
                    }
                }
            }
        }
    }

    let matches: IMatch[][] = []
    let winnerIndex = 1

    for (let i = 0; i < Math.log(group.amountClassified!) / Math.log(2); i++) {
        if (i === 0) {
            matches.push(match)
        } else {

            let matchNextRound: IMatch[] = []

            for (let j = 0; j < (group.amountClassified! / Math.pow(2, i + 1)); j++) {
                matchNextRound.push({
                    local: {
                        score: null,
                        team: {
                            name: `${t("winner")} ${winnerIndex}`,
                            logo: ""
                        },
                    },
                    visitant: {
                        score: null,
                        team: {
                            name: `${t("winner")} ${winnerIndex + 1}`,
                            logo: ""
                        },
                    },
                    referee: "",
                    stadium: "",
                    isEdit: false,
                    statistics: [],
                    summary: [],
                    players: []
                })

                winnerIndex += 2
            }

            matches.push(matchNextRound)
        }
    }

    return matches

}

export const columnTitle = (index: number, length: number, t: (scope: string, options?: object | undefined) => string): string => {

    if (index === length - 1) return t("final")

    if (index === length - 2) return t("semi_finals")

    if (index === length - 3) return t("quarter_finals")

    return `${t("round_of")} ${Math.pow(2, length - index)}`

}

export const isScoreElimination = (match: IMatch, isRoundTrip: boolean): boolean => {

    if ((match.local.score === null) || (match.visitant.score === null)) return false

    if (isRoundTrip) {
        if ((match.local.scoreTrip === undefined || match.local.scoreTrip === null) || (match.visitant.scoreTrip == undefined || match.visitant.scoreTrip === null)) return false
        if ((match.local.score + match.local.scoreTrip) === (match.visitant.score + match.visitant.scoreTrip)) {
            if ((match.local.scoreTieBreaker === undefined || match.local.scoreTieBreaker === null) || (match.visitant.scoreTieBreaker == undefined || match.visitant.scoreTieBreaker === null)) return false
            if (match.local.scoreTieBreaker === match.visitant.scoreTieBreaker) return false
        }

        return true
    }

    if (match.local.score === match.visitant.score) {
        if ((match.local.scoreTieBreaker === undefined || match.local.scoreTieBreaker === null) || (match.visitant.scoreTieBreaker == undefined || match.visitant.scoreTieBreaker === null)) return false
        if (match.local.scoreTieBreaker === match.visitant.scoreTieBreaker) return false
    }

    if ((match.local.scoreTieBreaker !== undefined && match.local.scoreTieBreaker !== null) && (match.visitant.scoreTieBreaker !== undefined && match.visitant.scoreTieBreaker !== null)) {
        if (match.local.scoreTieBreaker === match.visitant.scoreTieBreaker) return false
    }

    return true

}

export const winner = (match: IMatch, isRoundTrip: boolean): IMatchTeam => {

    if ((match.local.scoreTieBreaker !== undefined && match.local.scoreTieBreaker !== null) && (match.visitant.scoreTieBreaker !== undefined && match.visitant.scoreTieBreaker !== null)) {
        if (match.local.scoreTieBreaker > match.visitant.scoreTieBreaker) {
            return match.local
        }

        if (match.visitant.scoreTieBreaker > match.local.scoreTieBreaker) {
            return match.visitant
        }
    }

    if (isRoundTrip) {
        if ((match.local.score! + match.local.scoreTrip!) > (match.visitant.score! + match.visitant.scoreTrip!)) {
            return match.local
        }

        if ((match.visitant.score! + match.visitant.scoreTrip!) > (match.local.score! + match.local.scoreTrip!)) {
            return match.visitant
        }
        
    } else {
        if ((match.local.score!) > (match.visitant.score!)) {
            return match.local
        }

        if ((match.visitant.score!) > (match.local.score!)) {
            return match.visitant
        }
    }

    return match.local

}

export const detectChangesElimination = (group: IGroup, t: (scope: string, options?: object | undefined) => string): IDetectChanges => {

    let areChanges = false

    for (let i = 0; i < group.eliminationMatches![0].length; i++) {
        if (group.eliminationMatches![0][i].local.score !== null || group.eliminationMatches![0][i].visitant.score !== null) {
            areChanges = true
            break
        }
    }

    if (group.isGroupStageEliminationDrawed) {
        areChanges = true
    }

    if (areChanges) return {
        areChanges,
        eliminationMatches: group.eliminationMatches!
    }

    let pointsGroup: IPoints[][] = []

    for (let i = 0; i < getMaxGroup(group.teams); i++) {
        const points = generatePoints(group.teams.filter(t => t.group === i + 1), group.matches!, group)
        pointsGroup.push(points)
    }

    let classifields: IPoints[][] = []
    let amount = group.amountClassified!

    for (let i = 0; i < pointsGroup.length; i++) {

        let classifieldGroup: IPoints[] = []

        for (let j = 0; j < Math.ceil(group.amountClassified! / pointsGroup.length); j++) {
            classifieldGroup.push(pointsGroup[i][j])
        }

        amount -= classifieldGroup.length
        classifields.push(classifieldGroup)
    }

    let positionGroup: IPoints[][] = []

    for (let i = 0; i < classifields[0].length; i++) {

        let position: IPoints[] = []

        for (let j = 0; j < classifields.length; j++) {
            position.push(classifields[j][i])
        }

        positionGroup.push(position)
    }

    if (amount < 0) {
        positionGroup[positionGroup.length - 1] = orderPoints(group, positionGroup[positionGroup.length - 1])
        positionGroup[positionGroup.length - 1] = positionGroup[positionGroup.length - 1].slice(0, positionGroup[positionGroup.length - 1].length - Math.abs(amount))

        for (let i = 0; i < positionGroup.length - 1; i++) {

            let timesPositionGroup = positionGroup[positionGroup.length - i - 1].length

            for (let j = 0; j < timesPositionGroup; j++) {
                positionGroup[positionGroup.length - i - 1].push(positionGroup[positionGroup.length - i - 2][j])
                positionGroup[positionGroup.length - i - 2].splice(j, 1)
            }
        }

    }

    const flat = positionGroup.flat().filter(pg => pg !== undefined);

    const result = [];

    for (let i = 0; i < flat.length; i += (Number(group.amountClassified) / 2)) {
        result.push(flat.slice(i, i + (Number(group.amountClassified) / 2)));
    }

    positionGroup = result;

    let match: IMatch[] = []
    let indexPositionGroupMatch = positionGroup[0].length

    if (group.matches?.length! > 1) {

        let matchFirst = 0
        let matchSecond = group.amountClassified === 2 ? 0 : 1

        for (let i = 0; i < indexPositionGroupMatch; i++) {
            match.push({
                local: {
                    score: null,
                    team: {
                        id: positionGroup[0][matchFirst].id,
                        logo: positionGroup[0][matchFirst].logo,
                        name: positionGroup[0][matchFirst].name,
                        color: positionGroup[0][matchFirst].color,
                        group: positionGroup[0][matchFirst].group
                    }
                },
                visitant: {
                    score: null,
                    team: {
                        id: positionGroup[1][matchSecond].id,
                        logo: positionGroup[1][matchSecond].logo,
                        name: positionGroup[1][matchSecond].name,
                        color: positionGroup[1][matchSecond].color,
                        group: positionGroup[1][matchSecond].group,
                    }
                },
                isEdit: false,
                referee: "",
                stadium: "",
                statistics: [],
                summary: [],
                players: []
            })

            if (matchSecond === positionGroup[0].length - 1) {
                matchFirst = 1
                matchSecond = 0
            } else {
                matchFirst += 2
                matchSecond += 2
            }

        }

    } else {

        let matchFirst = 0
        let matchSecond = positionGroup[1].length - 1

        for (let i = 0; i < indexPositionGroupMatch; i++) {

            match.push({
                local: {
                    score: null,
                    team: {
                        id: positionGroup[0][matchFirst].id,
                        logo: positionGroup[0][matchFirst].logo,
                        name: positionGroup[0][matchFirst].name,
                        color: positionGroup[0][matchFirst].color,
                        group: positionGroup[0][matchFirst].group
                    }
                },
                visitant: {
                    score: null,
                    team: {
                        id: positionGroup[1][matchSecond].id,
                        logo: positionGroup[1][matchSecond].logo,
                        name: positionGroup[1][matchSecond].name,
                        color: positionGroup[1][matchSecond].color,
                        group: positionGroup[1][matchSecond].group,
                    }
                },
                isEdit: false,
                referee: "",
                stadium: "",
                statistics: [],
                summary: [],
                players: []
            })

            if (i % 2 === 0) {
                matchFirst = positionGroup[0].length - 1 - ((i / 2))
                matchSecond = 0 + (i / 2)
            } else {
                matchFirst = 0 + ((i + 1) / 2)
                matchSecond = positionGroup[0].length - 1 - ((i + 1) / 2)
            }

        }
    }

    if (amount < 0) {
        for (let i = 0; i < match.length; i++) {
            if (match[i].local.team.group === match[i].visitant.team.group) {
                for (let j = i + 1; j < match.length; j++) {
                    if (match[j].local.team.group === match[j].visitant.team.group) {
                        let auxLocal = match[i].local
                        match[i].local = match[j].local
                        match[j].local = auxLocal
                        break
                    }
                }
            }
        }
    }

    let matches: IMatch[][] = []
    let winnerIndex = 1

    for (let i = 0; i < Math.log(group.amountClassified!) / Math.log(2); i++) {
        if (i === 0) {
            matches.push(match)
        } else {

            let matchNextRound: IMatch[] = []

            for (let j = 0; j < (group.amountClassified! / Math.pow(2, i + 1)); j++) {
                matchNextRound.push({
                    local: {
                        score: null,
                        team: {
                            name: `${t("winner")} ${winnerIndex}`,
                            logo: ""
                        },
                    },
                    visitant: {
                        score: null,
                        team: {
                            name: `${t("winner")} ${winnerIndex + 1}`,
                            logo: ""
                        },
                    },
                    referee: "",
                    stadium: "",
                    isEdit: false,
                    statistics: [],
                    summary: [],
                    players: []
                })

                winnerIndex += 2
            }

            matches.push(matchNextRound)
        }
    }

    return {
        areChanges,
        eliminationMatches: matches
    }

}

export const isMatchKnockoutEdit = (eliminationMatches: IMatch[][]) => {

    for (let i = 0; i < eliminationMatches.length; i++) {
        for (let j = 0; j < eliminationMatches[i].length; j++) {
            if ((eliminationMatches[i][j].local.score !== null) &&
                eliminationMatches[i][j].visitant.score !== null) {
                return true
            }
        }
    }

    return false
}