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
                for (let k = 0; k < matches[i][k].length; k++) {

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
            name: teams[t].name!,
            id: teams[t].id!,
            logo: teams[t].logo!,
            group: teams[t].group!,
        })

    }

    switch (group.tie_breakCriteria![0]) {
        case 'points':
            return groupData.sort((a, b) =>
                (b.won * group.pointsWin! + b.tied * group.pointsDraw! + b.lost * group.pointsLoss!) -
                (a.won * group.pointsWin! + a.tied * group.pointsDraw! + a.lost * group.pointsLoss!))

        default:
            return groupData.sort((a, b) =>
                (b.won * group.pointsWin! + b.tied * group.pointsDraw! + b.lost * group.pointsLoss!) -
                (a.won * group.pointsWin! + a.tied * group.pointsDraw! + a.lost * group.pointsLoss!))
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



