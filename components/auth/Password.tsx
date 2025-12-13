import { useState } from 'react';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

import { PasswordPropsType } from '@/types/auth.types';

const Password = ({ label, value, setValue, colors }: PasswordPropsType) => {
    
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
            style={{ marginBottom: Dimensions.get('window').height / 41, backgroundColor: colors.tertiary }}
        />
    )
}

export default Password