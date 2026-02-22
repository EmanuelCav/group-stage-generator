import { Appbar } from "react-native-paper"
import i18n from '@/i18n'

import { HeaderSettingsPropsType } from "@/types/settings.types"

const HeaderSettings = ({ colors, router }: HeaderSettingsPropsType) => {

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={() => router.back()} />
            <Appbar.Content title={i18n.t("settings")} color="#ffffff" />
        </Appbar.Header>
    )
}

export default HeaderSettings