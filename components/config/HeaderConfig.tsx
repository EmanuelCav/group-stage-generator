import { Appbar } from "react-native-paper"

import { HeaderConfigPropsType } from "@/types/config.types"

const HeaderConfig = ({ colors, comeBack, t }: HeaderConfigPropsType) => {

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={comeBack} />
            <Appbar.Content title={t("settings")} color="#ffffff" />
        </Appbar.Header>
    )
}

export default HeaderConfig