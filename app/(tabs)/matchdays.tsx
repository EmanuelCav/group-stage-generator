import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'

import { View } from '@/components/Themed'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import Schedule from '@/components/matchdays/Schedule'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'

import { IGetMatch } from '@/interface/Match'

import { groupStore } from '@/store/group.store'
import { matchStore } from '@/store/match.store'

import { evaluateGenerateAgain } from '@/utils/matchday'

const Matchdays = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, getGroup, sureRemoveGroup, sureRestartGroup } = groupStore()
    const { getMatch } = matchStore()

    const handleGetMatch = (data: IGetMatch) => {
        getMatch(data)
        router.push("/match")
    }

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
                (group.isGeneratedAgain || evaluateGenerateAgain(group.matches!)) && <GenerateAgain colors={colors} />
            }
            <Schedule group={group} colors={colors} handleGetMatch={handleGetMatch} />
        </View>
    )
}

export default Matchdays