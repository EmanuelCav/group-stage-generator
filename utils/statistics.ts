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
};
