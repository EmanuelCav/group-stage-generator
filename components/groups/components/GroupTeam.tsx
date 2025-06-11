import { FlatList, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '@/components/Themed'

import { GroupTeamPropsType } from '@/types/groups.types'

import { groupStyles } from '@/styles/group.styles'

import { generatePoints } from '@/utils/points'

const GroupTeam = ({ group, colors, groupNumber }: GroupTeamPropsType) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
                {
                    group.matchdayView === "points" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.points')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.played')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.wins')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.draws')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.losses')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.score')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>+/-</Text>
                    </View>
                }
                {
                    group.matchdayView === "wins" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.played')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.wins')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.draws')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.losses')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.score')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>+/-</Text>
                    </View>
                }
                {
                    group.matchdayView === "percentage" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>Pct.</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.played')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.wins')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.draws')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.losses')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.score')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>+/-</Text>
                    </View>
                }
                {
                    group.matchdayView === "scored" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.score')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.played')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.wins')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.draws')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.losses')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>+/-</Text>
                    </View>
                }
                <FlatList
                    data={generatePoints(group.teams.filter(t => t.group === groupNumber + 1), group.matches!, group)}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View>
                            {
                                group.matchdayView === "points" && <View style={groupStyles.row}>
                                    <View style={groupStyles.mainCell}>
                                        <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                                            {(item.won * group.pointsWin!) + (item.tied * group.pointsDraw!) + (item.lost * group.pointsLoss!)}
                                        </Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.played}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.won}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.tied}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.lost}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.positive}:{item.negative}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.positive - item.negative}</Text>
                                    </View>
                                </View>
                            }
                            {
                                group.matchdayView === "wins" && <View style={groupStyles.row}>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.played}</Text>
                                    </View>
                                    <View style={groupStyles.mainCell}>
                                        <Text variant="bodyMedium">{item.won}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.tied}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.lost}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.positive}:{item.negative}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.positive - item.negative}</Text>
                                    </View>
                                </View>
                            }
                            {
                                group.matchdayView === "percentage" && <View style={groupStyles.row}>
                                    <View style={groupStyles.mainCell}>
                                        <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                                            {item.won / (item.won + item.lost)}
                                        </Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.played}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.won}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.tied}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.lost}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.positive}:{item.negative}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.positive - item.negative}</Text>
                                    </View>
                                </View>
                            }
                            {
                                group.matchdayView === "scored" && <View style={groupStyles.row}>
                                    <View style={groupStyles.mainCell}>
                                        <Text variant="bodyMedium">{item.positive}:{item.negative}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.played}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.won}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.tied}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.lost}</Text>
                                    </View>
                                    <View style={groupStyles.cell}>
                                        <Text variant="bodyMedium">{item.positive - item.negative}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    )
}

export default GroupTeam