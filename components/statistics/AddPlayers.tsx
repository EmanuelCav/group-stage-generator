import { Icon, Text, Button } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '../Themed'

import { AddPlayersPropsType } from '@/types/statistics.types'

import { generalStyles } from '@/styles/general.styles'
import { statisticsStyles } from '@/styles/statistics.styles'
import { createStyles } from '@/styles/create.styles'

const AddPlayers = ({ colors, router }: AddPlayersPropsType) => {
    return (
        <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
            <Text variant='titleLarge' style={{ color: colors.primary }}>
                {i18n.t("statistics")}
            </Text>
            <Icon
                source="chart-bar"
                color={colors.primary}
                size={42}
            />
            <Text variant='bodyLarge' style={statisticsStyles.titleStatistics}>
                {i18n.t("addPlayersToDisplayAndVisualizeTournamentStatistics")}
            </Text>
            <Button
                mode="contained"
                icon="account-multiple-plus"
                style={[{ backgroundColor: colors.primary }, createStyles.buttonAdd]}
                labelStyle={{ color: "#ffffff" }}
                onPress={() => router.replace('/players')}
            >
                {i18n.t("addPlayers")}
            </Button>
        </View>
    );
};

export default AddPlayers