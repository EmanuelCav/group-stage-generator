import { Text } from 'react-native-paper'

import { View } from '@/components/Themed'

import { StatisticPlayerPropsType } from '@/types/player.types'

import { createStyles } from '@/styles/create.styles'

const StatisticPlayer = ({ statistic, colors, isLast, title }: StatisticPlayerPropsType) => {
    return (
        <View style={[createStyles.statisticPlayer, { borderBottomColor: colors.secondary, backgroundColor: colors.tertiary, 
        borderBottomWidth: isLast ? 0 : 2 }]}>
            <Text variant='bodyLarge'>{title}</Text>
            <Text variant='bodyMedium'>{statistic.value}</Text>
        </View>
    )
}

export default StatisticPlayer