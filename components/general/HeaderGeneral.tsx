import { Appbar } from "react-native-paper"

import { HeaderGeneralPropsTypes } from "@/types/props.types"

const HeaderGeneral = ({ colors, router, title }: HeaderGeneralPropsTypes) => {

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            <Appbar.BackAction color="#ffffff" onPress={() => router.replace("/")} />
            <Appbar.Content title={title} color="#ffffff" />
            <Appbar.Action icon="cog" color="#ffffff" onPress={() => router.replace("/config")} />
        </Appbar.Header>
    )
}

export default HeaderGeneral