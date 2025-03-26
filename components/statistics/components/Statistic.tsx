import { DataTable } from "react-native-paper"

import { StatisticPropsType } from "@/types/statistics.types"

import { groupStyles } from "@/styles/group.styles"

const Statistic = ({ player, colors }: StatisticPropsType) => {
    return (
        <DataTable.Row style={{ borderBottomColor: colors.secondary }}>
            <DataTable.Cell style={groupStyles.rowContainer}>
                {player.name}
            </DataTable.Cell>
            {
                player.statistics?.slice(0, 2).map((statistic) => {
                    return <DataTable.Cell key={statistic.id} numeric style={groupStyles.rowContainer}>
                        {statistic.value}
                    </DataTable.Cell>
                })
            }
            <DataTable.Cell style={groupStyles.rowContainer}>
                {player.team?.name}
            </DataTable.Cell>
        </DataTable.Row>
    )
}

export default Statistic