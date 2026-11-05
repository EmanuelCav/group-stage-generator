import { Stack } from 'expo-router'
import { useTheme } from 'react-native-paper';

const AppStack = () => {

    const { colors } = useTheme()

    return <Stack
        screenOptions={{
            headerShown: false,
            animation: 'flip',
            contentStyle: { backgroundColor: colors.background }
        }}
    />
}

export default AppStack