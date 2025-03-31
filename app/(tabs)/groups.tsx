import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { View } from '@/components/Themed'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import GroupsList from '@/components/groups/GroupsList'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'

import { groupStore } from '@/store/group.store'

const Groups = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, getGroup, sureRemoveGroup, sureRestartGroup } = groupStore()

    const goBack = () => {
        router.replace("/")

        getGroup({
            teams: []
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderGeneral colors={colors} router={router} title='Groups' goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                group.isGeneratedAgain && <GenerateAgain colors={colors} />
            }
            <GroupsList group={group} colors={colors} />
        </View>
    )
}

export default Groups