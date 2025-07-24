import i18n from '@/i18n'

import { IGroup } from "@/interface/Group";
import { IPlayer, IValueStatistic } from "@/interface/Player";

export const playerStatistics: string[] = [i18n.t("goals"), i18n.t("yellow"), i18n.t("red"), i18n.t("assists")]

export const statisticPlayer = (group: IGroup, player: IPlayer): IValueStatistic[] => {

    let summary: IValueStatistic[] = []

    let goals = 0
    let yellow = 0
    let reds = 0
    let assists = 0

    for (let i = 0; i < group.matches!.length; i++) {
        for (let j = 0; j < group.matches![i].length; j++) {
            for (let k = 0; k < group.matches![i][j].length; k++) {
                for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === i18n.t("goals")).length; t++) {
                    if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("goals"))[t].player?.id === player.id) {
                        goals++
                    }

                    if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("goals"))[t].secondaryPlayer?.id === player.id) {
                        assists++
                    }
                }

                for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === i18n.t("yellow")).length; t++) {
                    if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("yellow"))[t].player?.id === player.id) {
                        yellow++
                    }
                }

                for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === i18n.t("red")).length; t++) {
                    if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("red"))[t].player?.id === player.id) {
                        reds++
                    }
                }
            }
        }
    }

    if (group.eliminationMatches?.length! > 0) {
        for (let i = 0; i < group.eliminationMatches!.length; i++) {
            for (let j = 0; j < group.eliminationMatches![i].length; j++) {
                for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("goals")).length; t++) {
                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("goals"))[t].player?.id === player.id) {
                        goals++
                    }

                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("goals"))[t].secondaryPlayer?.id === player.id) {
                        assists++
                    }
                }

                for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("yellow")).length; t++) {
                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("yellow"))[t].player?.id === player.id) {
                        yellow++
                    }
                }

                for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("red")).length; t++) {
                    if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("red"))[t].player?.id === player.id) {
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
    })

    summary.push({
        player: String(player.name),
        team: String(player.team?.name),
        value: yellow,
    })

    summary.push({
        player: String(player.name),
        team: String(player.team?.name),
        value: reds,
    })

    summary.push({
        player: String(player.name),
        team: String(player.team?.name),
        value: assists,
    })

    return summary
}

export const statisticTable = (group: IGroup): IValueStatistic[][] => {

    let summary: IValueStatistic[][] = [[], [], [], []]

    for (let p = 0; p < group.players?.length!; p++) {

        let goals = 0
        let yellow = 0
        let reds = 0
        let assists = 0

        for (let i = 0; i < group.matches!.length; i++) {
            for (let j = 0; j < group.matches![i].length; j++) {
                for (let k = 0; k < group.matches![i][j].length; k++) {
                    for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === i18n.t("goals")).length; t++) {
                        if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("goals"))[t].player?.id === group.players![p].id) {
                            goals++
                        }

                        if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("goals"))[t].secondaryPlayer?.id === group.players![p].id) {
                            assists++
                        }
                    }

                    for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === i18n.t("yellow")).length; t++) {
                        if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("yellow"))[t].player?.id === group.players![p].id) {
                            yellow++
                        }
                    }

                    for (let t = 0; t < group.matches![i][j][k].summary.filter(s => s.title === i18n.t("red")).length; t++) {
                        if (group.matches![i][j][k].summary.filter(s => s.title === i18n.t("red"))[t].player?.id === group.players![p].id) {
                            reds++
                        }
                    }
                }
            }
        }

        if (group.eliminationMatches?.length! > 0) {
            for (let i = 0; i < group.eliminationMatches!.length; i++) {
                for (let j = 0; j < group.eliminationMatches![i].length; j++) {
                    for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("goals")).length; t++) {
                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("goals"))[t].player?.id === group.players![p].id) {
                            goals++
                        }

                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("goals"))[t].secondaryPlayer?.id === group.players![p].id) {
                            assists++
                        }
                    }

                    for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("yellow")).length; t++) {
                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("yellow"))[t].player?.id === group.players![p].id) {
                            yellow++
                        }
                    }

                    for (let t = 0; t < group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("red")).length; t++) {
                        if (group.eliminationMatches![i][j].summary.filter(s => s.title === i18n.t("red"))[t].player?.id === group.players![p].id) {
                            reds++
                        }
                    }
                }
            }
        }

        if (goals > 0) {
            summary[0].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: goals,
            })
        }

        if (yellow > 0) {
            summary[1].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: yellow,
            })
        }

        if (reds > 0) {
            summary[2].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: reds,
            })
        }

        if (assists > 0) {
            summary[3].push({
                player: String(group.players![p].name),
                team: String(group.players![p].team?.name),
                value: assists,
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

export const showEvents = (group: IGroup): { value: string, label: string }[] => {

    let events: string[] = []
    let eventsValue: { value: string, label: string }[] = []

    if (group.players?.length! > 0) {
        for (let i = 0; i < playerStatistics.length; i++) {
            events.push(playerStatistics[i])
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
