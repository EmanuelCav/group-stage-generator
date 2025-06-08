import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import i18n from '@/i18n'

import { HeaderGeneralPropsTypes } from "@/types/props.types";

const HeaderGeneral = ({ colors, router, title, goBack, sureRemoveGroup, sureRestartGroup }: HeaderGeneralPropsTypes) => {

    const [visible, setVisible] = useState<boolean>(false)

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={goBack} />
            <Appbar.Content title={title} color="#ffffff" />
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentStyle={{ backgroundColor: "#ffffff", shadowColor: "dddddd" }}
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
                    onPress={() => router.replace("/config")}
                    title={i18n.t("menu.settings")}
                    leadingIcon="cog"
                />

                <Menu.Item
                    onPress={() => sureRestartGroup(true)}
                    title={i18n.t("menu.restart")}
                    leadingIcon="restart"
                />

                <Menu.Item
                    onPress={() => sureRemoveGroup(true)}
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
