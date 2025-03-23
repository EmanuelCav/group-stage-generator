import { Appbar } from "react-native-paper"

import { HeaderCreatePropsType } from "@/types/create.types"

const HeaderCreate = ({ colors, groups, router }: HeaderCreatePropsType) => {

    return (
        <Appbar.Header style={{ backgroundColor: colors.primary }}>
            {
                groups.length > 0 && <Appbar.BackAction color="#ffffff" 
                onPress={() => router.replace("/")} />
            }
            <Appbar.Content title="Create" color="#ffffff" />
            <Appbar.Action icon="cog" color="#ffffff" onPress={() => router.replace("/config")} />
        </Appbar.Header>
    )
}

export default HeaderCreate