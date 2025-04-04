import { generatePoints } from "./points";

import { IPoints } from "@/interface/Team";
import { IGroup } from "@/interface/Group";

export const getElimationTeams = (group: IGroup) => {

    let pointsGroup: IPoints[][] = []
    let classifields: IPoints[] = []

    for (let i = 0; i < group.matches!.length; i++) {
        const points = generatePoints(group.teams.filter(t => t.group === i + 1), group.matches!, group)
        pointsGroup.push(points)
    }

    let indexTeamGroup = 0
    let position = 0

    for (let i = 0; i < group.amountClassified!; i++) {
        classifields.push(pointsGroup[indexTeamGroup][position])

        if (indexTeamGroup === pointsGroup.length - 1) {
            indexTeamGroup = 0
            position++
        } else {
            indexTeamGroup++
        }

    }

    console.log(classifields);
    


}