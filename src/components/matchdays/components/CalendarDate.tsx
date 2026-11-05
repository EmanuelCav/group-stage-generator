import { memo, useMemo } from 'react';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';

import { CalendarDatePropsType } from '@/types/matchdays.types';

import { groupStyles } from '@/styles/group.styles';

const CalendarDate = memo(({ date, selected, onPress, colors }: CalendarDatePropsType) => {

    const formattedDate = useMemo(() => {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }, [date]);

    const month = useMemo(() => {
        return date.toLocaleDateString("en-GB", {
            month: "short"
        }).replace(".", "");
    }, [date]);

    return (
        <Pressable
            onPress={() => onPress(formattedDate)}
            style={[
                groupStyles.dateContainer,
                {
                    backgroundColor: selected
                        ? colors.primary
                        : colors.tertiary,
                }
            ]}
        >
            <Text
                variant="labelSmall"
                style={{
                    textTransform: "uppercase",
                }}
            >
                {month}
            </Text>

            <Text variant="titleLarge">
                {date.getDate()}
            </Text>

            <Text variant="labelSmall">
                {date.getFullYear()}
            </Text>
        </Pressable>
    );
});

export default CalendarDate