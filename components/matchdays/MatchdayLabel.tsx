import { useEffect, useState } from "react"
import { Dimensions } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import i18n from '@/i18n'

import { MatchdayLabelPropsType } from "@/types/matchdays.props"

import { createStyles } from "@/styles/create.styles";

const MatchdayLabel = ({ group, colors, matchdayNumber }: MatchdayLabelPropsType) => {

    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [groupsSelected, setGroupsSelected] = useState<{ label: string, value: string }[]>([])

    useEffect(() => {

        let matchdaysNumber: { label: string, value: string }[] = [{
            label: i18n.t("all_fixture"),
            value: "all"
        }]

        const maxLength = Math.max(...group.matches!.map(a => a.length));

        for (let i = 0; i < maxLength; i++) {
            matchdaysNumber.push({
                label: `${i18n.t("matchday")} ${i + 1}`,
                value: `${i18n.t("matchday")} ${i + 1}`,
            })
        }

        setGroupsSelected(matchdaysNumber)

    }, [group.matches])

    return (
        <Dropdown
            style={[
                createStyles.dropdownComplete,
                { backgroundColor: colors.tertiary },
                isFocus && { borderColor: colors.primary },
            ]}
            placeholderStyle={{
                fontSize: Dimensions.get("window").height / 47,
                color: colors.surface,
                backgroundColor: colors.tertiary
            }}
            selectedTextStyle={{
                fontSize: Dimensions.get("window").height / 47,
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
            data={groupsSelected}
            maxHeight={Dimensions.get("window").height / 3.8}
            labelField="label"
            valueField="value"
            placeholder={String(group.matchdayNumber)}
            value={group.matchdayNumber}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
                matchdayNumber(item.value);
                setIsFocus(false);
            }}
        />
    )
}

export default MatchdayLabel