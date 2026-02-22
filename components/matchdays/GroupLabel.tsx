import { memo } from "react"
import { Dropdown } from 'react-native-element-dropdown';

import { GroupLabelPropsType } from "@/types/matchdays.props"

import { createStyles } from "@/styles/create.styles";

import { useMatchdayDropdown } from "@/hooks/useMatchdayDropdown";

const GroupLabel = memo(({ group, colors, matchdayViewUpdated, spacing }: GroupLabelPropsType) => {

    const { isFocus, options, onFocus, onBlur } = useMatchdayDropdown(group.matches!, "group")

    return (
        <Dropdown
            style={[
                createStyles.dropdownComplete,
                { backgroundColor: colors.tertiary },
                isFocus && { borderColor: colors.primary },
            ]}
            placeholderStyle={{
                fontSize: spacing.h47,
                color: colors.surface,
                backgroundColor: colors.tertiary
            }}
            selectedTextStyle={{
                fontSize: spacing.h47,
                color: colors.surface,
                backgroundColor: colors.tertiary
            }}
            itemTextStyle={{
                color: colors.surface
            }}
            containerStyle={{
                backgroundColor: colors.tertiary,
            }}
            activeColor={colors.primary}
            data={options}
            maxHeight={spacing.h3_8}
            labelField="label"
            valueField="value"
            placeholder={String(group.matchdayView)}
            value={group.matchdayView}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(item) => {
                matchdayViewUpdated(item.value)
                onBlur()
            }}
        />
    )
})

export default GroupLabel