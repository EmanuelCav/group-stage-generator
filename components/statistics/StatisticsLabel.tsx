import { memo, useMemo, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import i18n from "@/i18n";

import { StatisticsLabelPropsType } from "@/types/statistics.types";

import { createStyles } from "@/styles/create.styles";

const StatisticsLabel = memo(({ spacing, colors, setStatisticView, statisticView }: StatisticsLabelPropsType) => {

    const [isFocus, setIsFocus] = useState<boolean>(false)

    const statiscticsOptions = useMemo(() => [
        { value: "all", label: i18n.t("allStatistics") },
        { value: "goal", label: i18n.t("goals") },
        { value: "yellow card", label: i18n.t("yellow") },
        { value: "red card", label: i18n.t("red") },
        { value: "assist", label: i18n.t("assists") },
    ], [])

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
            data={statiscticsOptions}
            maxHeight={spacing.h3_8}
            labelField="label"
            valueField="value"
            placeholder={statisticView}
            value={statisticView}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
                setStatisticView(item.value);
                setIsFocus(false);
            }}
        />
    )
})

export default StatisticsLabel