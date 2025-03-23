import { View, FlatList } from 'react-native';
import { DataTable } from 'react-native-paper';

import GroupTeam from './components/GroupTeam';

import { GroupsListPropsType } from '@/types/groups.types';

import { groupStyles } from '@/styles/group.styles';

const GroupsList = ({ group, colors }: GroupsListPropsType) => {

    const renderGroup = ({ item: i }: { item: number }) => (
        <View key={i}>
            <DataTable>
                <DataTable.Header style={{ borderBottomColor: colors.primary }}>
                    <DataTable.Title style={groupStyles.rowContainer}>Team</DataTable.Title>
                    <DataTable.Title numeric style={groupStyles.rowContainer}>Played</DataTable.Title>
                    <DataTable.Title numeric style={groupStyles.rowContainer}>+/-</DataTable.Title>
                    <DataTable.Title numeric style={groupStyles.rowContainer}>Points</DataTable.Title>
                </DataTable.Header>
                {group.teams.filter(t => t.group === (i + 1)).map((team) => (
                    <GroupTeam key={team.id} team={team} group={group} colors={colors} />
                ))}
            </DataTable>
        </View>
    );

    return (
        <FlatList
            data={Array.from({ length: group.matches?.length as number }, (_, i) => i)}
            renderItem={renderGroup}
            keyExtractor={(item) => item.toString()}
        />
    );
};

export default GroupsList;
