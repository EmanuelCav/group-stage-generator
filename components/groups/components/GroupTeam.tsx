import { FlatList, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'

import { View } from '@/components/Themed'

import { GroupTeamPropsType } from '@/types/groups.types'

import { groupStyles } from '@/styles/group.styles'

import { generatePoints } from '@/utils/points'

const GroupTeam = ({ group, colors, groupNumber }: GroupTeamPropsType) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
                <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>PL</Text>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>W</Text>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>D</Text>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>L</Text>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>GF</Text>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>GA</Text>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>+/-</Text>
                    <Text variant='labelMedium' style={groupStyles.headerCell}>PTS</Text>
                </View>
                <FlatList
                    data={generatePoints(group.teams.filter(t => t.group === groupNumber + 1), group.matches!, group)}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View style={groupStyles.row}>
                            <Text variant="bodyMedium" style={groupStyles.cell}>{item.played}</Text>
                            <Text variant="bodyMedium" style={groupStyles.cell}>{item.won}</Text>
                            <Text variant="bodyMedium" style={groupStyles.cell}>{item.tied}</Text>
                            <Text variant="bodyMedium" style={groupStyles.cell}>{item.lost}</Text>
                            <Text variant="bodyMedium" style={groupStyles.cell}>{item.positive}</Text>
                            <Text variant="bodyMedium" style={groupStyles.cell}>{item.negative}</Text>
                            <Text variant="bodyMedium" style={groupStyles.cell}>{item.negative + item.positive}</Text>
                            <Text variant="bodyMedium" style={groupStyles.mainCell}>
                                {(item.won * group.pointsWin!) + (item.tied * group.pointsDraw!) + (item.lost * group.pointsLoss!)}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    )
}

export default GroupTeam