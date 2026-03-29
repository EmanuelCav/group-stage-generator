import { memo } from "react"
import { Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { CellPropsType } from "@/types/groups.types"

import { groupStyles } from "@/styles/group.styles"

const Cell = memo(({ item, colors, isMatchCell }: CellPropsType) => {
    return (
        <View style={[groupStyles.cell, { backgroundColor: colors.tertiary, minWidth: isMatchCell ? 76 : 52 }]}>
            <Text variant="bodyMedium">{item}</Text>
        </View>
    )
})

export default Cell