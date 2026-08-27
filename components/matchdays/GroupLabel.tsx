import { memo } from "react"

import CustomDropdown from "../general/CustomDropdown";

import { GroupLabelPropsType } from "@/types/matchdays.props"

import { useMatchdayDropdown } from "@/hooks/useMatchdayDropdown";

const GroupLabel = memo(({ group, colors, matchdayViewUpdated, t }: GroupLabelPropsType) => {

    const { options } = useMatchdayDropdown(group.matches!, "group", t)

    return (
        <CustomDropdown
            data={options}
            value={String(group.matchdayView)}
            colors={colors}
            onChange={(item) => {
                matchdayViewUpdated(item.value);
            }}
        />
    )
})

export default GroupLabel