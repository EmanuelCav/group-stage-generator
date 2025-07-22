import { FlatList, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '@/components/Themed'
import Cell from './components/Cell'

import { GroupTeamPropsType } from '@/types/groups.types'

import { groupStyles } from '@/styles/group.styles'

import { generatePoints } from '@/utils/points'

const GroupTeam = ({ group, colors, groupNumber }: GroupTeamPropsType) => {

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
                {
                    group.pointsMode === "points" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
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
                    group.pointsMode === "wins" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.wins')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.played')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.draws')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.losses')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.score')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>+/-</Text>
                    </View>
                }
                {
                    group.pointsMode === "percentage" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
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
                    group.pointsMode === "scored" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('group.scored')}</Text>
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
                        <View style={{ backgroundColor: "#f00" }}>
                            {
                                group.pointsMode === "points" && <View style={[groupStyles.row, , { backgroundColor: colors.tertiary }]}>
                                    <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary }]}>
                                        <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                                            {(item.won * group.pointsWin!) + (item.tied * group.pointsDraw!) + (item.lost * group.pointsLoss!)}
                                        </Text>
                                    </View>
                                    <Cell colors={colors} item={String(item.played)} />
                                    <Cell colors={colors} item={String(item.won)} />
                                    <Cell colors={colors} item={String(item.tied)} />
                                    <Cell colors={colors} item={String(item.lost)} />
                                    <Cell colors={colors} item={`${item.positive}:${item.negative}`} />
                                    <Cell colors={colors} item={String(item.positive - item.negative)} />
                                </View>
                            }
                            {
                                group.pointsMode === "wins" && <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                                    <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary }]}>
                                        <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                                            {item.won}
                                        </Text>
                                    </View>
                                    <Cell colors={colors} item={String(item.played)} />
                                    <Cell colors={colors} item={String(item.tied)} />
                                    <Cell colors={colors} item={String(item.lost)} />
                                    <Cell colors={colors} item={`${item.positive}:${item.negative}`} />
                                    <Cell colors={colors} item={String(item.positive - item.negative)} />
                                </View>
                            }
                            {
                                group.pointsMode === "percentage" && <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                                    <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary }]}>
                                        <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                                            {(item.won + item.lost > 0
                                                ? (item.won / (item.won + item.lost)).toFixed(2)
                                                : '0.00'
                                            )}
                                        </Text>
                                    </View>
                                    <Cell colors={colors} item={String(item.played)} />
                                    <Cell colors={colors} item={String(item.won)} />
                                    <Cell colors={colors} item={String(item.tied)} />
                                    <Cell colors={colors} item={String(item.lost)} />
                                    <Cell colors={colors} item={`${item.positive}:${item.negative}`} />
                                    <Cell colors={colors} item={String(item.positive - item.negative)} />
                                </View>
                            }
                            {
                                group.pointsMode === "scored" && <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                                    <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary }]}>
                                        <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                                            {item.positive}
                                        </Text>
                                    </View>
                                    <Cell colors={colors} item={String(item.played)} />
                                    <Cell colors={colors} item={String(item.won)} />
                                    <Cell colors={colors} item={String(item.tied)} />
                                    <Cell colors={colors} item={String(item.lost)} />
                                    <Cell colors={colors} item={String(item.positive - item.negative)} />
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