import { Appbar } from "react-native-paper"

import { HeaderSettingsPropsType } from "@/types/settings.types"

const HeaderSettings = ({ colors, router, t }: HeaderSettingsPropsType) => {

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={() => router.back()} />
            <Appbar.Content title={t("settings")} color="#ffffff" />
        </Appbar.Header>
    )
}

export default HeaderSettings