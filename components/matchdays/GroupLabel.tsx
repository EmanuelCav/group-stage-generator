import { useEffect, useState } from "react"
import { Dimensions } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import i18n from '@/i18n'

import { GroupLabelPropsType } from "@/types/matchdays.props"
import { createStyles } from "@/styles/create.styles";

const GroupLabel = ({ group, colors, matchdayViewUpdated }: GroupLabelPropsType) => {

    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [groupsSelected, setGroupsSelected] = useState<{ label: string, value: string }[]>([])

    useEffect(() => {

        let matchdaysView: { label: string, value: string }[] = [{
            label: i18n.t("all_matches"),
            value: "all"
        }]

        for (let i = 0; i < group.matches?.length!; i++) {
            matchdaysView.push({
                label: `${i18n.t("group.title")} ${i + 1}`,
                value: `${i18n.t("group.title")} ${i + 1}`,
            })
        }

        setGroupsSelected(matchdaysView)

    }, [])

    return (
        <Dropdown
            style={[
                createStyles.dropdownMatchdays,
                { borderColor: colors.secondary },
                isFocus && { borderColor: colors.primary },
            ]}
            placeholderStyle={{ fontSize: Dimensions.get("window").height / 47 }}
            selectedTextStyle={{ fontSize: Dimensions.get("window").height / 47 }}
            data={groupsSelected}
            maxHeight={Dimensions.get("window").height / 3.8}
            labelField="label"
            valueField="value"
            placeholder={String(group.matchdayView)}
            value={group.matchdayView}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
                matchdayViewUpdated(item.value);
                setIsFocus(false);
            }}
        />
    )
}

export default GroupLabel