import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import i18n from '@/i18n'

import { View } from '../Themed';
import HeaderGroup from './components/HeaderGroup';
import GroupTeam from './components/GroupTeam';

import { GroupsListPropsType } from '@/types/groups.types';

import { groupStyles } from '@/styles/group.styles';

import { useSpacing } from '@/hooks/useSpacing';
import { useIsFullName } from '@/hooks/useIsFullName';

const GroupsList = ({ group, colors }: GroupsListPropsType) => {

    const spacing = useSpacing()
    const { isFullName } = useIsFullName()

    const renderGroup = useCallback(({ item: i }: { item: number }) => (
        <View style={{ marginVertical: spacing.h148, backgroundColor: colors.tertiary }}>
            <Text variant='titleLarge' style={{ marginLeft: spacing.w18, color: colors.primary, fontFamily: 'Raleway_Bold' }}>
                {i18n.t("group.title")} {i + 1}
            </Text>
            <View style={groupStyles.groupList} key={i}>
                <HeaderGroup colors={colors} group={group} groupNumber={i} spacing={spacing} />
                <GroupTeam colors={colors} group={group} groupNumber={i} />
            </View>
        </View>
    ), [group, colors, isFullName])

    return (
        <FlatList
            data={Array.from({ length: group.matches?.length as number }, (_, i) => i)}
            renderItem={renderGroup}
            keyExtractor={(item) => String(item)}
        />
    );
};

export default GroupsList;
