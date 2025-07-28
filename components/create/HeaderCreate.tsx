import { Appbar, useTheme } from "react-native-paper"
import { Appearance } from "react-native"
import i18n from '@/i18n'

import { HeaderCreatePropsType } from "@/types/create.types"

const HeaderCreate = ({ colors, groups, router, group }: HeaderCreatePropsType) => {

    const { dark } = useTheme()

    const iconName = dark ? "white-balance-sunny" : "moon-waning-crescent";

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            {
                groups.length > 0 && <Appbar.BackAction color="#ffffff"
                    onPress={() => group.isGenerated ? router.replace("/(tabs)/groups") : router.replace("/")} />
            }
            <Appbar.Content title={i18n.t("teams")} color="#ffffff" />
            <Appbar.Action icon={iconName} color="#ffffff"
                onPress={() => Appearance.setColorScheme(dark ? "light" : "dark")} />
            <Appbar.Action icon="cog" color="#ffffff"
                onPress={() => router.replace("/config")} />
        </Appbar.Header>
    )
}

export default HeaderCreate