import { Appbar, useTheme } from "react-native-paper";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from '@/i18n';

import { HeaderTournamentsPropsType } from "@/types/index.types";

const HeaderTournaments = ({ router, user, setIsSureLogOut }: HeaderTournamentsPropsType) => {

    const { colors, dark } = useTheme()

    const iconName = dark ? "white-balance-sunny" : "moon-waning-crescent";

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.Content title={i18n.t("groupstages")} color="#ffffff" />
            <Appbar.Action icon="crown" color="#ffffff"
                onPress={() => router.navigate("/tent")} />
            {
                !user ?
                    <Appbar.Action
                        icon="account"
                        color="#ffffff"
                        onPress={async () => {
                            await AsyncStorage.removeItem("without_account");
                            router.navigate("/");
                        }}
                    />
                    : <Appbar.Action icon="logout" color="#ffffff"
                        onPress={() => setIsSureLogOut(true)} />
            }
            <Appbar.Action icon={iconName} color="#ffffff"
                onPress={() => Appearance.setColorScheme(dark ? "light" : "dark")} />
        </Appbar.Header>
    );
};

export default HeaderTournaments;
