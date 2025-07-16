import { FlatList } from "react-native"
import { Avatar, Text } from "react-native-paper"
import i18n from '@/i18n'

import { View } from "@/components/Themed"

import { HeaderGroupPropsType } from "@/types/groups.types"

import { groupStyles } from "@/styles/group.styles"

import { generatePoints, groupName } from "@/utils/points"

const HeaderGroup = ({ group, groupNumber, colors }: HeaderGroupPropsType) => {
    return (
        <View>
            <View style={[groupStyles.headerRow, { backgroundColor: colors.primary }]}>
                <Text variant="labelMedium" style={groupStyles.headerCellPosition}>#</Text>
                <Text variant="labelMedium" style={groupStyles.headerCell}>{i18n.t('team.label')}</Text>
            </View>
            <FlatList
                data={generatePoints(group.teams.filter(t => t.group === groupNumber + 1), group.matches!, group)}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item, index }) => (
                    <View style={[groupStyles.row, { backgroundColor: colors.tertiary }]}>
                        <View style={[groupStyles.cellPosition, { backgroundColor: colors.tertiary }]}>
                            <Text variant="bodyMedium">{index + 1}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.tertiary }}>
                            {item.logo ? (
                                <Avatar.Image source={{ uri: item.logo }} size={32} />
                            ) : (
                                <Avatar.Icon icon="shield-outline" size={32} />
                            )}
                            <View style={[groupStyles.teamCell, { backgroundColor: colors.tertiary }]}>
                                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{groupName(item.name)}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default HeaderGroup