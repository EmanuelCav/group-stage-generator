import { memo } from "react";
import { Dropdown } from 'react-native-element-dropdown';

import { MatchdayLabelPropsType } from "@/types/matchdays.props"

import { createStyles } from "@/styles/create.styles";

import { useMatchdayDropdown } from "@/hooks/useMatchdayDropdown";

const MatchdayLabel = memo(({ group, colors, matchdayNumber, spacing }: MatchdayLabelPropsType) => {

    const { isFocus, options, onFocus, onBlur } = useMatchdayDropdown(group.matches!, "matchday")

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
            placeholder={String(group.matchdayNumber)}
            value={group.matchdayNumber}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(item) => {
                matchdayNumber(item.value)
                onBlur()
            }}
        />
    )
})

export default MatchdayLabel