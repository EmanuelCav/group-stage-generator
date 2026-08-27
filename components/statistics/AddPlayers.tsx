import { View } from 'react-native'
import { Icon, Text, Button } from 'react-native-paper'

import { AddPlayersPropsType } from '@/types/statistics.types'

import { generalStyles } from '@/styles/general.styles'
import { statisticsStyles } from '@/styles/statistics.styles'
import { createStyles } from '@/styles/create.styles'

const AddPlayers = ({ colors, router, t }: AddPlayersPropsType) => {
    return (
        <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
            <Text variant='titleLarge' style={{ color: colors.primary }}>
                {t("statistics")}
            </Text>
            <Icon
                source="chart-bar"
                color={colors.primary}
                size={42}
            />
            <Text variant='bodyLarge' style={statisticsStyles.titleStatistics}>
                {t("addPlayersToDisplayAndVisualizeTournamentStatistics")}
            </Text>
            <Button
                mode="contained"
                icon="account-multiple-plus"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={() => router.replace('/(drawer)/teams')}
            >
                {t("addPlayers")}
            </Button>
        </View>
    );
};

export default AddPlayers