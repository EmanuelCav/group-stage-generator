import { Icon, Text, Button } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '../Themed'

import { AddStatisticsPropsType } from '@/types/statistics.types'

import { generalStyles } from '@/styles/general.styles'
import { statisticsStyles } from '@/styles/statistics.styles'
import { createStyles } from '@/styles/create.styles'

const AddStatistics = ({ colors, hideAndShowAddStatistic }: AddStatisticsPropsType) => {
    return (
        <View style={generalStyles.containerGeneral}>
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
                onPress={() => hideAndShowAddStatistic(true)}
            >
                {i18n.t("addStatistics")}
            </Button>
        </View>
    );
};

export default AddStatistics