import { IAvoidingMatches } from "@/interface/Avoiding";
import { IGroup } from "@/interface/Group";
import { IPlayer, IStatistic } from "@/interface/Player";
import { IReferee } from "@/interface/Referee";
import { IStadium } from "@/interface/Stadium";
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
        tie_breakCriteria: ["points", "difference", "favor", "won"],
        eliminationMatches: [],
        avoidingMatches: [],
        isManualConfiguration: false,
        isRoundTripElimination: false,
        isRoundTripGroupStage: false,
        isDrawed: false,
        isPoints: true,
        teamsPerGroup: 2,
        amountGroups: 1,
        amountClassified: 2,
        pointsWin: 3,
        pointsDraw: 1,
        pointsLoss: 0,
        isGenerated: false,
        isGeneratedAgain: true,
        isKnockoutGenerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

export const teamValue = (id: number, logo: string | undefined, name: string, plot: number): ITeam => {

    return {
        id,
        logo,
        name,
        plot
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

export const getStadiumsName = (stadiums: IStadium[]): IDropdown[] => {

    let stadiumsName: IDropdown[] = []

    for (let i = 0; i < stadiums.length; i++) {
        stadiumsName.push({
            value: stadiums[i].name!,
            label: stadiums[i].name!
        })
    }

    return stadiumsName

}

export const getRefereeName = (referees: IReferee[]): IDropdown[] => {

    let refereesName: IDropdown[] = []

    for (let i = 0; i < referees.length; i++) {
        refereesName.push({
            value: referees[i].name!,
            label: referees[i].name!
        })
    }

    return refereesName

}

export const getPlayerName = (players: IPlayer[]): IDropdown[] => {

    let playersName: IDropdown[] = []

    for (let i = 0; i < players.length; i++) {
        playersName.push({
            value: players[i].name!,
            label: players[i].name!
        })
    }

    return playersName

}

export const generateStatistic = (players: IPlayer[]): IStatistic[] => {

    let statistics: IStatistic[] = []

    if (players.length > 0) {
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

export const generateAvoidingTeams = (group: IGroup, avoiding: IAvoidingMatches) => {

    let teams: string[] = []

    for (let i = 0; i < group.avoidingMatches?.length!; i++) {
        for (let j = 0; j < group.avoidingMatches![i].teams?.length!; j++) {
            teams.push(group.avoidingMatches![i].teams![j].name!)
        }
    }

    if (avoiding.id) {
        return avoiding.teams!.concat(group.teams.filter(t => !teams.includes(t.name!)))
    }

    return group.teams.filter(t => !teams.includes(t.name!))

}

export const powerRange = (num: number): number => {

    const numLog = Math.log(num) / Math.log(2)
    const power = Math.floor(Math.log(num) / Math.log(2))
    const decimal = numLog - Math.floor(numLog);

    const lower = Math.pow(2, power) - (Math.pow(2, power) / 2)
    const upper = Math.pow(2, power + 1) - (Math.pow(2, power + 1) / 2) - 1

    return Math.abs(num - lower) <= Math.abs(num - upper) ? (decimal > 0.5 ? power : power - 1) : (decimal > 0.5 ? power : power - 1)
}