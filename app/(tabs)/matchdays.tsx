import { useCallback, useState } from 'react';
import { useRouter, useFocusEffect, Redirect } from 'expo-router'
import { Button, Text, useTheme } from 'react-native-paper'
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
import Sure from '@/components/general/Sure';

import { IGetMatch } from '@/interface/Match'
import { ITeam } from '@/interface/Team';

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

    const { group, sureRemoveGroup, sureRestartGroup, matchdayViewUpdated, matchdayNumber, createGroup, groups, removeMatches, removeMatchday, addMatchday, updateTeamMatch } = groupStore()
    const { premium } = userStore()
    const { getMatch } = matchStore()

    const { colors } = useTheme()
    const router = useRouter()

    const spacing = useSpacing()

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [isClearAllMatches, setIsClearAllMatches] = useState<boolean>(false)
    const [isSureRemoveMatchday, setIsSureRemoveMatchday] = useState<boolean>(false)
    const [indexMatchday, setIndexMatchday] = useState<number>(0)

    const handleRemoveMatchday = () => {

        try {

            for (let i = 0; i < group.matches!.length; i++) {
                if (group.matches![i][indexMatchday]) {
                    removeMatchday(i, indexMatchday)
                }
            }

            setIsSureRemoveMatchday(false)

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddMatchday = () => {
        addMatchday(0)
    }

    const handleUpdateTeamMatch = (indexGroup: number = 0, indexMatchday: number, indexMatch: number, isLocal: boolean, team: ITeam) => {
        updateTeamMatch(indexGroup, indexMatchday, indexMatch, isLocal, team)
    }

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
            <HeaderGeneral colors={colors} router={router} title={i18n.t("matchdays")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} createGroup={createGroup}
                group={group} premium={premium} groups={groups} isMatchdaysScreen={true} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
            <SureGeneral />
            {
                isClearAllMatches && <Sure close={() => setIsClearAllMatches(false)} func={() => {
                    removeMatches()
                    setIsClearAllMatches(false)
                }}
                    text={i18n.t("sureRemoveAllMatches")} labelButton={i18n.t("clearAll")} />
            }
            {
                isSureRemoveMatchday && <Sure close={() => setIsSureRemoveMatchday(false)} func={handleRemoveMatchday}
                    text={i18n.t("sureRemoveMatchday")} labelButton={i18n.t("remove")} />
            }
            {
                (group.isGeneratedAgain && evaluateGenerateAgain(group.matches!)) && <GenerateAgain colors={colors} />
            }
            <Toast config={toastConfig} />
            <View style={{ padding: spacing.h106, flex: 1, backgroundColor: colors.background }}>
                {
                    group.matches?.length! > 1 && !isEditMode &&
                    <GroupLabel colors={colors} group={group} matchdayViewUpdated={matchdayViewUpdated} spacing={spacing} />
                }
                <MatchdayLabel colors={colors} group={group} matchdayNumber={matchdayNumber} spacing={spacing} />
                {
                    isEditMode && (
                        <View style={{ backgroundColor: colors.background, flexDirection: 'row', marginVertical: 7, justifyContent: 'space-around', alignItems: 'center' }}>
                            {
                                group.matches![0].length! > 1 &&
                                <Button
                                    mode="text"
                                    onPress={() => setIsClearAllMatches(true)}
                                    textColor={colors.error}
                                >
                                    {i18n.t("clearAllButton")}
                                </Button>
                            }
                            <Button
                                mode="text"
                                onPress={handleAddMatchday}
                                textColor={colors.primary}
                            >
                                {i18n.t("addNewRound")}
                            </Button>
                        </View>
                    )
                }
                {
                    (evaluateGenerateAgain(group.matches!) && !isEditMode) && <Text variant='bodySmall' style={{ marginVertical: spacing.h106 }}>
                        {i18n.t("adviceUpdateMatch")}
                    </Text>
                }
                <Schedule group={group} colors={colors} handleGetMatch={handleGetMatch} handleUpdateTeamMatch={handleUpdateTeamMatch}
                    router={router} spacing={spacing} isEditMode={isEditMode} setIsSureRemoveMatchday={setIsSureRemoveMatchday} setIndexMatchday={setIndexMatchday} />
            </View>
        </MainScreen>
    )
}

export default Matchdays