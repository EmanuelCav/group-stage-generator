import { memo } from "react";

import CustomDropdown from "../general/CustomDropdown";

import { StatisticsLabelPropsType } from "@/types/statistics.types";

const StatisticsLabel = memo(({ colors, setStatisticView, statisticView, t }: StatisticsLabelPropsType) => {

    return (
        <CustomDropdown
            data={[
                { value: "all", label: t("allStatistics") },
                { value: "goal", label: t("goals") },
                { value: "yellow card", label: t("yellow") },
                { value: "red card", label: t("red") },
                { value: "assist", label: t("assists") },
            ]}
            value={statisticView}
            colors={colors}
            onChange={(item) => {
                setStatisticView(item.value);
            }}
        />
    )
})

export default StatisticsLabel