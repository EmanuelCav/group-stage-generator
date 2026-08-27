import { View } from 'react-native';
import { MD3Colors, Text, TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { InputSettingsPropsType } from '@/types/config.types';

import { configStyles } from '@/styles/config.styles';

const InputSettings = ({ text, name, control, error, defaultValue, colors, handleFocus, spacing, t }: InputSettingsPropsType) => {
    return (
        <View style={[configStyles.labelSettings, { backgroundColor: colors.background }]}>
            <Text variant="bodyLarge" style={{ textAlign: 'center' }}>{text}</Text>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        inputMode="numeric"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const formattedText = text.replace(/\D/g, '');
                            onChange(formattedText);
                        }}
                        onBlur={onBlur}
                        onFocus={() => handleFocus(100)}
                        defaultValue={defaultValue}
                        value={value as string}
                        style={[configStyles.inputSettingsNumber, { backgroundColor: colors.tertiary }]}
                        maxLength={3}
                    />
                )}
            />
            {error && <Text variant='bodySmall'
                style={{ color: MD3Colors.error50, textAlign: "center", marginTop: spacing.h185 }}>
                {t(error, { defaultValue: error })}
            </Text>
            }
        </View>
    );
}

export default InputSettings;