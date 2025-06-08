import { DataTable, Title } from 'react-native-paper';
import { FlatList } from 'react-native';
import i18n from '@/i18n'

import Match from './components/Match';

import { SchedulePropsType } from '@/types/matchdays.props';
import { IMatch } from '@/interface/Match';

import { groupStyles } from '@/styles/group.styles';
import { generalStyles } from '@/styles/general.styles';

import { getMatchdaysGroupState } from '@/utils/matchday';

type RenderMatchday = {
    item: IMatch[];
    index: number;
}

const Schedule = ({ group, colors, handleGetMatch }: SchedulePropsType) => {

    const renderMatchday = ({ item, index }: RenderMatchday) => (
        <DataTable key={index}>
            <Title
                style={[{ color: colors.primary }, generalStyles.titleDataTable]}
            >
                {i18n.t("matchday")} {index + 1}
            </Title>
            <DataTable.Header style={{ borderBottomColor: colors.primary }}>
                <DataTable.Title style={groupStyles.rowStart}>
                    {i18n.t("local")}
                </DataTable.Title>
                <DataTable.Title numeric style={groupStyles.rowContainer}>
                    {i18n.t("score")}
                </DataTable.Title>
                <DataTable.Title style={groupStyles.rowEnd}>
                    {i18n.t("visitant")}
                </DataTable.Title>
            </DataTable.Header>

            {item.map((match, indexItem) => {
                return (
                    <Match
                        item={item}
                        match={match}
                        matchdayNumber={index}
                        colors={colors}
                        index={indexItem}
                        handleGetMatch={handleGetMatch}
                        key={indexItem}
                    />
                );
            })}
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
