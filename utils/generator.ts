import { IGroup } from "@/interface/Group"
import { IGenerateMatch, IMatch } from "@/interface/Match"
import { ITeam } from "@/interface/Team"

export const groupGenerator = (group: IGroup): IGenerateMatch => {

    let groupsMatches: IMatch[][][] = []
    let shuffledPlots: ITeam[][] = []
    let plots = verifyPlots(group.teams, group.teamsPerGroup!)    

    if (!group.isManualConfiguration) {

        plots = [...[plots.flat()]]

        if (isPrime(group.teams.length)) {

            const numberOfGroups = getMiddleElement(group.teams.length - 1)

            plots[0] = [...shuffle([...plots[0]])]

            let index = 0

            for (let i = 0; i < (group.teams.length === 2 ? 2 : numberOfGroups); i++) {

                let arr: ITeam[] = []

                for (let j = 0; j < (group.teams.length - 1) / numberOfGroups; j++) {
                    arr.push(plots[0][index])
                    index++
                }

                if (group.teams.length !== 2) {
                    if (i === numberOfGroups - 1) {
                        arr.push(plots[0][index])
                    }
                }

                shuffledPlots.push(arr)
            }

        } else {

            const numberOfGroups = getMiddleElement(group.teams.length)

            plots[0] = [...shuffle([...plots[0]])]

            let index = 0

            for (let i = 0; i < numberOfGroups; i++) {

                let arr: ITeam[] = []

                for (let j = 0; j < group.teams.length / numberOfGroups; j++) {
                    arr.push(plots[0][index])
                    index++
                }

                shuffledPlots.push(arr)
            }

        }

        let plotsSet: ITeam[][] = []

        for (let i = 0; i < shuffledPlots.length; i++) {

            let plotSet: ITeam[] = []

            for (let j = 0; j < shuffledPlots[i].length; j++) {
                plotSet.push({ ...shuffledPlots[i][j], plot: i + 1 })
            }

            const shuffledPlotSet = [...shuffle([...plotSet])]

            plotsSet.push(shuffledPlotSet)
        }

        let groupsSorted: ITeam[][] = []

        for (let i = 0; i < plotsSet[0].length; i++) {

            let groupSorted: ITeam[] = []

            for (let j = 0; j < plotsSet.length; j++) {
                groupSorted.push({ ...plotsSet[j][i], group: i + 1 })
            }

            if ((i === plotsSet[0].length - 1) && isPrime(group.teams.length) && group.teams.length !== 2) {
                groupSorted.push({ ...plotsSet[plotsSet.length - 1][i + 1], group: i + 1 })
            }

            groupsSorted.push(groupSorted)
        }

        for (let i = 0; i < groupsSorted.length; i++) {
            const matches = fixtureGenerate(groupsSorted[i], group.isRoundTripGroupStage!)
            groupsMatches.push(matches)
        }

        return {
            groupsMatches,
            groupsSorted
        }

    } else {

        for (let i = 0; i < plots.length; i++) {
            plots[i] = [...shuffle([...plots[i]])]
        }

        for (let i = 0; i < group.teamsPerGroup!; i++) {

            let arr: ITeam[] = []

            for (let j = 0; j < group.teamsPerGroup! - (group.teamsPerGroup! - plots[i].length); j++) {
                arr.push(plots[i][j])
            }

            shuffledPlots.push(arr)
        }

        for (let i = 0; i < shuffledPlots.length; i++) {
            if (shuffledPlots[i].length < group.amountGroups!) {
                for (let j = 0; j < (group.amountGroups! - plots[i].length); j++) {
                    const largestArray = shuffledPlots.reduce((max, arr) =>
                        (arr.length > max.length ? arr : max), shuffledPlots[0])
                    const lastElement = largestArray.pop()
                    shuffledPlots[i].push(lastElement!)
                }
            }
        }

        let plotsSet: ITeam[][] = []

        for (let i = 0; i < shuffledPlots.length; i++) {

            let plotSet: ITeam[] = []

            for (let j = 0; j < shuffledPlots[i].length; j++) {
                plotSet.push(shuffledPlots[i][j])
            }

            const shuffledPlotSet = [...shuffle([...plotSet])]

            plotsSet.push(shuffledPlotSet)
        }

        let groupsSorted: ITeam[][] = []

        for (let i = 0; i < group.amountGroups!; i++) {

            let groupSorted: ITeam[] = []

            for (let j = 0; j < plotsSet.length; j++) {
                groupSorted.push({ ...plotsSet[j][i], group: i + 1 })
            }

            groupsSorted.push(groupSorted)
        }

        if (group.teamsPerGroup! * group.amountGroups! < group.teams.length) {

            let indexGroup = 0

            for (let i = 0; i < (group.teams.length - (group.teamsPerGroup! * group.amountGroups!)); i++) {
                groupsSorted[indexGroup].push({ ...plotsSet[0][plotsSet[0].length - i - 1], group: indexGroup + 1 })

                if (indexGroup === groupsSorted.length - 1) {
                    indexGroup = 0
                } else {
                    indexGroup++
                }
            }
        }

        for (let i = 0; i < groupsSorted.length; i++) {
            const matches = fixtureGenerate(groupsSorted[i], group.isRoundTripGroupStage!)
            groupsMatches.push(matches)
        }

        return {
            groupsMatches,
            groupsSorted
        }
    }

}

