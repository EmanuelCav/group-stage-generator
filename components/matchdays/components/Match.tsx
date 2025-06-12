import { Dimensions, Pressable } from 'react-native'
import { Avatar, DataTable, Text } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '@/components/Themed'

import { MatchPropsType } from '@/types/props.types'

import { groupStyles } from '@/styles/group.styles'

const Match = ({ match, colors, index, handleGetMatch, matchdayNumber, item, group }: MatchPropsType) => {

    return (
        <Pressable onPress={() => handleGetMatch({
            match,
            matchday: matchdayNumber + 1
        })} style={{ backgroundColor: '#ffffff' }}>
            {
                index === 0 && group.matchdayView === "all" && <Text variant='labelLarge' style={[groupStyles.textMatchGroup, { color: colors.primary }]}>
                    {i18n.t("group.title")} {match.local.team.group}
                </Text>
            }
            {index !== 0 && item[index - 1].local.team.group !== match.local.team.group && group.matchdayView === "all" &&
                <Text variant='labelLarge' style={[groupStyles.textMatchGroup, { color: colors.primary }]}>
                    {i18n.t("group.title")} {match.local.team.group}
                </Text>
            }
            <DataTable.Row style={{ borderBottomColor: colors.secondary }}>
                <DataTable.Cell style={groupStyles.rowStart}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {match.local.team.logo ? (
                            <Avatar.Image source={{ uri: match.local.team.logo }} size={24} />
                        ) : (
                            <Avatar.Icon icon="shield-outline" size={24} />
                        )}
                        <Text style={{ marginLeft: Dimensions.get("window").width / 36 }}>{match.local.team.name}</Text>
                    </View>
                </DataTable.Cell>
                {
                    match.isEdit ? <>
                        <DataTable.Cell numeric style={groupStyles.rowContainer}>
                            {match.local.score}
                        </DataTable.Cell>
                        <DataTable.Cell numeric style={groupStyles.rowContainer}>
                            {match.visitant.score}
                        </DataTable.Cell>
                    </> :
                        <DataTable.Cell numeric style={groupStyles.rowContainer}>
                            vs
                        </DataTable.Cell>
                }
                <DataTable.Cell style={groupStyles.rowEnd}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: Dimensions.get("window").width / 36 }}>{match.visitant.team.name}</Text>
                        {match.visitant.team.logo ? (
                            <Avatar.Image source={{ uri: match.visitant.team.logo }} size={24} />
                        ) : (
                            <Avatar.Icon icon="shield-outline" size={24} />
                        )}
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
        </Pressable>
    )
}

export default Match