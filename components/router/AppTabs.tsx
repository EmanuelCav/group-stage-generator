import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import i18n from '@/i18n';

import { Colors } from '@/constants/Colors';

import { useThemeMode } from '@/hooks/useThemeContext';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

const AppTabs = () => {

    const { themeMode } = useThemeMode();
    const systemScheme = useColorScheme();

    const resolvedTheme: keyof typeof Colors =
        themeMode === "system"
            ? systemScheme === "dark"
                ? "dark"
                : "light"
            : themeMode;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[resolvedTheme].tint,
                tabBarInactiveTintColor: Colors[resolvedTheme].tabIconDefault,
                tabBarStyle: {
                    backgroundColor: Colors[resolvedTheme].background,
                    borderTopColor: 'transparent',
                    elevation: 0
                },
                headerShown: false,
            }}>
            <Tabs.Screen
                name="groups"
                options={{
                    headerShown: false,
                    title: i18n.t("groups"),
                    tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />,
                }}
            />

            <Tabs.Screen
                name="matchdays"
                options={{
                    headerShown: false,
                    title: i18n.t("matchdays"),
                    tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
                }}
            />

            <Tabs.Screen
                name="knockout"
                options={{
                    headerShown: false,
                    title: i18n.t("knockout"),
                    tabBarIcon: ({ color }) => <TabBarIcon name="sitemap" color={color} />,
                }}
            />

            <Tabs.Screen
                name="statistics"
                options={{
                    headerShown: false,
                    title: i18n.t("statistics"),
                    tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
                }}
            />

        </Tabs>
    )
}

export default AppTabs