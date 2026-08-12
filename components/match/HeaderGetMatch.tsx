import { Appbar } from "react-native-paper"
import i18n from "@/i18n"

import { HeaderGetMatchPropsType } from "@/types/match.types"

const HeaderGetMatch = ({ colors, router }: HeaderGetMatchPropsType) => {
    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction
                color="#ffffff"
                onPress={() => router.back()}
            />
            <Appbar.Content
                title={i18n.t("match")}
                color="#ffffff"
            />
        </Appbar.Header>
    )
}

export default HeaderGetMatch