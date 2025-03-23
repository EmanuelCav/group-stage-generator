import { IGroup } from "@/interface/Group";
import { IPlot, ITeam } from "@/interface/Team";

export const groupValue = (id: number): IGroup => {

    return {
        id,
        title: `Group Stage ${id}`,
        logo: "",
        matches: [],
        teams: [],
        isRoundTripElimination: false,
        isRoundTripGroupStage: false,
        teamsPerGroup: 1,
        amountGroups: 1,
        amountClassified: 1,
        pointsWin: 3,
        pointsDraw: 1,
        pointsLoss: 0,
        isGenerated: false,
        isGeneratedAgain: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

export const teamValue = (id: number, logo: string | undefined, name: string, plot: number): ITeam => {

    return {
        id,
        logo,
        name,
        plot,
        points: {
            played:0,
            lost: 0,
            tied: 0,
            won: 0,
            positive:0,
            negative: 0
        }
    }

}

export const dataPlots = (teamsPerGroup: number): IPlot[] => {

    let plots: IPlot[] = []

    for (let i = 1; i <= teamsPerGroup; i++) {
        plots.push({
            label: `Plot ${i}`,
            value: i
        })
    }

    return plots

}