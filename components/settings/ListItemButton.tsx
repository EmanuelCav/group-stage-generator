import { List } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ListItemButtonPropsType } from '@/types/settings.types'

import { settingsStyles } from '@/styles/settings.styles'

const ListItemButton = ({ colors, title, handleFunction, iconName, borderColor }: ListItemButtonPropsType) => {
    return (
        <List.Item
            title={title}
            style={[settingsStyles.listItemContain, { borderColor: borderColor, backgroundColor: colors.tertiary }]}
            onPress={handleFunction}
            left={() => (
                <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={borderColor}
                    style={{ marginLeft: 16 }}
                />
            )}
            right={() => (
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={colors.onSurfaceVariant}
                />
            )}
        />
    )
}

export default ListItemButton