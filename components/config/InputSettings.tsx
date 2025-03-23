import { Dimensions } from 'react-native';
import { MD3Colors, Text, TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { View } from '../Themed';

import { InputSettingsPropsType } from '@/types/config.types';

import { configStyles } from '@/styles/config.styles';

const InputSettings = ({ text, name, control, error }: InputSettingsPropsType) => {
    return (
        <View style={configStyles.labelSettings}>
            <Text variant="bodyLarge">{text}</Text>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        keyboardType="numeric"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value as string}
                        style={configStyles.inputSettingsNumber}
                    />
                )}
            />
            {error && <Text variant='bodySmall' 
            style={{ color: MD3Colors.error50, marginTop: Dimensions.get("window").height / 185 }}>
                {error}
            </Text>}
        </View>
    );
};

export default InputSettings;
