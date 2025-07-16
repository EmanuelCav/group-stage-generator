import { Switch, Text } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { Dimensions } from 'react-native';

import { View } from '../Themed';

import { SwitchSettingsPropsType } from '@/types/config.types';

import { configStyles } from '@/styles/config.styles';

const SwitchSettings = ({ text, name, control, colors }: SwitchSettingsPropsType) => {
    return (
        <View style={[configStyles.labelSettings, { backgroundColor: colors.background }]}>
            <Text variant="bodyLarge">{text}</Text>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Switch style={{ marginTop: Dimensions.get("window").height / 192 }} 
                    value={value as boolean} onValueChange={onChange} />
                )}
            />
        </View>
    );
};

export default SwitchSettings;
