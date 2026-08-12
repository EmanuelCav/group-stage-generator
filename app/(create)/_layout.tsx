import { Redirect, Stack } from "expo-router";

import { useGroupStore } from "@/store/group.store";

export default function CreateLayout() {

    const { group } = useGroupStore()

    if (!group) return <Redirect href="/home" />

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}