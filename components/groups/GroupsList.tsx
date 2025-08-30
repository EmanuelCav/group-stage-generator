import { Dimensions, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import i18n from '@/i18n'

import { View } from '../Themed';
import HeaderGroup from './components/HeaderGroup';
import GroupTeam from './components/GroupTeam';

import { GroupsListPropsType } from '@/types/groups.types';

import { groupStyles } from '@/styles/group.styles';

const GroupsList = ({ group, colors }: GroupsListPropsType) => {

    const renderGroup = ({ item: i }: { item: number }) => (
        <View style={{ marginVertical: Dimensions.get("window").height / 148, backgroundColor: colors.tertiary }}>
            <Text variant='titleLarge' style={{ marginLeft: Dimensions.get("window").width / 18, color: colors.primary, fontWeight: 'bold' }}>
                {i18n.t("group.title")} {i + 1}
            </Text>
            <View style={groupStyles.groupList} key={i}>
                <HeaderGroup colors={colors} group={group} groupNumber={i} />
                <GroupTeam colors={colors} group={group} groupNumber={i} />
            </View>
        </View>
    );

    return (
        <FlatList
            data={Array.from({ length: group.matches?.length as number }, (_, i) => i)}
            renderItem={renderGroup}
            keyExtractor={(item) => String(item)}
        />
    );
};

export default GroupsList;
