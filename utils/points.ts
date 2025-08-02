import { IGroup } from "@/interface/Group";
import { IMatch } from "@/interface/Match";
import { IPoints, ITeam } from "@/interface/Team";

export const generatePoints = (teams: ITeam[], matches: IMatch[][][], group: IGroup): IPoints[] => {

    let groupData: IPoints[] = []

    for (let t = 0; t < teams.length; t++) {

        let lost = 0
        let tied = 0
        let won = 0
        let played = 0
        let positive = 0
        let negative = 0

        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i].length; j++) {
                for (let k = 0; k < matches[i][j].length; k++) {

                    if (matches[i][j][k].local.score !== null || matches[i][j][k].visitant.score !== null) {
                        if (matches[i][j][k].local.team.id === teams[t].id) {
                            if (matches[i][j][k].local.score! > matches[i][j][k].visitant.score!) {
                                won++
                                positive += matches[i][j][k].local.score!
                                negative += matches[i][j][k].visitant.score!
                            }

                            if (matches[i][j][k].local.score! === matches[i][j][k].visitant.score!) {
                                tied++
                                positive += matches[i][j][k].local.score!
                                negative += matches[i][j][k].visitant.score!
                            }

                            if (matches[i][j][k].local.score! < matches[i][j][k].visitant.score!) {
                                lost++
                                positive += matches[i][j][k].local.score!
                                negative += matches[i][j][k].visitant.score!
                            }

                            played++
                        }

                        if (matches[i][j][k].visitant.team.id === teams[t].id) {
                            if (matches[i][j][k].visitant.score! > matches[i][j][k].local.score!) {
                                won++
                                positive += matches[i][j][k].visitant.score!
                                negative += matches[i][j][k].local.score!
                            }

                            if (matches[i][j][k].visitant.score! === matches[i][j][k].local.score!) {
                                tied++
                                positive += matches[i][j][k].visitant.score!
                                negative += matches[i][j][k].local.score!
                            }

                            if (matches[i][j][k].visitant.score! < matches[i][j][k].local.score!) {
                                lost++
                                positive += matches[i][j][k].visitant.score!
                                negative += matches[i][j][k].local.score!
                            }

                            played++
                        }

                    }

                }
            }

        }

        groupData.push({
            lost,
            negative,
            played,
            tied,
            won,
            positive,
            color: teams[t].color!,
            name: teams[t].name!,
            id: teams[t].id!,
            logo: teams[t].logo!,
            group: teams[t].group!,
        })

    }

    return orderPoints(group, groupData)
}

export const orderPoints = (group: IGroup, groupData: IPoints[]): IPoints[] => {

    switch (group.pointsMode) {
        case 'points':
            return groupData.sort((a, b) => {
                const pointsB = b.won * group.pointsWin! + b.tied * group.pointsDraw! + b.lost * group.pointsLoss!;
                const pointsA = a.won * group.pointsWin! + a.tied * group.pointsDraw! + a.lost * group.pointsLoss!;                

                return (
                    (pointsB - pointsA) ||
                    ((b.positive - b.negative) - (a.positive - a.negative)) ||
                    (b.positive - a.positive) ||
                    (b.won - a.won)
                );
            })

        case 'wins':
            return groupData.sort((a, b) => {
                return (
                    (b.won) - (a.won) ||
                    ((b.positive - b.negative) - (a.positive - a.negative)) ||
                    (b.positive - a.positive)
                )
            })

        case 'percentage':
            return groupData.sort((a, b) => {
                return (
                    (b.won / (b.won + b.lost)) - (a.won / (a.won + a.lost)) ||
                    ((b.positive - b.negative) - (a.positive - a.negative)) ||
                    (b.positive - a.positive) ||
                    (b.won - a.won)
                )
            })

        case 'scored':
            return groupData.sort((a, b) => {
                return (
                    (b.positive) - (a.positive) ||
                    ((b.positive - b.negative) - (a.positive - a.negative)) ||
                    (b.won - a.won)
                )
            })

        default:
            return groupData.sort((a, b) => {
                const pointsB = b.won * group.pointsWin! + b.tied * group.pointsDraw! + b.lost * group.pointsLoss!;
                const pointsA = a.won * group.pointsWin! + a.tied * group.pointsDraw! + a.lost * group.pointsLoss!;

                return (
                    (pointsB - pointsA) ||
                    ((b.positive - b.negative) - (a.positive - a.negative)) ||
                    (b.positive - a.positive) ||
                    (b.won - a.won)
                );
            })
    }

}

export const groupName = (name: string): string => {

    let separatedName: string[] = name.split(" ")

    if (separatedName.length === 1) {
        return separatedName[0].slice(0, 3).toUpperCase()
    }

    if (separatedName.length === 2) {
        return separatedName[0].charAt(0).toUpperCase() + separatedName[1].slice(0, 2).toUpperCase()
    }

    if (separatedName.length >= 3) {
        return separatedName[0].charAt(0).toUpperCase() + separatedName[1].charAt(0).toUpperCase() + separatedName[2].charAt(0).toUpperCase()
    }

    return name.slice(0, 3).toUpperCase()
}



