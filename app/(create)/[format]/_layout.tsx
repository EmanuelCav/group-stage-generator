import { Redirect, Stack, useLocalSearchParams } from "expo-router";

export default function FormatLayout() {

    const { format } = useLocalSearchParams<{ format: string }>()

    if (!format) return <Redirect href="/home" />

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
        />
    );
}