import { useMemo } from 'react';
import { DataTable, Text, Title } from 'react-native-paper';
import { Dimensions, FlatList } from 'react-native';
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

const Schedule = ({ group, colors, handleGetMatch, router }: SchedulePropsType) => {

    const matchdays = useMemo(() => {
        return getMatchdaysGroupState(group.matches!, group.matchdayView!, group.matchdayNumber!, router);
    }, [group.matches, group.matchdayView, group.matchdayNumber]);

    const renderMatchday = ({ item, index }: RenderMatchday) => (
        <DataTable key={index}>
            {group.matchdayNumber === "all" &&
                <Text variant='titleLarge'
                    style={[{ color: colors.primary }, generalStyles.titleDataTable]}
                >
                    {i18n.t("matchday")} {index + 1}
                </Text>
            }
            <DataTable.Header style={{
                borderBottomColor: colors.primary, backgroundColor: colors.tertiary,
                marginTop: group.matchdayNumber === "all" ? 0 : Dimensions.get("window").height / 74
            }}>
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
                        group={group}
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
            data={matchdays}
            renderItem={renderMatchday}
            keyExtractor={(_, index) => index.toString()}
        />
    )
};

export default Schedule;
