import { FlatList } from 'react-native';
import { View } from '../Themed';

import TableStatistic from './components/TableStatistic';

import { ShowStatisticsPropsType } from '@/types/statistics.types';

import { generalStyles } from '@/styles/general.styles';

import { statisticTable } from '@/utils/statistics';

const ShowStatistics = ({ group, colors }: ShowStatisticsPropsType) => {

    return (
        <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
            <FlatList
                style={{ width: '100%' }}
                data={statisticTable(group)}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item, index }) =>
                    <TableStatistic
                        colors={colors}
                        itemStatistic={item}
                        indexStatistic={index}
                    />
                }
            />
        </View>
    );
};

export default ShowStatistics;
