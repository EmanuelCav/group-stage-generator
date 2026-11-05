import { FlatList, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

import Cell from './components/Cell'

import { FormBadgesPropsType, GroupTeamPropsType } from '@/types/groups.types'

import { groupStyles } from '@/styles/group.styles'

import { getTeamForm } from '@/utils/matchday'

import { useGroupPoints } from '@/hooks/useGroupPoints'

const FormBadges = ({ form, t }: FormBadgesPropsType) => {

    const FORM_CONFIG = {
        WIN: { label: t('group.wins'), color: '#2e7d32', bgColor: '#e8f5e9' },
        LOSS: { label: t('group.losses'), color: '#d32f2f', bgColor: '#ffebee' },
        DRAW: { label: t('group.draws'), color: '#757575', bgColor: '#f5f5f5' },
    }

    return (
        <View style={groupStyles.formBadgesContain}>
            {form.map((result, idx) => {
                const config = FORM_CONFIG[result]
                return (
                    <View
                        key={idx}
                        style={[{ backgroundColor: config.bgColor }, groupStyles.badge]}
                    >
                        <Text style={{ color: config.color, fontSize: 10 }}>
                            {config.label}
                        </Text>
                    </View>
                )
            })}
        </View>
    )
}

const GroupTeam = ({ group, colors, groupNumber, t }: GroupTeamPropsType) => {

    const points = useGroupPoints(group, groupNumber)

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
                {
                    group.pointsMode === "points" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.points')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.played')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell, { minWidth: 76 }]}>{t('group.wins')}-{t('group.draws')}-{t('group.losses')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell, { minWidth: 76 }]}>{t('group.score')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell]}>+/-</Text>
                        <Text variant="labelMedium" style={groupStyles.cellBadge}>
                            {t('streak')}
                        </Text>
                    </View>
                }
                {
                    group.pointsMode === "wins" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.wins')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.played')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.draws')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.losses')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell, { minWidth: 76 }]}>{t('group.score')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell]}>+/-</Text>
                        <Text variant="labelMedium" style={groupStyles.cellBadge}>
                            {t('streak')}
                        </Text>
                    </View>
                }
                {
                    group.pointsMode === "percentage" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>Pct.</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.played')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell, { minWidth: 76 }]}>{t('group.wins')}-{t('group.draws')}-{t('group.losses')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell, { minWidth: 76 }]}>{t('group.score')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell]}>+/-</Text>
                        <Text variant="labelMedium" style={groupStyles.cellBadge}>
                            {t('streak')}
                        </Text>
                    </View>
                }
                {
                    group.pointsMode === "scored" && <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.scored')}</Text>
                        <Text variant="labelMedium" style={groupStyles.headerCell}>{t('group.played')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell, { minWidth: 76 }]}>{t('group.wins')}-{t('group.draws')}-{t('group.losses')}</Text>
                        <Text variant="labelMedium" style={[groupStyles.headerCell]}>+/-</Text>
                        <Text variant="labelMedium" style={groupStyles.cellBadge}>
                            {t('streak')}
                        </Text>
                    </View>
                }
                <FlatList
                    data={points}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => {
                        const teamForm = getTeamForm(group.matches!, group.eliminationMatches!, item)

                        return (
                            <View>
                                {
                                    group.pointsMode === "points" && <View style={[groupStyles.row, , { backgroundColor: colors.tertiary }]}>
                                        <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary, }]}>
                                            <Text variant="titleSmall">
                                                {(item.won * group.pointsWin!) + (item.tied * group.pointsDraw!) + (item.lost * group.pointsLoss!)}
                                            </Text>
                                        </View>
                                        <Cell colors={colors} item={String(item.played)} isMatchCell={false} />
                                        <Cell colors={colors} item={`${item.won} - ${item.tied} - ${item.lost}`} isMatchCell={true} />
                                        <Cell colors={colors} item={`${item.positive}:${item.negative}`} isMatchCell={true} />
                                        <Cell colors={colors} item={String(item.positive - item.negative)} isMatchCell={false} />
                                        <FormBadges form={teamForm} t={t} />
                                    </View>
                                }
                                {
                                    group.pointsMode === "wins" && <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                                        <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary }]}>
                                            <Text variant="titleSmall">
                                                {item.won}
                                            </Text>
                                        </View>
                                        <Cell colors={colors} item={String(item.played)} isMatchCell={false} />
                                        <Cell colors={colors} item={String(item.tied)} isMatchCell={false} />
                                        <Cell colors={colors} item={String(item.lost)} isMatchCell={false} />
                                        <Cell colors={colors} item={`${item.positive}:${item.negative}`} isMatchCell={true} />
                                        <Cell colors={colors} item={String(item.positive - item.negative)} isMatchCell={false} />
                                        <FormBadges form={teamForm} t={t} />
                                    </View>
                                }
                                {
                                    group.pointsMode === "percentage" && <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                                        <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary }]}>
                                            <Text variant="titleSmall">
                                                {(item.won + item.lost > 0
                                                    ? (item.won / (item.won + item.lost)).toFixed(2)
                                                    : '0.00'
                                                )}
                                            </Text>
                                        </View>
                                        <Cell colors={colors} item={String(item.played)} isMatchCell={false} />
                                        <Cell colors={colors} item={`${item.won}-${item.tied}-${item.lost}`} isMatchCell={true} />
                                        <Cell colors={colors} item={`${item.positive}:${item.negative}`} isMatchCell={true} />
                                        <Cell colors={colors} item={String(item.positive - item.negative)} isMatchCell={false} />
                                        <FormBadges form={teamForm} t={t} />
                                    </View>
                                }
                                {
                                    group.pointsMode === "scored" && <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                                        <View style={[groupStyles.mainCell, { backgroundColor: colors.tertiary }]}>
                                            <Text variant="titleSmall">
                                                {item.positive}
                                            </Text>
                                        </View>
                                        <Cell colors={colors} item={String(item.played)} isMatchCell={false} />
                                        <Cell colors={colors} item={`${item.won}-${item.tied}-${item.lost}`} isMatchCell={true} />
                                        <Cell colors={colors} item={String(item.positive - item.negative)} isMatchCell={false} />
                                        <FormBadges form={teamForm} t={t} />
                                    </View>
                                }
                            </View>
                        )
                    }}
                />
            </View>
        </ScrollView >
    )
}

export default GroupTeam