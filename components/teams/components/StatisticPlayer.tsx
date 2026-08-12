import { memo } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { StatisticPlayerPropsType } from '@/types/player.types'

import { teamsStyles } from '@/styles/team.styles'

const StatisticPlayer = memo(({ statistic, colors, isLast, title }: StatisticPlayerPropsType) => {
    return (
        <View style={[teamsStyles.statisticPlayer, {
            borderBottomColor: colors.secondary,
            backgroundColor: colors.tertiary,
            borderBottomWidth: isLast ? 0 : 2
        }]}>
            <Text variant='bodyLarge'>{title}</Text>
            <Text variant='bodyMedium'>{statistic.value}</Text>
        </View>
    )
})

export default StatisticPlayer