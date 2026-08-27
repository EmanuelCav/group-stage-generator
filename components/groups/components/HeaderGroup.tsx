import { useCallback } from "react"
import { FlatList, View } from "react-native"
import { Text } from "react-native-paper"

import NameGroup from "./components/NameGroup"

import { HeaderGroupPropsType } from "@/types/groups.types"
import { IPoints } from "@/interface/Team"

import { groupStyles } from "@/styles/group.styles"

import { useGroupPoints } from "@/hooks/useGroupPoints"
import { useIsFullName } from "@/hooks/useIsFullName"

const HeaderGroup = ({ group, groupNumber, colors, spacing, t }: HeaderGroupPropsType) => {

    const { isFullName } = useIsFullName()
    const points = useGroupPoints(group, groupNumber)

    const renderPoints = useCallback(
        ({ item, index }: { item: IPoints, index: number }) => (
            <NameGroup
                index={index}
                item={item}
                spacing={spacing}
                isFullName={isFullName}
                colors={colors}
                group={group}
            />
        ),
        [colors, isFullName]
    )

    return (
        <View>
            <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                <Text variant="labelMedium" style={groupStyles.headerCellPosition}>#</Text>
                <Text variant="labelMedium" style={[groupStyles.headerCell, { width: isFullName ? spacing.w3 : spacing.w6, textAlign: 'left', marginLeft: spacing.w45 }]}>
                    {t('team.label')}
                </Text>
            </View>
            <FlatList
                data={points}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderPoints}
            />
        </View>
    )
}

export default HeaderGroup