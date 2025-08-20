import { useState } from "react";
import { Appearance, Dimensions } from "react-native";
import { Appbar, Menu, useTheme } from "react-native-paper";
import i18n from '@/i18n'

import { HeaderGeneralPropsTypes } from "@/types/props.types";

const HeaderGeneral = ({ colors, router, title, goBack, sureRemoveGroup, sureRestartGroup }: HeaderGeneralPropsTypes) => {

    const [visible, setVisible] = useState<boolean>(false)
    const { dark } = useTheme()

    const iconName = dark ? "white-balance-sunny" : "moon-waning-crescent";

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={goBack} />
            <Appbar.Content title={title} color="#ffffff" />
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentStyle={{
                    backgroundColor: colors.tertiary, borderColor: colors.secondary, borderWidth: 2,
                    shadowColor: "dddddd", width: Dimensions.get("window").width / 1.75, flex: 1
                }}
                anchor={<Appbar.Action icon="dots-vertical" color="#ffffff" onPress={() => setVisible(true)} />}
            >

                <Menu.Item
                    onPress={() => router.replace("/create")}
                    title={i18n.t("menu.teams")}
                    leadingIcon="shield"
                />

                <Menu.Item
                    onPress={() => router.replace("/referees")}
                    title={i18n.t("menu.referees")}
                    leadingIcon="whistle"
                />

                <Menu.Item
                    onPress={() => router.replace("/stadiums")}
                    title={i18n.t("menu.stadiums")}
                    leadingIcon="stadium"
                />

                <Menu.Item
                    onPress={() => router.replace("/players")}
                    title={i18n.t("menu.players")}
                    leadingIcon="account-group"
                />

                <Menu.Item
                    onPress={() => {
                        Appearance.setColorScheme(dark ? "light" : "dark")
                    }}
                    title={dark ? i18n.t("lightMode") : i18n.t("darkMode")}
                    leadingIcon={iconName}
                />

                <Menu.Item
                    onPress={() => router.replace("/config")}
                    title={i18n.t("menu.settings")}
                    leadingIcon="cog"
                />

                <Menu.Item
                    onPress={() => {
                        sureRestartGroup(true)
                        setVisible(false)
                    }}
                    title={i18n.t("menu.restart")}
                    leadingIcon="restart"
                />

                <Menu.Item
                    onPress={() => {
                        sureRemoveGroup(true)
                        setVisible(false)
                    }}
                    title={i18n.t("menu.remove")}
                    leadingIcon="delete"
                />

                <Menu.Item
                    onPress={goBack}
                    title={i18n.t("menu.goBack")}
                    leadingIcon="arrow-left"
                />

            </Menu>
        </Appbar.Header>
    );
};

export default HeaderGeneral;
