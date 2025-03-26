import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { View } from '@/components/Themed'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import Schedule from '@/components/matchdays/Schedule'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'

import { groupStore } from '@/store/group.store'

const Matchdays = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, getGroup, sureRemoveGroup, sureRestartGroup } = groupStore()

    const goBack = () => {
        getGroup({
            teams: []
        })

        router.replace("/")
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Matchdays' goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                group.isGeneratedAgain && <GenerateAgain colors={colors} />
            }
            <Schedule group={group} colors={colors} />
        </View>
    )
}

export default Matchdays