import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useGroupStore } from "@/store/group.store";
import { useUserStore } from "@/store/user.store";

import { useLanguage } from "@/hooks/useLanguageContext";

import { duplicateGroup } from "@/utils/defaultGroup";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const { colors } = useTheme();
    const { t } = useLanguage()

    const router = useRouter();

    const { sureRemoveGroup, sureRestartGroup, group, createGroup } = useGroupStore();
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
                onPress={() => router.navigate("/tent")}
            />

            {
                premium &&
                <DrawerItem
                    label={t("duplicate")}
                    labelStyle={{ color: colors.primary }}
                    icon={({ size }) => (
                        <MaterialCommunityIcons
                            name="content-copy"
                            size={size}
                            color={colors.primary}
                        />
                    )}
                    onPress={() => {
                        setTimeout(() => {
                            const duplicatedGroup = duplicateGroup(group)
                            createGroup(duplicatedGroup)
                        }, 0);

                        router.replace("/home")
                    }}
                />
            }

            <DrawerItem
                label={t("restartRoute")}
                labelStyle={{ color: colors.primary }}
                icon={({ size }) => (
                    <MaterialCommunityIcons
                        name="restart"
                        size={size}
                        color={colors.primary}
                    />
                )}
                onPress={() => sureRestartGroup(true)}
            />

            <DrawerItem
                label={t("deleteRoute")}
                labelStyle={{ color: colors.primary }}
                icon={({ size }) => (
                    <MaterialCommunityIcons
                        name="delete"
                        size={size}
                        color={colors.primary}
                    />
                )}
                onPress={() => sureRemoveGroup(true)}
            />

            <DrawerItem
                label={t("back")}
                labelStyle={{ color: colors.primary }}
                icon={({ size }) => (
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={size}
                        color={colors.primary}
                    />
                )}
                onPress={() => router.replace("/home")}
            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent