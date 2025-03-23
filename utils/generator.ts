import { IGroup, IMatch } from "@/interface/Group"
import { ITeam } from "@/interface/Team"

export const groupGenerator = (group: IGroup): IMatch[][][] => {

    let groupsMatches: IMatch[][][] = []
    let shuffledPlots: ITeam[][] = []
    let plots = verifyPlots(group.teams, group.teamsPerGroup!)

    if (plots.length === 1) {
        if (isPrime(plots[0].length)) {
            shuffle(plots[0])
            shuffledPlots = [...plots]
        } else {
            const numberOfGroups = getMiddleElement(group.teams.length)
            shuffle(plots[0])
            let index = 0

            for (let i = 0; i < numberOfGroups; i++) {
                let arr = []

                for (let j = 0; j < group.teams.length / numberOfGroups; j++) {
                    arr.push(plots[0][index])
                    index++
                }

                shuffledPlots.push(arr)
            }

        }
    } else {
        for (let i = 0; i < plots.length; i++) {
            shuffle(plots[i])
        }

        shuffledPlots = [...plots]
    }

    let plotsSet: ITeam[][] = []

    for (let i = 0; i < shuffledPlots.length; i++) {

        let plotSet: ITeam[] = []

        for (let j = 0; j < shuffledPlots[i].length; j++) {
            plotSet.push({ ...shuffledPlots[i][j], plot: i + 1 })
        }

        shuffle(plotSet)
        plotsSet.push(plotSet)
    }

    let groupsSorted: ITeam[][] = []

    for (let i = 0; i < plotsSet[0].length; i++) {

        let groupSorted: ITeam[] = []

        for (let j = 0; j < plotsSet.length; j++) {
            groupSorted.push({ ...plotsSet[j][i], group: i + 1 })
        }

        groupsSorted.push(groupSorted)
    }

    for (let i = 0; i < groupsSorted.length; i++) {
        const matches = fixtureGenerate(groupsSorted[i], group.isRoundTripGroupStage!)
        groupsMatches.push(matches)
    }

    return groupsMatches
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

    for (let i = 0; i < lengthArr; i++) {

        let matchs: IMatch[] = []

        for (let j = 0; j < Math.ceil(lengthArr / 2); j++) {
            matchs.push({
                local: {
                    score: 0,
                    team: j % 2 === 0 ? array[array.length - 1 - j] : array[array.length % 2 === 0 ? j : j + 1],
                },
                visitant: {
                    score: 0,
                    team: j % 2 === 0 ? array[array.length % 2 === 0 ? j : j + 1] : array[array.length - 1 - j],
                },
                referee: "",
                stadium: "",
                isEdit: false
            })
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

const shuffle = (array: any[]) => {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}


