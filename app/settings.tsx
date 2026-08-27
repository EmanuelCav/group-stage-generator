import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import MainScreen from "@/components/general/MainScreen";
import HeaderSettings from "@/components/settings/HeaderSettings";
import ListItemSwitch from "@/components/settings/ListItemSwitch";
import ListItemButton from "@/components/settings/ListItemButton";
import CustomDropdown from "@/components/general/CustomDropdown";
import Sure from "@/components/general/Sure";

import { generalStyles } from "@/styles/general.styles";

import { useGroupStore } from "@/store/group.store";

import { handleSignOut } from "@/lib/providerAuth";

import { useSpacing } from "@/hooks/useSpacing";
import { useAuth } from "@/hooks/useAuth";
import { useThemeMode } from "@/hooks/useThemeContext";
import { useLanguage } from "@/hooks/useLanguageContext";

const Settings = () => {

    const { colors } = useTheme()
    const { language, changeLanguage, t } = useLanguage();

    const { getGroup, setGroups } = useGroupStore()
    const { user } = useAuth()

    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [isSureLogOut, setIsSureLogOut] = useState<boolean>(false)

    const spacing = useSpacing()
    const { setThemeMode } = useThemeMode();
    const systemScheme = useColorScheme();
    const router = useRouter()

    const languageOptions = [
        { label: "العربية", value: "ar" },
        { label: "Deutsch", value: "de" },
        { label: "English", value: "en" },
        { label: "Español", value: "es" },
        { label: "Français", value: "fr" },
        { label: "Italiano", value: "it" },
        { label: "Português", value: "pt" },
        { label: "Türkçe", value: "tr" },
    ]

    const toggleDarkMode = async (value: boolean) => {
        const mode = value ? "dark" : "light";
        setDarkMode(value);
        setThemeMode(mode);
        await AsyncStorage.setItem("theme", mode);
    }

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem("theme");
            if (!storedTheme) {
                setDarkMode(systemScheme === "dark");
                return
            }
            setDarkMode(storedTheme === "dark");
        }
        loadTheme();
    }, [])

    return (
        <MainScreen colors={colors}>
            {isSureLogOut && (
                <Sure
                    close={() => setIsSureLogOut(false)}
                    text={t("sure_logout")}
                    func={() => handleSignOut(setIsSureLogOut, router, setGroups, getGroup)}
                    labelButton={t("logout")}
                />
            )}
            <HeaderSettings colors={colors} router={router} t={t} />
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>

                <Text variant="labelLarge" style={{ marginVertical: spacing.h185 }}>
                    {t("language")}
                </Text>

                <CustomDropdown
                    data={languageOptions}
                    value={language}
                    colors={colors}
                    onChange={async (item) => {
                        await changeLanguage(item.value);
                    }}
                />

                <ListItemSwitch
                    title={t("darkMode")}
                    iconName="theme-light-dark"
                    value={darkMode}
                    setValue={toggleDarkMode}
                    colors={colors}
                />

                <ListItemButton
                    colors={colors}
                    handleFunction={() => router.navigate("/tent")}
                    iconName="crown"
                    title="Premium"
                    borderColor={colors.primary}
                />

                {
                    user ? (
                        <ListItemButton
                            colors={colors}
                            handleFunction={() => setIsSureLogOut(true)}
                            iconName="logout"
                            title={t("logout")}
                            borderColor="#f00"
                        />
                    ) : (
                        <ListItemButton
                            colors={colors}
                            handleFunction={async () => {
                                await AsyncStorage.removeItem("without_account");
                                router.replace("/");
                            }}
                            iconName="account"
                            title={t("login")}
                            borderColor={colors.primary}
                        />
                    )}
            </View>
        </MainScreen>
    );
};

export default Settings;