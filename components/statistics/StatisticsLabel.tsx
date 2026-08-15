import { memo } from "react";
import i18n from "@/i18n";

import CustomDropdown from "../general/CustomDropdown";

import { StatisticsLabelPropsType } from "@/types/statistics.types";

const StatisticsLabel = memo(({ colors, setStatisticView, statisticView }: StatisticsLabelPropsType) => {

    return (
        <CustomDropdown
            data={[
                { value: "all", label: i18n.t("allStatistics") },
                { value: "goal", label: i18n.t("goals") },
                { value: "yellow card", label: i18n.t("yellow") },
                { value: "red card", label: i18n.t("red") },
                { value: "assist", label: i18n.t("assists") },
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