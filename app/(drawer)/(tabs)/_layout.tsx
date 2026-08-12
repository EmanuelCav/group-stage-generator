import { Redirect } from 'expo-router';

import { useGroupStore } from '@/store/group.store';

import AppTabs from '@/components/router/AppTabs';

export default function TabLayout() {

    const { group } = useGroupStore()

    if (!group) return <Redirect href="/home" />

    return <AppTabs />
}