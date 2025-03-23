import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { View } from '@/components/Themed'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import Schedule from '@/components/matchdays/Schedule'
import GenerateAgain from '@/components/general/GenerateAgain'

import { groupStore } from '@/store/group.store'

const Matchdays = () => {

    const { colors } = useTheme()
    const router = useRouter()

    const { group } = groupStore()

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Matchdays' />
            {
                group.isGeneratedAgain && <GenerateAgain colors={colors} />
            }
            <Schedule group={group} />
        </View>
    )
}

export default Matchdays