import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';

import HeaderGroup from './components/HeaderGroup';
import GroupTeam from './components/GroupTeam';

import { GroupsListPropsType } from '@/types/groups.types';

import { groupStyles } from '@/styles/group.styles';

import { getMaxGroup } from '@/utils/points';

import { useSpacing } from '@/hooks/useSpacing';
import { useIsFullName } from '@/hooks/useIsFullName';

const GroupsList = ({ group, colors, t }: GroupsListPropsType) => {

    const spacing = useSpacing()
    const { isFullName } = useIsFullName()

    const renderGroup = useCallback(({ item: i }: { item: number }) => (
        <View style={{ marginVertical: spacing.h148, backgroundColor: colors.background, padding: 7 }}>
            <Text variant='titleLarge' style={{ marginLeft: spacing.w18, color: colors.primary, fontFamily: 'Raleway_Bold' }}>
                {t("group.title")} {i + 1}
            </Text>
            <View style={[groupStyles.groupList, { backgroundColor: colors.background }]} key={i}>
                <HeaderGroup colors={colors} group={group} groupNumber={i} t={t} spacing={spacing} />
                <GroupTeam colors={colors} group={group} groupNumber={i} t={t} />
            </View>
        </View>
    ), [group, colors, isFullName])

    return (
        <FlatList
            data={Array.from({ length: getMaxGroup(group.teams) }, (_, i) => i)}
            renderItem={renderGroup}
            keyExtractor={(item) => String(item)}
        />
    );
};

export default GroupsList;
