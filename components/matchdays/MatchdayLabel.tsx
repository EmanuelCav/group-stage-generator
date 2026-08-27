import { memo } from "react";

import CustomDropdown from "../general/CustomDropdown";

import { MatchdayLabelPropsType } from "@/types/matchdays.props"

import { useMatchdayDropdown } from "@/hooks/useMatchdayDropdown";

const MatchdayLabel = memo(({ group, colors, matchdayNumber, t }: MatchdayLabelPropsType) => {

    const { options } = useMatchdayDropdown(group.matches!, "matchday", t)

    return (
        <CustomDropdown
            data={options}
            value={String(group.matchdayNumber)}
            colors={colors}
            onChange={(item) => {
                matchdayNumber(item.value);
            }}
        />
    )
})

export default MatchdayLabel