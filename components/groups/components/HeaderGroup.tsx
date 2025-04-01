import { FlatList } from "react-native"
import { Avatar, Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { HeaderGroupPropsType } from "@/types/groups.types"

import { groupStyles } from "@/styles/group.styles"

import { generatePoints, groupName } from "@/utils/points"

const HeaderGroup = ({ group, groupNumber, colors }: HeaderGroupPropsType) => {
    return (
        <View>
            <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                <Text variant='labelMedium' style={groupStyles.headerCellPosition}>#</Text>
                <Text variant='labelMedium' style={groupStyles.headerCell}>Team</Text>
            </View>
            <FlatList
                data={generatePoints(group.teams.filter(t => t.group === groupNumber + 1), group.matches!)}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item, index }) => (
                    <View style={groupStyles.row}>
                        <Text variant="bodyMedium" style={groupStyles.cellPosition}>{index + 1}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {item.logo ? (
                                <Avatar.Image source={{ uri: item.logo }} size={32} />
                            ) : (
                                <Avatar.Icon icon="shield-outline" size={32} />
                            )}
                            <Text variant="bodyMedium" style={groupStyles.teamCell}>{groupName(item.name)}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default HeaderGroup