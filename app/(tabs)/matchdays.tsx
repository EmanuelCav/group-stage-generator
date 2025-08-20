import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import i18n from '@/i18n'
import { Dimensions } from 'react-native'
import Toast, { ErrorToast } from 'react-native-toast-message';

import { View } from '@/components/Themed'
import MainScreen from '@/components/general/MainScreen'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import Schedule from '@/components/matchdays/Schedule'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'
import GroupLabel from '@/components/matchdays/GroupLabel'

import { IGetMatch } from '@/interface/Match'

import { groupStore } from '@/store/group.store'
import { matchStore } from '@/store/match.store'

import { evaluateGenerateAgain } from '@/utils/matchday'
import MatchdayLabel from '@/components/matchdays/MatchdayLabel';

const toastConfig = {
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1NumberOfLines={1}
            text2NumberOfLines={3}
        />
    ),
};

const Matchdays = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, sureRemoveGroup, sureRestartGroup, matchdayViewUpdated, matchdayNumber } = groupStore()
    const { getMatch } = matchStore()

    const handleGetMatch = (data: IGetMatch) => {
        getMatch(data)
        router.replace("/match")
    }

    const goBack = () => {
        router.replace("/")
    }

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("matchdays")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                (group.isGeneratedAgain || evaluateGenerateAgain(group.matches!)) && <GenerateAgain colors={colors} />
            }
            <Toast config={toastConfig} />
            <View style={{ padding: Dimensions.get("window").height / 106, flex: 1, backgroundColor: colors.background }}>
                {
                    group.matches?.length! > 1 &&
                    <GroupLabel colors={colors} group={group} matchdayViewUpdated={matchdayViewUpdated} />
                }
                <MatchdayLabel colors={colors} group={group} matchdayNumber={matchdayNumber} />
                <Schedule group={group} colors={colors} handleGetMatch={handleGetMatch} router={router} />
            </View>
        </MainScreen>
    )
}

export default Matchdays