import { Appbar } from "react-native-paper"
import i18n from '@/i18n'

import { HeaderConfigPropsType } from "@/types/config.types"

const HeaderConfig = ({ colors, comeBack }: HeaderConfigPropsType) => {

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={comeBack} />
            <Appbar.Content title={i18n.t("settings")} color="#ffffff" />
        </Appbar.Header>
    )
}

export default HeaderConfig