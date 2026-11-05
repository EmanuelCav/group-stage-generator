import { useState } from 'react';
import { TextInput } from 'react-native-paper';

import { PasswordPropsType } from '@/types/auth.types';

const Password = ({ label, value, setValue, colors, spacing }: PasswordPropsType) => {
    
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <TextInput
            label={label}
            autoCapitalize="none"
            value={value}
            onChangeText={setValue}
            secureTextEntry={!showPassword}
            right={
                <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                />
            }
            style={{ marginBottom: spacing.h41, backgroundColor: colors.tertiary }}
        />
    )
}

export default Password