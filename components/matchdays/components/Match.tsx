import { memo } from 'react'
import { Pressable, View } from 'react-native'
import { Avatar, DataTable, Text } from 'react-native-paper'

import CustomPicker from '@/components/general/CustomPicker'

import { MatchPropsType } from '@/types/props.types'

import { groupStyles } from '@/styles/group.styles'

import { groupName, nameParticipant } from '@/utils/points'
import { getGroupUpdateTeamMatch, getIndexMatchGroup } from '@/utils/matchday'

import { useIsFullName } from '@/hooks/useIsFullName'

const Match = memo(({ match, colors, index, handleGetMatch, matchdayNumber, item, group, spacing, isEditMode, handleUpdateTeamMatch, t }: MatchPropsType) => {

    const { isFullName } = useIsFullName()

    return (
        <Pressable onPress={!isEditMode ? () => handleGetMatch({
            match,
            matchday: matchdayNumber + 1,
        }) : () => { }} style={{ backgroundColor: colors.tertiary }}>
            {
                index === 0 && !isEditMode && group.matchdayView === "all" && <Text variant='labelLarge' style={[groupStyles.textMatchGroup, { color: colors.primary }]}>
                    {t("group.title")} {match.local.team.group}
                </Text>
            }
            {
                index !== 0 && !isEditMode && item[index - 1].local.team.group !== match.local.team.group && group.matchdayView === "all" && group.matches?.length! > 1 &&
                <Text variant='labelLarge' style={[groupStyles.textMatchGroup, { color: colors.primary }]}>
                    {t("group.title")} {match.local.team.group}
                </Text>
            }
            <DataTable.Row style={{ borderBottomColor: colors.secondary }}>
                <DataTable.Cell style={[groupStyles.rowStart]}>
                    {
                        isEditMode ?
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.tertiary, borderColor: colors.primary, borderWidth: 1 }}>
                                <CustomPicker
                                    title={t('select_team')}
                                    value={match.local.team.name!}
                                    colors={colors}
                                    items={group.teams.map(team => ({
                                        label: team.name!,
                                        value: team.name!,
                                    }))}
                                    onChange={(teamValue) => {
                                        const updatedMatch = getGroupUpdateTeamMatch(
                                            group.matches!,
                                            match,
                                            matchdayNumber
                                        )

                                        handleUpdateTeamMatch(
                                            updatedMatch,
                                            matchdayNumber,
                                            getIndexMatchGroup(
                                                updatedMatch,
                                                matchdayNumber,
                                                group.matches!,
                                                match
                                            ),
                                            true,
                                            group.teams.find(team => team.name === teamValue)!
                                        )
                                    }}
                                />
                            </View>
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.tertiary }}>
                                {match.local.team.logo ? (
                                    <Avatar.Image source={{ uri: match.local.team.logo }} size={24} />
                                ) : (
                                    <Avatar.Icon icon="shield-outline" size={24} color='#ffffff' style={{ backgroundColor: match.local.team.color }} />
                                )}
                                <Text variant={isFullName ? 'bodySmall' : 'bodyMedium'} style={{ marginLeft: spacing.w36 }}>
                                    {
                                        isFullName ? nameParticipant(match.local.team.name!) : groupName(match.local.team.name!)
                                    }
                                </Text>
                            </View>
                    }
                </DataTable.Cell>
                {
                    match.isEdit ? <>
                        <DataTable.Cell
                            numeric
                            style={[
                                groupStyles.rowContainer,
                                groupStyles.smallScoreCell
                            ]}>
                            {match.local.score}
                        </DataTable.Cell>
                        <DataTable.Cell
                            numeric
                            style={[
                                groupStyles.rowContainer,
                                groupStyles.smallScoreCell
                            ]}
                        >
                            {match.visitant.score}
                        </DataTable.Cell>
                    </> :
                        <DataTable.Cell numeric style={[groupStyles.rowContainer, groupStyles.smallScoreCell]}>
                            vs
                        </DataTable.Cell>
                }
                <DataTable.Cell style={groupStyles.rowEnd}>
                    {
                        isEditMode ?
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: colors.tertiary, borderColor: colors.primary, borderWidth: 1 }}>
                                <CustomPicker
                                    title={t('select_team')}
                                    value={match.visitant.team.name!}
                                    colors={colors}
                                    items={group.teams.map(team => ({
                                        label: team.name!,
                                        value: team.name!,
                                    }))}
                                    onChange={(teamValue) => {
                                        const updatedMatch = getGroupUpdateTeamMatch(
                                            group.matches!,
                                            match,
                                            matchdayNumber
                                        )

                                        handleUpdateTeamMatch(
                                            updatedMatch,
                                            matchdayNumber,
                                            getIndexMatchGroup(
                                                updatedMatch,
                                                matchdayNumber,
                                                group.matches!,
                                                match
                                            ),
                                            false,
                                            group.teams.find(team => team.name === teamValue)!
                                        )
                                    }}
                                />
                            </View>
                            :
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.tertiary }}>
                                <Text variant={isFullName ? 'bodySmall' : 'bodyMedium'} style={{ marginRight: spacing.w36 }}>
                                    {
                                        isFullName ? nameParticipant(match.visitant.team.name!) : groupName(match.visitant.team.name!)
                                    }
                                </Text>
                                {match.visitant.team.logo ? (
                                    <Avatar.Image source={{ uri: match.visitant.team.logo }} size={24} />
                                ) : (
                                    <Avatar.Icon icon="shield-outline" size={24} color='#ffffff' style={{ backgroundColor: match.visitant.team.color }} />
                                )}
                            </View>
                    }
                </DataTable.Cell>
            </DataTable.Row>
        </Pressable>
    )
})

export default Match