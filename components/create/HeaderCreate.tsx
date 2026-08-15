import { Appbar } from "react-native-paper"
import i18n from '@/i18n'

import { HeaderCreatePropsType } from "@/types/create.types"

const HeaderCreate = ({ colors, router }: HeaderCreatePropsType) => {
    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff"
                    onPress={() => router.replace("/home")} />
            <Appbar.Content title={i18n.t("teams")} color="#ffffff" />
            <Appbar.Action icon="cog" color="#ffffff"
                onPress={() => router.navigate("/(create)/config")} />
        </Appbar.Header>
    )
}

export default HeaderCreate