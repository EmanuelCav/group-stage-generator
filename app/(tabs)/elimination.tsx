import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"

import { groupStore } from "@/store/group.store"

const Elimination = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { getGroup, sureRemoveGroup, sureRestartGroup } = groupStore()

    const goBack = () => {
        getGroup({
            teams: []
        })

        router.replace("/")
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Elimination' goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
        </View>
    )
}

export default Elimination