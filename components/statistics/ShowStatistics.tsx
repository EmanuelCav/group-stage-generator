import { memo, useMemo } from 'react';
import { FlatList } from 'react-native';
import { View } from '../Themed';

import TableStatistic from './components/TableStatistic';

import { ShowStatisticsPropsType } from '@/types/statistics.types';

import { generalStyles } from '@/styles/general.styles';

import { statisticTable } from '@/utils/statistics';

import { useIsFullName } from '@/hooks/useIsFullName';

const ShowStatistics = memo(({ group, colors }: ShowStatisticsPropsType) => {

    const { isFullName } = useIsFullName()

    const statistic = useMemo(() => {
        return statisticTable(group)
    }, [group, isFullName])

    return (
        <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
            <FlatList
                style={{ width: '100%' }}
                data={statistic}
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
})

export default ShowStatistics;
