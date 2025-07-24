import { Appbar, useTheme } from "react-native-paper";
import { Appearance } from "react-native";
import i18n from '@/i18n';

const HeaderTournaments = () => {

    const { colors, dark } = useTheme()

    const iconName = dark ? "white-balance-sunny" : "moon-waning-crescent";

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.Content title={i18n.t("groupstages")} color="#ffffff" />
            <Appbar.Action icon={iconName} color="#ffffff"
                onPress={() => Appearance.setColorScheme(dark ? "light" : "dark")} />
        </Appbar.Header>
    );
};

export default HeaderTournaments;
