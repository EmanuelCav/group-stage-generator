import { Icon, Text, Button } from 'react-native-paper'

import { View } from '../Themed'

import { AddPlayersPropsType } from '@/types/statistics.types'

import { generalStyles } from '@/styles/general.styles'
import { statisticsStyles } from '@/styles/statistics.styles'
import { createStyles } from '@/styles/create.styles'

const AddPlayers = ({ colors, router }: AddPlayersPropsType) => {
    return (
        <View style={generalStyles.containerGeneral}>
            <Text variant='titleLarge' style={{ color: colors.primary }}>Statistics</Text>
            <Icon
                source="chart-bar"
                color={colors.primary}
                size={42}

            />
            <Text variant='bodyLarge' style={statisticsStyles.titleStatistics}>
                Add players to display and visualize tournament statistics
            </Text>
            <Button
                mode="contained"
                icon="account-multiple-plus"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={() => router.push('/players')}
            >
                ADD PLAYERS
            </Button>
        </View>
    )
}

export default AddPlayers