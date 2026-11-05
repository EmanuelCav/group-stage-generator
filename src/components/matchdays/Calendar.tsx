import { memo, useCallback, useMemo } from "react";
import { FlatList, View } from "react-native";

import CalendarDate from "./components/CalendarDate";

import { groupStyles } from "@/styles/group.styles";

import { CalendarPropsType } from "@/types/matchdays.types";

const Calendar = memo(({ dateMatches, setDateMatches, colors }: CalendarPropsType) => {

    const dates = useMemo(() => {

        const result: Date[] = [];
        const today = new Date();

        for (let i = -30; i <= 30; i++) {

            const date = new Date(today);
            date.setDate(today.getDate() + i);

            result.push(date);
        }

        return result;

    }, []);

    const formatDate = useCallback((date: Date) => {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }, []);

    const renderItem = useCallback(({ item }: { item: Date }) => {

        const date = formatDate(item);

        return (
            <CalendarDate
                date={item}
                selected={date === dateMatches}
                onPress={setDateMatches}
                colors={colors}
            />
        );

    }, [dateMatches, formatDate, setDateMatches]);

    return (
        <View style={{ marginTop: 7 }}>
            <FlatList
                data={dates}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={30}
                getItemLayout={(_, index) => ({
                    length: 68,
                    offset: 68 * index,
                    index,
                })}
                keyExtractor={formatDate}
                renderItem={renderItem}
                contentContainerStyle={groupStyles.content}
            />
        </View>
    );
})

export default Calendar;