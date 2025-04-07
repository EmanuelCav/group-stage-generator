import { generatePoints, orderPoints } from "./points";
import { shuffle } from "./generator";

import { IPoints } from "@/interface/Team";
import { IGroup } from "@/interface/Group";
import { IMatch } from "@/interface/Match";

export const getElimationTeams = (group: IGroup, isShuffled: boolean): IMatch[][] => {

    let pointsGroup: IPoints[][] = []

    for (let i = 0; i < group.matches!.length; i++) {
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

    if(isShuffled) {
        for (let i = 0; i < positionGroup.length; i++) {
            positionGroup[i] = [...shuffle([...positionGroup[i]])]
        }
    }

    let first = 0
    let second = positionGroup.length - 1

    let matchFirst = 0
    let matchSecond = 1

    let match: IMatch[] = []

    for (let i = 0; i < positionGroup[0].length * (second - first); i++) {
        match.push({
            local: {
                score: null,
                team: {
                    id: positionGroup[first][matchFirst].id,
                    logo: positionGroup[first][matchFirst].logo,
                    name: positionGroup[first][matchFirst].name,
                }
            },
            visitant: {
                score: null,
                team: {
                    id: positionGroup[second][matchSecond].id,
                    logo: positionGroup[second][matchSecond].logo,
                    name: positionGroup[second][matchSecond].name,
                }
            },
            isEdit: false,
            referee: "",
            stadium: "",
            statistics: [],
            summary: [],
            players: []
        })

        if (second - 1 !== first) {
            first++
            second--
        } else {
            first = 0
            second = positionGroup.length - 1
        }

        if (matchSecond === positionGroup[0].length - 1) {
            matchFirst = 1
            matchSecond = 0
        } else {
            matchFirst += 2
            matchSecond += 2
        }

    }

    let matches: IMatch[][] = []

    for (let i = 0; i < Math.log(group.amountClassified!) / Math.log(2); i++) {
        if (i === 0) {
            matches.push(match)
        } else {

            let matchNextRound: IMatch[] = []

            for (let j = 0; j < ((group.amountClassified! / Math.pow(i + 1, 2)) / 2) / Math.log(2); j++) {
                matchNextRound.push({
                    local: {
                        score: null,
                        team: {
                            name: "Winner",
                            logo: ""
                        },
                    },
                    visitant: {
                        score: null,
                        team: {
                            name: "Winner",
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
            }

            matches.push(matchNextRound)
        }
    }

    return matches

}

export const columnTitle = (index: number, length: number): string => {

    if (index === length - 1) return "Final"

    if (index === length - 2) return "Semi-finals"

    if (index === length - 3) return "Quarter-finals"

    return `Round of ${Math.pow(2, index)}`

}