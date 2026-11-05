import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { TitleMatchPropsType } from '@/types/match.types'

import { matchStyles } from '@/styles/match.styles'

const TitleMatch = ({ match, colors, t }: TitleMatchPropsType) => {
    return (
        <View style={[matchStyles.titleMatch, { backgroundColor: colors.background }]}>
            <Text variant='titleMedium' style={{ color: colors.primary }}>
                {t("matchday")} {match.matchday}, {t("group.title")} {match.match?.local.team.group}
            </Text>
        </View>
    )
}

export default TitleMatch