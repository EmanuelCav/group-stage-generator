import { IconButton, Text } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '../Themed'

import { TitleMatchPropsType } from '@/types/match.types'

import { matchStyles } from '@/styles/match.styles'

const TitleMatch = ({ match, colors, hideAndShowUpdateMatch }: TitleMatchPropsType) => {
    return (
        <View style={matchStyles.titleMatch}>
            <Text variant='titleMedium' style={{ color: colors.primary }}>
                {i18n.t("matchday")} {match.matchday}, {i18n.t("group.title")} {match.match?.local.team.group}
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