import { Button, DataTable } from 'react-native-paper';
import { FlatList } from 'react-native';

import { View } from '../Themed';
import Statistic from './components/Statistic';

import { IPlayer } from '@/interface/Player';
import { ShowStatisticsPropsType } from '@/types/statistics.types';

import { groupStyles } from '@/styles/group.styles';
import { generalStyles } from '@/styles/general.styles';

const ShowStatistics = ({ group, colors, hideAndShowAddStatistic }: ShowStatisticsPropsType) => {

    const renderStatistic = ({ item }: { item: IPlayer }) => (
        <Statistic player={item} colors={colors} />
    );

    return (
        <View style={generalStyles.containerGeneral}>
            <DataTable>
                <Button mode="contained" onPress={() => hideAndShowAddStatistic(true)}
                    style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                    labelStyle={{ color: "#ffffff" }} >
                    CREATE STATISTIC
                </Button>
                <DataTable.Header style={{ borderBottomColor: colors.primary }}>
                    <DataTable.Title style={groupStyles.rowStart}>Player</DataTable.Title>
                    {
                        group.players![0].statistics?.slice(0, 2).map((statistic) => {
                            return <DataTable.Title key={statistic.id} style={groupStyles.rowContainer}>
                                {statistic.title}
                            </DataTable.Title>
                        })
                    }
                    <DataTable.Title style={groupStyles.rowEnd}>Team</DataTable.Title>
                </DataTable.Header>
                <FlatList
                    data={group.players as IPlayer[]}
                    renderItem={renderStatistic}
                    keyExtractor={(_, index) => index.toString()}
                />
                <Button mode="text" onPress={() => { }}
                    style={generalStyles.generateButton}
                    labelStyle={{ color: colors.primary }}>
                    SHOW FULL TABLE ➤
                </Button>
            </DataTable>
        </View>
    )
};

export default ShowStatistics;
