import { Stack } from 'expo-router'

const AppStack = () => {
    return <Stack
        screenOptions={{
            headerShown: false,
            animation: 'none'
        }}
    />
}

export default AppStack