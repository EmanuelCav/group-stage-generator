import { Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { CellPropsType } from "@/types/groups.types"

import { groupStyles } from "@/styles/group.styles"

const Cell = ({ item, colors }: CellPropsType) => {
    return (
        <View style={[groupStyles.cell, { backgroundColor: colors.tertiary }]}>
            <Text variant="bodyMedium">{item}</Text>
        </View>
    )
}

export default Cell