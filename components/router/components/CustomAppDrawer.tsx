import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import i18n from "../../../../i18n";

import { useTournamentStore } from "@/store/tournament.store";
import { useUserStore } from "@/store/user.store";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const { colors } = useTheme();
    const router = useRouter();

    const { sureRemoveTournament, sureRestartTournament } = useTournamentStore();
    const { premium } = useUserStore()

    return (
        <DrawerContentScrollView
            {...props}
            style={{
                backgroundColor: colors.background,
            }}
        >
            <DrawerItemList {...props} />

            <View
                style={{
                    marginVertical: 12,
                    borderTopWidth: 1,
                    borderTopColor: colors.primary,
                }}
            />

            <DrawerItem
                label="Premium"
                pressColor="#ddd"
                labelStyle={{ color: colors.primary }}
                icon={({ size }) => (
                    <MaterialCommunityIcons
                        name="crown"
                        size={size}
                        color={colors.primary}
                    />
                )}
                onPress={() => router.navigate("/store")}
            />

            {
                premium &&
                <DrawerItem
                    label={i18n.t("duplicate")}
                    labelStyle={{ color: colors.primary }}
                    icon={({ size }) => (
                        <MaterialCommunityIcons
                            name="content-copy"
                            size={size}
                            color={colors.primary}
                        />
                    )}
                    onPress={() => sureRestartTournament(true)}
                />

            }

            <DrawerItem
                label={i18n.t("restartRoute")}
                labelStyle={{ color: colors.primary }}
                icon={({ size }) => (
                    <MaterialCommunityIcons
                        name="restart"
                        size={size}
                        color={colors.primary}
                    />
                )}
                onPress={() => sureRestartTournament(true)}
            />

            <DrawerItem
                label={i18n.t("deleteRoute")}
                labelStyle={{ color: colors.primary }}
                icon={({ size }) => (
                    <MaterialCommunityIcons
                        name="delete"
                        size={size}
                        color={colors.primary}
                    />
                )}
                onPress={() => sureRemoveTournament(true)}
            />

            <DrawerItem
                label={i18n.t("back")}
                labelStyle={{ color: colors.primary }}
                icon={({ size }) => (
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={size}
                        color={colors.primary}
                    />
                )}
                onPress={() => router.back()}
            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent