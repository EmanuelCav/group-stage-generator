import { IGroup } from "@/interface/Group";

export const tableStatistics = (group: IGroup): { [key: string]: number }[] => {
    const statistics: { [key: string]: number }[] = [];

    for (let i = 0; i < group.players!.length; i++) {
        const statistic: { [key: string]: any } = {
            "player": group.players![i].name,
            "team": group.players![i].team?.name
        };

        for (let j = 0; j < group.players![i].statistics?.length!; j++) {
            statistic[`value${j + 1}`] = group.players![i].statistics![j].value!;
        }

        statistics.push(statistic);
    }

    return statistics;
}

export const namePlayerStatistic = (name: string): string => {

    const nameSplit = name.split(" ")

    if (nameSplit.length === 1) {
        return name.slice(0, name.length >= 12 ? 12 : name.length) + `${name.length > 12 ? "..." : ""}`
    }

    if (nameSplit.length >= 2) {
        return `${nameSplit[0].slice(0, nameSplit[0].length >= 12 ? 12 : nameSplit[0].length)}.` 
        + " " + `${nameSplit[1].slice(0, nameSplit[1].length >= 12 ? 12 : nameSplit[1].length)}${nameSplit[1].length > 12 ? "..." : ""}`
    }

    return name.slice(0, name.length >= 12 ? 12 : name.length) + `${name.length > 12 ? "..." : ""}`

}
