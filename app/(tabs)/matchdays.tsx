import { useCallback } from 'react';
import { useRouter, useFocusEffect, Redirect } from 'expo-router'
import { useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/i18n'
import Toast, { ErrorToast } from 'react-native-toast-message';

import { View } from '@/components/Themed'
import MainScreen from '@/components/general/MainScreen'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import Schedule from '@/components/matchdays/Schedule'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'
import GroupLabel from '@/components/matchdays/GroupLabel'
import MatchdayLabel from '@/components/matchdays/MatchdayLabel';

import { IGetMatch } from '@/interface/Match'

import { groupStore } from '@/store/group.store'
import { matchStore } from '@/store/match.store'
import { userStore } from '@/store/user.store';

import { evaluateGenerateAgain } from '@/utils/matchday'

import { useSpacing } from '@/hooks/useSpacing';
import { interstitialService } from '@/services/interstitialService';

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

    const { group, sureRemoveGroup, sureRestartGroup, matchdayViewUpdated, matchdayNumber, createGroup, groups } = groupStore()
    const { premium } = userStore()
    const { getMatch } = matchStore()

    const { colors } = useTheme()
    const router = useRouter()

    const spacing = useSpacing()

    const handleGetMatch = useCallback((data: IGetMatch) => {
        getMatch(data)
        router.navigate("/match")
    }, [getMatch, router])

    const goBack = useCallback(() => {
        router.replace("/home")
    }, [router])

    useFocusEffect(
        useCallback(() => {
            const handleCount = async () => {

                try {

                    const storedCount = await AsyncStorage.getItem("reviewCount");
                    const count = storedCount ? parseInt(storedCount, 10) : 0;

                    const storedCountMatchdaysScreen = await AsyncStorage.getItem("matchdaysScreenViews");
                    const countMatchdaysScreen = storedCountMatchdaysScreen ? parseInt(storedCountMatchdaysScreen, 10) : 0;

                    if (countMatchdaysScreen !== 0 && countMatchdaysScreen % 11 === 0) {
                        if (count > 3 && interstitialService.isLoaded() && !premium) {
                            interstitialService.show()
                        }
                    }

                    await AsyncStorage.setItem("matchdaysScreenViews", (countMatchdaysScreen + 1).toString());

                } catch (error) {
                    console.error("Error checking review count:", error);
                }
            };

            handleCount();
        }, [])
    );

    if (!group.isGenerated) return <Redirect href="/home" />

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("statistics")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} createGroup={createGroup}
                group={group} premium={premium} groups={groups} />
            <SureGeneral />
            {
                (group.isGeneratedAgain || evaluateGenerateAgain(group.matches!)) && <GenerateAgain colors={colors} />
            }
            <Toast config={toastConfig} />
            <View style={{ padding: spacing.h106, flex: 1, backgroundColor: colors.background }}>
                {
                    group.matches?.length! > 1 &&
                    <GroupLabel colors={colors} group={group} matchdayViewUpdated={matchdayViewUpdated} spacing={spacing} />
                }
                <MatchdayLabel colors={colors} group={group} matchdayNumber={matchdayNumber} spacing={spacing} />
                <Schedule group={group} colors={colors} handleGetMatch={handleGetMatch} router={router} spacing={spacing} />
            </View>
        </MainScreen>
    )
}

export default Matchdays