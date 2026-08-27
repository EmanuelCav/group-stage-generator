import { Appbar } from "react-native-paper"

import { HeaderCreatePropsType } from "@/types/create.types"

const HeaderCreate = ({ colors, router, t }: HeaderCreatePropsType) => {
    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff"
                    onPress={() => router.replace("/home")} />
            <Appbar.Content title={t("teams")} color="#ffffff" />
            <Appbar.Action icon="cog" color="#ffffff"
                onPress={() => router.navigate("/(create)/config")} />
        </Appbar.Header>
    )
}

export default HeaderCreate