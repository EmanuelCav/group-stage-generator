import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";

import { HeaderGeneralPropsTypes } from "@/types/props.types";

const HeaderGeneral = ({ colors, router, title, goBack }: HeaderGeneralPropsTypes) => {

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
                    title="Teams"
                    leadingIcon="shield"
                />

                <Menu.Item
                    onPress={() => router.replace("/referees")}
                    title="Referees"
                    leadingIcon="whistle"
                />

                <Menu.Item
                    onPress={() => router.replace("/stadiums")}
                    title="Stadiums"
                    leadingIcon="stadium"
                />

                <Menu.Item
                    onPress={() => router.replace("/players")}
                    title="Players"
                    leadingIcon="account-group"
                />

                <Menu.Item
                    onPress={() => router.replace("/config")}
                    title="Settings"
                    leadingIcon="cog"
                />

                <Menu.Item
                    onPress={() => { console.log("Opción 2 seleccionada") }}
                    title="Restart"
                    leadingIcon="restart"
                />

                <Menu.Item
                    onPress={() => { console.log("Opción 2 seleccionada") }}
                    title="Remove"
                    leadingIcon="delete"
                />

                <Menu.Item
                    onPress={goBack}
                    title="Go back"
                    leadingIcon="arrow-left"
                />


            </Menu>

        </Appbar.Header>
    );
};

export default HeaderGeneral;
