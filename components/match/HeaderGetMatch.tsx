import { Appbar } from "react-native-paper"

import { HeaderGetMatchPropsType } from "@/types/match.types"

const HeaderGetMatch = ({ colors, router, t }: HeaderGetMatchPropsType) => {
    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction
                color="#ffffff"
                onPress={() => router.back()}
            />
            <Appbar.Content
                title={t("match")}
                color="#ffffff"
            />
        </Appbar.Header>
    )
}

export default HeaderGetMatch