import { memo, useMemo } from 'react';
import { Button, DataTable, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, View } from 'react-native';

import Match from './components/Match';

import { SchedulePropsType } from '@/types/matchdays.types';
import { IMatch } from '@/interface/Match';

import { groupStyles } from '@/styles/group.styles';
import { generalStyles } from '@/styles/general.styles';

import { getMatchdaysGroupState } from '@/utils/matchday';

import { useIsFullName } from '@/hooks/useIsFullName';

type RenderMatchday = {
    item: IMatch[];
    index: number;
}

const Schedule = memo(({ group, colors, handleGetMatch, router, spacing, isEditMode, setIsSureRemoveMatchday, handleUpdateTeamMatch, setIndexMatchday, t, dateMatches, isCalendarMode, setIsCalendarMode }: SchedulePropsType) => {

    const { isFullName } = useIsFullName()

    const matchdays = useMemo(() => {
        try {
            return getMatchdaysGroupState(
                group.matches!,
                group.matchdayView!,
                group.matchdayNumber!,
                router,
                isCalendarMode,
                dateMatches
            )
        } catch {
            return null
        }
    }, [group.matches, group.matchdayView, group.matchdayNumber, router, isFullName, isCalendarMode, dateMatches])

    const renderMatchday = ({ item, index }: RenderMatchday) => (
        <DataTable key={index}>
            <View style={{ backgroundColor: colors.background, flexDirection: 'row', alignItems: 'center' }}>
                {
                    isEditMode && group.matches![0].length > 1 && <Ionicons name="trash" size={22} color="red" onPress={() => {
                        setIndexMatchday(index)
                        setIsSureRemoveMatchday(true)
                    }} />
                }
                {
                    group.matchdayNumber === "all" &&
                    <Text variant='titleLarge'
                        style={[{ color: colors.primary }, generalStyles.titleDataTable]}
                    >
                        {t("matchday")} {index + 1}
                    </Text>
                }
            </View>
            <DataTable.Header style={{
                borderBottomColor: colors.primary, backgroundColor: colors.tertiary,
                marginTop: group.matchdayNumber === "all" ? 0 : spacing.h74
            }}>
                <DataTable.Title style={groupStyles.rowStart}>
                    {t("local")}
                </DataTable.Title>
                <DataTable.Title numeric style={groupStyles.rowContainer}>
                    {t("score")}
                </DataTable.Title>
                <DataTable.Title style={groupStyles.rowEnd}>
                    {t("visitant")}
                </DataTable.Title>
            </DataTable.Header>

            {item.map((match, indexItem) => {
                return (
                    <Match
                        isEditMode={isEditMode}
                        item={item}
                        group={group}
                        match={match}
                        matchdayNumber={index}
                        colors={colors}
                        index={indexItem}
                        handleGetMatch={handleGetMatch}
                        spacing={spacing}
                        handleUpdateTeamMatch={handleUpdateTeamMatch}
                        t={t}
                        key={indexItem}
                    />
                );
            })}
        </DataTable>
    );

    if (matchdays !== null && matchdays.length === 0) {
        return <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <Text variant='titleMedium'>{t("no_matches")}</Text>
            <Text variant='bodySmall'>{t("description_date_matchs")}</Text>
            <Button mode='text' labelStyle={{ color: colors.primary }} onPress={() => setIsCalendarMode(false)}>
                {t("see_all_matchs")}
            </Button>
        </View>
    }

    return (
        <>
            {!matchdays && (
                <Text variant="bodyMedium">{t("tryRestoring")}</Text>
            )}
            <FlatList
                data={matchdays}
                renderItem={renderMatchday}
                keyExtractor={(_, index) => index.toString()}
            />
        </>
    )
})

export default Schedule;