const verifyPlots = (teams: ITeam[], teamsPerGroup: number): ITeam[][] => {

    let plots: ITeam[][] = []

    for (let i = 1; i <= teamsPerGroup; i++) {
        plots.push(teams.filter(t => t.plot === i))
    }

    return plots

}

const isPrime = (n: number): boolean => {
    if (n < 2) return false
    if (n === 2 || n === 3) return true
    if (n % 2 === 0 || n % 3 === 0) return false

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false
        }
    }

    return true
}

const divisors = (n: number): number[] => {
    if (n < 1) return []

    let divisors = [];
    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i !== n / i) {
                divisors.push(n / i);
            }
        }
    }

    return divisors.sort((a, b) => a - b);
}

const getMiddleElement = (n: number): number => {
    let numberOfdivisors = divisors(n)
    let middleIndex = Math.floor(numberOfdivisors.length / 2)
    return numberOfdivisors[middleIndex]
}

const fixtureGenerate = (array: ITeam[], isTrip: boolean) => {

    let matches: IMatch[][] = []

    const lengthArr = array.length % 2 === 0 ? (array.length - 1) : (array.length)

    for (let i = 0; i < (isTrip ? lengthArr * 2 : lengthArr); i++) {

        let matchs: IMatch[] = []

        for (let j = 0; j < (array.length === 2 ? 1 : array.length % 2 === 0 ? Math.ceil(lengthArr / 2) : Math.floor(lengthArr / 2)); j++) {

            if (i > lengthArr - 1) {
                matchs.push({
                    local: {
                        score: null,
                        team: j % 2 !== 0 ? array[array.length - 1 - j] : array[array.length % 2 === 0 ? j : j + 1],
                    },
                    visitant: {
                        score: null,
                        team: j % 2 !== 0 ? array[array.length % 2 === 0 ? j : j + 1] : array[array.length - 1 - j],
                    },
                    referee: "",
                    stadium: "",
                    isEdit: false,
                    statistics: [],
                    summary: [],
                    players: []
                })
            } else {
                matchs.push({
                    local: {
                        score: null,
                        team: j % 2 === 0 ? array[array.length - 1 - j] : array[array.length % 2 === 0 ? j : j + 1],
                    },
                    visitant: {
                        score: null,
                        team: j % 2 === 0 ? array[array.length % 2 === 0 ? j : j + 1] : array[array.length - 1 - j],
                    },
                    referee: "",
                    stadium: "",
                    isEdit: false,
                    statistics: [],
                    summary: [],
                    players: []
                })
            }
        }

        shuffle(matchs)

        matches.push(matchs)

        const element = array.pop()

        if (array.length % 2 !== 0) {
            array.splice(1, 0, element as ITeam)
        } else {
            array.unshift(element as ITeam)
        }

    }

    return matches

}

export const shuffle = (array: any[]): any[] => {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array
}


