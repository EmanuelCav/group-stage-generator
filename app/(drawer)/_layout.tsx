import { Redirect } from 'expo-router';

import AppDrawer from '@/components/router/AppDrawer';

import { useGroupStore } from '@/store/group.store';

export default function DrawerLayout() {

    const { group } = useGroupStore()

    if (!group) return <Redirect href="/home" />

    return (
        <AppDrawer />
    );
}