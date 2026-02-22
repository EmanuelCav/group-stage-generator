import { List, Switch } from 'react-native-paper'
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ListItemSwitchPropsType } from '@/types/settings.types';

import { settingsStyles } from '@/styles/settings.styles';

const ListItemSwitch = ({ colors, value, setValue, iconName, title }: ListItemSwitchPropsType) => {
    return (
        <List.Item
            title={title}
            style={[settingsStyles.listItemContain, { borderColor: colors.primary, backgroundColor: colors.tertiary }]}
            left={() => (
                <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={colors.primary}
                    style={{ marginLeft: 16 }}
                />
            )}
            right={() => (
                <Switch value={value} onValueChange={(v) => {
                    setValue(v)
                }} />
            )}
        />
    )
}

export default ListItemSwitch