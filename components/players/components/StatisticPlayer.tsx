import { Pressable } from 'react-native'
import { Text } from 'react-native-paper'

import { StatisticPlayerPropsType } from '@/types/player.types'

import { createStyles } from '@/styles/create.styles'

const StatisticPlayer = ({ statistic, colors, isLast, handleUpdateStatistic }: StatisticPlayerPropsType) => {
    return (
        <Pressable style={[createStyles.statisticPlayer, { borderBottomColor: colors.secondary, 
        borderBottomWidth: isLast ? 0 : 2 }]} onPress={() => handleUpdateStatistic(statistic)}>
            <Text variant='bodyLarge'>{statistic.title}</Text>
            <Text variant='bodyMedium'>{statistic.value}</Text>
        </Pressable>
    )
}

export default StatisticPlayer