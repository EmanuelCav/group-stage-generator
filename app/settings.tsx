import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import i18n from "@/i18n";

import MainScreen from "@/components/general/MainScreen";
import HeaderSettings from "@/components/settings/HeaderSettings";
import ListItemSwitch from "@/components/settings/ListItemSwitch";
import ListItemButton from "@/components/settings/ListItemButton";
import Sure from "@/components/general/Sure";

import { createStyles } from "@/styles/create.styles";
import { generalStyles } from "@/styles/general.styles";

import { groupStore } from "@/store/group.store";

import { handleSignOut } from "@/lib/providerAuth";

import { useSpacing } from "@/hooks/useSpacing";
import { useAuth } from "@/hooks/useAuth";
import { useThemeMode } from "@/hooks/useThemeContext";
import { useIsFullName } from "@/hooks/useIsFullName";

const Settings = () => {

    const { colors } = useTheme()

    const { getGroup, setGroups } = groupStore()

    const { user } = useAuth()

    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [isSureLogOut, setIsSureLogOut] = useState<boolean>(false)
    const [language, setLanguage] = useState<string>(i18n.locale)

    const spacing = useSpacing()
    const { setThemeMode } = useThemeMode();
    const { isFullName, setIsFullName } = useIsFullName()
    const systemScheme = useColorScheme();

    const router = useRouter()

    const languageOptions = [
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

    const toggleFullName = async (value: boolean) => {
        setIsFullName(value)
        await AsyncStorage.setItem("isFullName", value ? "yes" : "no");
    }

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem("theme");

            if(!storedTheme) {
                setDarkMode(systemScheme === "dark");
                return
            }

            setDarkMode(storedTheme === "dark");
        }

        loadTheme();
    }, [])

    return (
        <MainScreen colors={colors}>
            {
                isSureLogOut && <Sure close={() => setIsSureLogOut(false)} text={i18n.t("sure_logout")}
                    func={() => handleSignOut(setIsSureLogOut, router, setGroups, getGroup)} labelButton={i18n.t("logout")}
                />
            }
            <HeaderSettings colors={colors} router={router} />
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>

                <Text variant="labelLarge" style={{ marginVertical: spacing.h185 }}>
                    {i18n.t("language")}
                </Text>
                <Dropdown
                    style={[
                        createStyles.dropdownComplete,
                        { backgroundColor: colors.tertiary, marginBottom: spacing.h106 },
                        isFocus && { borderColor: colors.primary },
                    ]}
                    placeholderStyle={{
                        fontSize: spacing.h47,
                        color: colors.surface,
                        backgroundColor: colors.tertiary
                    }}
                    selectedTextStyle={{
                        fontSize: spacing.h47,
                        color: colors.surface,
                        backgroundColor: colors.tertiary
                    }}
                    itemTextStyle={{
                        color: colors.surface
                    }}
                    containerStyle={{
                        backgroundColor: colors.tertiary,
                    }}
                    data={languageOptions}
                    maxHeight={spacing.h3_8}
                    labelField="label"
                    valueField="value"
                    placeholder={i18n.t("selectLanguage")}
                    value={language}
                    activeColor={colors.primary}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={async (item) => {
                        setLanguage(item.value);
                        i18n.locale = item.value;
                        await AsyncStorage.setItem("language", item.value);
                        setIsFocus(false);
                    }}
                />

                <ListItemSwitch title={i18n.t("darkMode")} iconName="theme-light-dark" value={darkMode} setValue={toggleDarkMode} colors={colors} />
                {/* <ListItemSwitch title={i18n.t("TeamFullName")} iconName="text" value={isFullName} setValue={toggleFullName} colors={colors} /> */}
                <ListItemButton colors={colors} handleFunction={() => router.navigate("/tent")} iconName="crown" title="Premium" borderColor={colors.primary} />
                {
                    user ? <ListItemButton colors={colors} handleFunction={() => setIsSureLogOut(true)} iconName="logout" title={i18n.t("logout")} borderColor="#f00" />
                        : <ListItemButton colors={colors} handleFunction={async () => {
                            await AsyncStorage.removeItem("without_account");
                            router.replace("/");
                        }} iconName="account" title={i18n.t("login")} borderColor={colors.primary} />
                }
            </View>
        </MainScreen >
    );
};

export default Settings;