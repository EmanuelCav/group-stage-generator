import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import Colors from '@/constants/Colors';

import { responseStore } from '@/store/response.store';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { handleLoading } = responseStore()
  
    useEffect(() => {
      handleLoading(false)
    }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          title: "Groups",
          tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />,
        }}
      />

      <Tabs.Screen
        name="matchdays"
        options={{
          headerShown: false,
          title: "Matchdays",
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />

      <Tabs.Screen
        name="knockout"
        options={{
          headerShown: false,
          title: "Knockout",
          tabBarIcon: ({ color }) => <TabBarIcon name="sitemap" color={color} />,
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          headerShown: false,
          title: "Statistics",
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
        }}
      />

    </Tabs>
  );
}
