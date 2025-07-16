import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { View } from '../Themed';
import i18n from '@/i18n'

import TableStatistic from './components/TableStatistic';

import { ShowStatisticsPropsType } from '@/types/statistics.types';

import { generalStyles } from '@/styles/general.styles';

import { statisticTable } from '@/utils/statistics';

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
            <FlatList
                style={{ width: '100%' }}
                data={statisticTable(group)}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item }) =>
                    <TableStatistic
                        group={group}
                        colors={colors}
                        item={item}
                    />
                }
            />
        </View>
    );
};

export default ShowStatistics;
