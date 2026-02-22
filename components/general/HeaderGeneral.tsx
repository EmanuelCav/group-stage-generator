import { memo, useState } from "react";
import { Dimensions } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import i18n from '@/i18n'

import { HeaderGeneralPropsTypes } from "@/types/props.types";

import { duplicateGroup } from "@/utils/defaultGroup";

const HeaderGeneral = memo(({ colors, router, title, goBack, sureRemoveGroup, sureRestartGroup, createGroup, groups, group, premium }: HeaderGeneralPropsTypes) => {

    const [visible, setVisible] = useState<boolean>(false)

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={goBack} />
            <Appbar.Content title={title} color="#ffffff" />
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentStyle={{
                    backgroundColor: colors.tertiary, borderColor: colors.secondary, borderWidth: 2,
                    shadowColor: "#dddddd", width: Dimensions.get("window").width / 1.75, flex: 1
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
                    onPress={() => router.replace("/config")}
                    title={i18n.t("menu.settings")}
                    leadingIcon="cog"
                />

                <Menu.Item
                    onPress={() => {
                        setVisible(false)
                        router.navigate("/tent")
                    }}
                    title="Premium"
                    leadingIcon="crown"
                />

                {
                    (groups.length < 2 || premium) &&
                    <Menu.Item
                        onPress={() => {
                            setTimeout(() => {
                                const duplicatedGroup = duplicateGroup(group)
                                createGroup(duplicatedGroup)
                                setVisible(false)
                            }, 0);

                            router.replace("/create")
                        }}
                        title={i18n.t("duplicate")}
                        leadingIcon="content-copy"
                    />

                }

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

                <Menu.Item
                    onPress={() => {
                        router.navigate("/settings")
                        setVisible(false)
                    }}
                    title={i18n.t("appSettings")}
                    leadingIcon="devices"
                />

            </Menu>
        </Appbar.Header>
    )
})

export default HeaderGeneral;
