import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import { TitleMatchPropsType } from '@/types/match.types'

import { matchStyles } from '@/styles/match.styles'

const TitleMatch = ({ match, colors, hideAndShowUpdateMatch, t }: TitleMatchPropsType) => {
    return (
        <View style={[matchStyles.titleMatch, { backgroundColor: colors.background }]}>
            <Text variant='titleMedium' style={{ color: colors.primary }}>
                {t("matchday")} {match.matchday}, {t("group.title")} {match.match?.local.team.group}
            </Text>
            <IconButton
                icon="pencil"
                size={24}
                onPress={() => hideAndShowUpdateMatch(true)}
                iconColor={colors.primary}
            />
        </View>
    )
}

export default TitleMatch