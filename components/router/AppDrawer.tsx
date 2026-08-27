import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "react-native-paper";

import CustomDrawerContent from "./components/CustomAppDrawer";

import { useLanguage } from "@/hooks/useLanguageContext";

const AppDrawer = () => {

    const { colors } = useTheme();
    const { t } = useLanguage()

    return (
        <Drawer
            drawerContent={(props) => (
                <CustomDrawerContent {...props} />
            )}
            screenOptions={{
                headerShown: false,
                drawerPosition: "right",
                drawerStyle: {
                    backgroundColor: colors.background,
                },
                drawerInactiveTintColor: colors.primary,
                drawerActiveTintColor: colors.background,
                drawerActiveBackgroundColor: colors.primary,
                drawerLabelStyle: {
                    fontSize: 16,
                    fontFamily: "Raleway_Medium",
                }
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: () => null,
                    title: "",
                    drawerItemStyle: {
                        height: 0,
                    },
                }}
            />

            <Drawer.Screen
                name="teams"
                options={{
                    title: t("teams"),
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="shield"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    title: t("settings"),
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="cog"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="referees"
                options={{
                    title: t("referees"),
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="whistle"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="venues"
                options={{
                    title: t("venues"),
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="stadium"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            {/* <Drawer.Screen
                name="access"
                options={{
                    title: t("access"),
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="shield-lock"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="users"
                options={{
                    title: t("users"),
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-group"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            /> */}

        </Drawer>
    );
};

export default AppDrawer;