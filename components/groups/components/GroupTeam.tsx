import { Dimensions } from 'react-native'
import { Avatar, DataTable, Text } from 'react-native-paper'

import { View } from '@/components/Themed'

import { GroupTeamPropsType } from '@/types/groups.types'

import { groupStyles } from '@/styles/group.styles'

const GroupTeam = ({ team, group, colors }: GroupTeamPropsType) => {
    return (
        <DataTable.Row style={{ borderBottomColor: colors.secondary }} key={team.id}>
            <DataTable.Cell style={groupStyles.rowContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {team.logo ? (
                        <Avatar.Image source={{ uri: team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={24} />
                    )}
                    <Text style={{ marginLeft: Dimensions.get("window").width / 36 }}>{team.name}</Text>
                </View>
            </DataTable.Cell>
            <DataTable.Cell numeric style={groupStyles.rowContainer}>
                {team.points?.played}
            </DataTable.Cell>
            <DataTable.Cell numeric style={groupStyles.rowContainer}>
                {(team.points?.positive as number) + (team.points?.negative as number)}
            </DataTable.Cell>
            <DataTable.Cell numeric style={groupStyles.rowContainer}>
                {(Number(team.points?.won) * Number(group.pointsWin)) +
                    (Number(team.points?.tied) * Number(group.pointsDraw)) +
                    (Number(team.points?.lost) * Number(group.pointsLoss))}
            </DataTable.Cell>
        </DataTable.Row>
    )
}

export default GroupTeam