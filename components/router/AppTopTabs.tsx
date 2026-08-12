import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Appbar, useTheme } from "react-native-paper";
import i18n from "@/i18n";

import HomeTeamScreen from "../../app/(teams)/[teamId]/index";
import PlayersTeamScreen from "../../app/(teams)/[teamId]/players";

import { ITeam } from "@/interface/Team";

import { useTeamStore } from "@/store/team.store";

const Tab = createMaterialTopTabNavigator();

export default function TopTabsLayout() {

    const { colors } = useTheme();
    const router = useRouter();
    const { team, getTeam, hideAndShowAddTeam } = useTeamStore()

    const handleUpdateTeam = useCallback((data: ITeam) => {
        getTeam(data)
        hideAndShowAddTeam(true)
    }, [])

    return (
        <>
            <Appbar.Header style={{ backgroundColor: colors.primary }}>
                <Appbar.BackAction color="#ffffff" onPress={() => router.back()} />
                <Appbar.Content title={`${team.name}`} titleStyle={{ color: "#ffffff" }} />
                <Appbar.Action
                    icon="pencil"
                    color="#ffffff"
                    onPress={() => handleUpdateTeam(team)}
                />
            </Appbar.Header>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: colors.background,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.primary,
                        height: 3,
                    },
                    tabBarActiveTintColor: colors.primary,
                    tabBarLabelStyle: {
                        textTransform: "capitalize",
                    },
                }}>
                <Tab.Screen
                    name="index"
                    component={HomeTeamScreen}
                    options={{ title: i18n.t("information") }}
                />

                <Tab.Screen
                    name="players"
                    component={PlayersTeamScreen}
                    options={{ title: i18n.t("players") }}
                />
            </Tab.Navigator>
        </>
    );
}