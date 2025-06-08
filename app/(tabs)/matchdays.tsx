import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '@/components/Themed'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import Schedule from '@/components/matchdays/Schedule'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'
import Loading from '@/components/general/Loading'

import { IGetMatch } from '@/interface/Match'

import { groupStore } from '@/store/group.store'
import { matchStore } from '@/store/match.store'
import { responseStore } from '@/store/response.store'

import { evaluateGenerateAgain } from '@/utils/matchday'

const Matchdays = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, sureRemoveGroup, sureRestartGroup } = groupStore()
    const { isLoading } = responseStore()
    const { getMatch } = matchStore()

    const handleGetMatch = (data: IGetMatch) => {
        getMatch(data)
        router.push("/match")
    }

    const goBack = () => {
        router.replace("/")
    }

    return (
        <View style={{ flex: 1 }}>
            {
                isLoading && <Loading text={i18n.t("generating")} />
            }
            <HeaderGeneral colors={colors} router={router} title={i18n.t("matchdays")} goBack={goBack}
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