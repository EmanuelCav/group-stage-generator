import { IGroup } from "@/interface/Group";
import { IPlayer, IValueStatistic } from "@/interface/Player";

export const statisticPlayer = (group: IGroup, player: IPlayer): IValueStatistic[] => {

    let summary: IValueStatistic[] = []

    let goals = 0
    let yellow = 0
    let reds = 0
    let assists = 0

    for (let i = 0; i < group.matches!.length; i++) {
        for (let j = 0; j < group.matches![i].length; j++) {
            for (let k = 0; k < group.matches![i][j].length; k++) {
                for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === "goal").length; t++) {
                    if (group.matches![i][j][k].summary.filter(s => s.title === "goal")[t].player?.id === player.id) {
                        goals++
                    }

                    if (group.matches![i][j][k].summary.filter(s => s.title === "goal")[t].secondaryPlayer?.id === player.id) {
                        assists++
                    }
                }

                for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === "yellow card").length; t++) {
                    if (group.matches![i][j][k].summary.filter(s => s.title === "yellow card")[t].player?.id === player.id) {
                        yellow++
                    }
                }

                for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === "red card").length; t++) {
                    if (group.matches![i][j][k].summary.filter(s => s.title === "red card")[t].player?.id === player.id) {
                        reds++
                    }
                }
            }
        }
    }

    if (group.eliminationMatches?.length! > 0) {
        for (let i = 0; i < group.eliminationMatches!.length; i++) {
            for (let j = 0; j < group.eliminationMatches![i].length; j++) {
                for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === "goal").length; t++) {
                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === "goal")[t].player?.id === player.id) {
                        goals++
                    }

                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === "goal")[t].secondaryPlayer?.id === player.id) {
                        assists++
                    }
                }

                for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === "yellow card").length; t++) {
                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === "yellow card")[t].player?.id === player.id) {
                        yellow++
                    }
                }

                for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === "red card").length; t++) {
                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === "red card")[t].player?.id === player.id) {
                        reds++
                    }
                }
            }
        }
    }

    summary.push({
        player: String(player.name),
        team: String(player.team?.name),
        value: goals,
        logo: String(player.team?.logo),
        color: String(player.team?.color)
    })

    summary.push({
        player: String(player.name),
        team: String(player.team?.name),
        value: yellow,
        logo: String(player.team?.logo),
        color: String(player.team?.color)
    })

    summary.push({
        player: String(player.name),
        team: String(player.team?.name),
        value: reds,
        logo: String(player.team?.logo),
        color: String(player.team?.color)
    })

    summary.push({
        player: String(player.name),
        team: String(player.team?.name),
        value: assists,
        logo: String(player.team?.logo),
        color: String(player.team?.color)
    })

    return summary
}

export const statisticTable = (group: IGroup, statisticView: string): IValueStatistic[][] => {

    let summary: IValueStatistic[][] = [[], [], [], []]

    for (let p = 0; p < group.players?.length!; p++) {

        let goals = 0
        let yellow = 0
        let reds = 0
        let assists = 0

        for (let i = 0; i < group.matches!.length; i++) {
            for (let j = 0; j < group.matches![i].length; j++) {
                for (let k = 0; k < group.matches![i][j].length; k++) {
                    for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === "goal").length; t++) {
                        if (group.matches![i][j][k].summary.filter(s => s.title === "goal")[t].player?.id === group.players![p].id) {
                            goals++
                        }

                        if (group.matches![i][j][k].summary.filter(s => s.title === "goal")[t].secondaryPlayer?.id === group.players![p].id) {
                            assists++
                        }
                    }

                    for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === "yellow card").length; t++) {
                        if (group.matches![i][j][k].summary.filter(s => s.title === "yellow card")[t].player?.id === group.players![p].id) {
                            yellow++
                        }
                    }

                    for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === "red card").length; t++) {
                        if (group.matches![i][j][k].summary.filter(s => s.title === "red card")[t].player?.id === group.players![p].id) {
                            reds++
                        }
                    }
                }
            }
        }

        if (group.eliminationMatches?.length! > 0) {
            for (let i = 0; i < group.eliminationMatches!.length; i++) {
                for (let j = 0; j < group.eliminationMatches![i].length; j++) {
                    for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === "goal").length; t++) {
                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === "goal")[t].player?.id === group.players![p].id) {
                            goals++
                        }

                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === "goal")[t].secondaryPlayer?.id === group.players![p].id) {
                            assists++
                        }
                    }

                    for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === "yellow card").length; t++) {
                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === "yellow card")[t].player?.id === group.players![p].id) {
                            yellow++
                        }
                    }

                    for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === "red card").length; t++) {
                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === "red card")[t].player?.id === group.players![p].id) {
                            reds++
                        }
                    }
                }
            }
        }

        if (goals > 0 && (statisticView === "all" || statisticView === "goal")) {
            summary[0].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: goals,
                logo: String(group.players![p].team?.logo),
                color: String(group.players![p].team?.color)
            })
        }

        if (yellow > 0 && (statisticView === "all" || statisticView === "yellow card")) {
            summary[1].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: yellow,
                logo: String(group.players![p].team?.logo),
                color: String(group.players![p].team?.color)
            })
        }

        if (reds > 0 && (statisticView === "all" || statisticView === "red card")) {
            summary[2].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: reds,
                logo: String(group.players![p].team?.logo),
                color: String(group.players![p].team?.color)
            })
        }

        if (assists > 0 && (statisticView === "all" || statisticView === "assist")) {
            summary[3].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: assists,
                logo: String(group.players![p].team?.logo),
                color: String(group.players![p].team?.color)
            })
        }

    }

    summary = summary.map(array =>
        array
            .sort((a, b) => b.value - a.value)
            .slice(0, 10)
    )

    return summary
}

export const showEvents = (group: IGroup, t: (scope: string, options?: object | undefined) => string): { value: string, label: string }[] => {

    let events: string[] = []
    let eventsValue: { value: string, label: string }[] = []

    if (group.players?.length! > 0) {
        for (let i = 0; i < [t("goals"), t("yellow"), t("red"), t("assists")].length; i++) {
            events.push([t("goals"), t("yellow"), t("red"), t("assists")][i])
        }
    }

    for (let i = 0; i < events.length; i++) {
        eventsValue.push({
            label: events[i],
            value: events[i]
        })
    }

    return eventsValue

}

export const namePlayerStatistic = (name: string): string => {

    const nameSplit = name.split(" ")

    if (nameSplit.length === 1) {
        return name.slice(0, name.length >= 12 ? 12 : name.length) + `${name.length > 12 ? "..." : ""}`
    }

    if (nameSplit.length >= 2) {
        return `${nameSplit[0].slice(0, 1)}.`
            + " " + `${nameSplit[1].slice(0, nameSplit[1].length >= 12 ? 12 : nameSplit[1].length)}${nameSplit[1].length > 12 ? "..." : ""}`
    }

    return name.slice(0, name.length >= 12 ? 12 : name.length) + `${name.length > 12 ? "..." : ""}`

}
