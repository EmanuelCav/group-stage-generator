import { DataTable, Title } from 'react-native-paper';
import { FlatList } from 'react-native';

import Match from './components/Match';

import { SchedulePropsType } from '@/types/matchdays.props';
import { IMatch } from '@/interface/Group';

import { groupStyles } from '@/styles/group.styles';
import { generalStyles } from '@/styles/general.styles';

import { getMatchdaysGroupState } from '@/utils/matchday';

type RenderMatchday = {
    item: IMatch[];
    index: number;
}

const Schedule = ({ group, colors }: SchedulePropsType) => {

    const renderMatchday = ({ item, index }: RenderMatchday) => (
        <DataTable key={index}>
            <Title style={[{ color: colors.primary,  }, generalStyles.titleDataTable]}>
                Matchday {index+1}
            </Title>
            <DataTable.Header style={{ borderBottomColor: colors.primary }}>
                <DataTable.Title style={groupStyles.rowContainer}>Local</DataTable.Title>
                <DataTable.Title numeric style={groupStyles.rowContainer}>Score</DataTable.Title>
                <DataTable.Title style={groupStyles.rowContainer}>Visitant</DataTable.Title>
            </DataTable.Header>
            {
                item.map((match, index) => {
                    return <Match match={match} colors={colors} key={index} />
                })
            }
        </DataTable>
    );

    return (
        <FlatList
            data={getMatchdaysGroupState(group.matches!)}
            renderItem={renderMatchday}
            keyExtractor={(_, index) => index.toString()}
        />
    )
};

export default Schedule;
