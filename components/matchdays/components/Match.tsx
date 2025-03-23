import { Dimensions } from 'react-native'
import { Avatar, DataTable, Text } from 'react-native-paper'

import { View } from '@/components/Themed'

import { MatchPropsType } from '@/types/props.types'

import { groupStyles } from '@/styles/group.styles'

const Match = ({ match, colors }: MatchPropsType) => {
    return (
        <DataTable.Row style={{ borderBottomColor: colors.secondary }}>
            <DataTable.Cell style={groupStyles.rowContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {match.local.team.logo ? (
                        <Avatar.Image source={{ uri: match.local.team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={24} />
                    )}
                    <Text style={{ marginLeft: Dimensions.get("window").width / 36 }}>{match.local.team.name}</Text>
                </View>
            </DataTable.Cell>
            <DataTable.Cell numeric style={groupStyles.rowContainer}>
                {match.local.score}
            </DataTable.Cell>
            <DataTable.Cell numeric style={groupStyles.rowContainer}>
                {match.visitant.score}
            </DataTable.Cell>
            <DataTable.Cell style={groupStyles.rowContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {match.visitant.team.logo ? (
                        <Avatar.Image source={{ uri: match.visitant.team.logo }} size={24} />
                    ) : (
                        <Avatar.Icon icon="shield-outline" size={24} />
                    )}
                    <Text style={{ marginLeft: Dimensions.get("window").width / 36 }}>{match.visitant.team.name}</Text>
                </View>
            </DataTable.Cell>
        </DataTable.Row>
    )
}

export default Match