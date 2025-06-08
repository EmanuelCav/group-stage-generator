import { Button, Text } from 'react-native-paper';
import { FlatList, ScrollView } from 'react-native';
import i18n from '@/i18n'

import { View } from '../Themed';

import { ShowStatisticsPropsType } from '@/types/statistics.types';

import { groupStyles } from '@/styles/group.styles';
import { generalStyles } from '@/styles/general.styles';

import { tableStatistics } from '@/utils/statistics';
import { groupName } from '@/utils/points';

const ShowStatistics = ({ group, colors, hideAndShowAddStatistic }: ShowStatisticsPropsType) => {

    return (
        <View style={generalStyles.containerGeneral}>
            <Button
                mode="contained"
                onPress={() => hideAndShowAddStatistic(true)}
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
            >
                {i18n.t("createStatistic")}
            </Button>
            <View style={groupStyles.groupList}>
                <View>
                    <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                        <Text variant="labelMedium" style={groupStyles.statisticsCellMain}>
                            {i18n.t("player")}
                        </Text>
                        <Text variant="labelMedium" style={groupStyles.statisticsCellMain}>
                            {i18n.t("teamName")}
                        </Text>
                    </View>
                    <FlatList
                        data={tableStatistics(group)}
                        keyExtractor={(_, index) => String(index)}
                        renderItem={({ item }: { item: { [key: string]: number } }) => (
                            <View style={groupStyles.row}>
                                {Object.entries(item)
                                    .slice(0, 2)
                                    .map(([key, value]) => (
                                        <View key={key} style={groupStyles.cellStatisticMain}>
                                            <Text variant="bodyMedium">
                                                {key === "team" ? groupName(String(value)) : value}
                                            </Text>
                                        </View>
                                    ))}
                            </View>
                        )}
                    />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View>
                        <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                            {group.players![0].statistics?.map((statistic) => {
                                return (
                                    <Text
                                        variant="labelMedium"
                                        key={statistic.id}
                                        style={groupStyles.statisticsCell}
                                    >
                                        {statistic.title}
                                    </Text>
                                );
                            })}
                        </View>
                        <FlatList
                            data={tableStatistics(group)}
                            keyExtractor={(_, index) => String(index)}
                            renderItem={({ item }: { item: { [key: string]: number } }) => (
                                <View style={groupStyles.row}>
                                    {Object.entries(item)
                                        .slice(2, Object.entries(item).length)
                                        .map(([key, value]) => (
                                            <View key={key} style={groupStyles.cellStatistic}>
                                                <Text variant="bodyMedium">{value}</Text>
                                            </View>
                                        ))}
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ShowStatistics;
