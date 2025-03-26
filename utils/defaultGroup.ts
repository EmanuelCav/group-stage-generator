import { IGroup } from "@/interface/Group";
import { IPlayer, IStatistic } from "@/interface/Player";
import { IDropdown, IPlot, ITeam } from "@/interface/Team";

export const groupValue = (id: number): IGroup => {

    return {
        id,
        title: `Group Stage ${id}`,
        logo: "",
        matches: [],
        teams: [],
        referees: [],
        stadiums: [],
        players: [],
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
            played: 0,
            lost: 0,
            tied: 0,
            won: 0,
            positive: 0,
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

export const getTeamsName = (teams: ITeam[]): IDropdown[] => {

    let teamsName: IDropdown[] = []

    for (let i = 0; i < teams.length; i++) {
        teamsName.push({
            value: teams[i].name!,
            label: teams[i].name!
        })
    }

    return teamsName

}

export const generateStatistic = (players: IPlayer[]): IStatistic[] => {

    let statistics: IStatistic[] = []

    if(players.length > 0) {
        for (let i = 0; i < players[0].statistics!.length; i++) {
            statistics.push({
                id: players[0].statistics![i].id,
                title: players[0].statistics![i].title,
                value: players[0].statistics![i].defaultValue,
                defaultValue: players[0].statistics![i].defaultValue,
            })
        }
    }

    return statistics

}