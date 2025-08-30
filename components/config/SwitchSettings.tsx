import { Switch, Text } from 'react-native-paper';
import { Dimensions } from 'react-native';

import { View } from '../Themed';

import { SwitchSettingsPropsType } from '@/types/config.types';

import { configStyles } from '@/styles/config.styles';

const SwitchSettings = ({ text, setValue, value, colors }: SwitchSettingsPropsType) => {
    return (
        <View style={[configStyles.labelSettings, { backgroundColor: colors.background }]}>
            <Text variant="bodyLarge">{text}</Text>
            <Switch style={{ marginTop: Dimensions.get("window").height / 192 }}
                value={value} onValueChange={(val) => setValue(val)} />
        </View>
    );
};

export default SwitchSettings;
