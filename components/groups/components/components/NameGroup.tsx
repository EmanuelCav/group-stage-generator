import { memo } from 'react'
import { Avatar, Text } from 'react-native-paper'

import { View } from '@/components/Themed'

import { NameGroupPropsType } from '@/types/groups.types'

import { groupStyles } from '@/styles/group.styles'

import { groupName, nameParticipant } from '@/utils/points'

const NameGroup = memo(({ colors, index, item, isFullName, spacing }: NameGroupPropsType) => {
    return (
        <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
            <View style={[groupStyles.cellPosition, { backgroundColor: colors.tertiary }]}>
                <Text variant="bodyMedium">{index + 1}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.tertiary }}>
                {item.logo ? (
                    <Avatar.Image source={{ uri: item.logo }} size={32} />
                ) : (
                    <Avatar.Icon icon="shield-outline" color="#ffffff" style={{ backgroundColor: item.color }} size={32} />
                )}
                <View style={[groupStyles.teamCell, {
                    backgroundColor: colors.tertiary, width: isFullName ? spacing.w3 : spacing.w6,
                    alignItems: isFullName ? 'flex-start' : 'center', paddingLeft: isFullName ? spacing.w57 : 0
                }]}>
                    {
                        isFullName ? <Text variant="bodySmall" style={{ fontFamily: 'Raleway_SemiBold' }}>{nameParticipant(item.name)}</Text> :
                            <Text variant="bodyMedium" style={{ fontFamily: 'Raleway_SemiBold' }}>{groupName(item.name)}</Text>
                    }
                </View>
            </View>
        </View>
    )
})

export default NameGroup