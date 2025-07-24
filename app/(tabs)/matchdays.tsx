import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import i18n from '@/i18n'
import { Dimensions } from 'react-native'
import Toast from 'react-native-toast-message';

import { View } from '@/components/Themed'
import MainScreen from '@/components/general/MainScreen'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import Schedule from '@/components/matchdays/Schedule'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'
import Loading from '@/components/general/Loading'
import GroupLabel from '@/components/matchdays/GroupLabel'

import { IGetMatch } from '@/interface/Match'

import { groupStore } from '@/store/group.store'
import { matchStore } from '@/store/match.store'
import { responseStore } from '@/store/response.store'

import { evaluateGenerateAgain } from '@/utils/matchday'

const Matchdays = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, sureRemoveGroup, sureRestartGroup, matchdayViewUpdated } = groupStore()
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
        <MainScreen colors={colors}>
            {
                isLoading && <Loading text={i18n.t("generating")} />
            }
            <HeaderGeneral colors={colors} router={router} title={i18n.t("matchdays")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                (group.isGeneratedAgain || evaluateGenerateAgain(group.matches!)) && <GenerateAgain colors={colors} />
            }
            <Toast />
            <View style={{ padding: Dimensions.get("window").height / 106, flex: 1, backgroundColor: colors.background }}>
                <GroupLabel colors={colors} group={group} matchdayViewUpdated={matchdayViewUpdated} />
                <Schedule group={group} colors={colors} handleGetMatch={handleGetMatch} />
            </View>
        </MainScreen>
    )
}

export default Matchdays