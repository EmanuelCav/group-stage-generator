import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "react-native-paper";
import i18n from "@/i18n";

import CustomDrawerContent from "./components/CustomAppDrawer";

const AppDrawer = () => {

    const { colors } = useTheme();

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
                    title: i18n.t("teams"),
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
                    title: i18n.t("settings"),
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
                    title: i18n.t("referees"),
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
                    title: i18n.t("venues"),
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
                    title: i18n.t("access"),
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
                    title: i18n.t("users"),
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