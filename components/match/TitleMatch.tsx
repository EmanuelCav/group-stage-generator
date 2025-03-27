import { IconButton, Text } from 'react-native-paper'

import { View } from '../Themed'

import { TitleMatchPropsType } from '@/types/match.types'

import { matchStyles } from '@/styles/match.styles'

const TitleMatch = ({ match, colors, hideAndShowUpdateMatch }: TitleMatchPropsType) => {
    return (
        <View style={matchStyles.titleMatch}>
            <Text variant='titleMedium' style={{ color: colors.primary }}>
                Matchday {match.matchday}, Group {match.match?.local.team.group}
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