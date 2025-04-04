import { useRouter } from "expo-router"
import { useTheme } from "react-native-paper"

import { View } from "@/components/Themed"
import HeaderGeneral from "@/components/general/HeaderGeneral"
import SureGeneral from "@/components/general/SureGeneral"
import EliminationStage from "@/components/elimination/EliminationStage"

import { groupStore } from "@/store/group.store"

const Elimination = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { sureRemoveGroup, sureRestartGroup } = groupStore()

    const goBack = () => {
        router.replace("/")
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Elimination' goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            <EliminationStage />
        </View>
    )
}

export default Elimination