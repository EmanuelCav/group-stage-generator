
import { Redirect, useLocalSearchParams } from 'expo-router';

import TopTabsLayout from '@/components/router/AppTopTabs';

export default function TeamLayout() {

    const { teamId } = useLocalSearchParams<{ teamId: string }>()

    if (!teamId) return <Redirect href="/home" />

    return <TopTabsLayout />
}