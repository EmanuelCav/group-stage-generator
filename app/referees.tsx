import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Toast, { ErrorToast } from 'react-native-toast-message';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import i18n from '@/i18n'

import { View } from "@/components/Themed";
import MainScreen from "@/components/general/MainScreen";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import AddAction from "@/components/general/AddAction";
import FormCreateReferee from "@/components/referees/FormCreateReferee";
import Referee from "@/components/referees/Referee";
import AddButton from "@/components/general/AddButton";
import Sure from "@/components/general/Sure";
import SureGeneral from "@/components/general/SureGeneral";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IReferee } from "@/interface/Referee";

import { groupStore } from "@/store/group.store";
import { refereeStore } from "@/store/referee.store";
import { userStore } from "@/store/user.store";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_REFEREE}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

const toastConfig = {
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1NumberOfLines={1}
            text2NumberOfLines={3}
        />
    ),
}

const Referees = () => {

    const { showForm, hideAndShowAddReferee, getReferee, referee, isSure, sureRemoveReferee } = refereeStore()
    const { group, createReferee, updateReferee, removeReferee, sureRestartGroup, sureRemoveGroup, createGroup, groups } = groupStore()
    const { premium } = userStore()

    const { colors } = useTheme()

    const router = useRouter()

    const [isIntersitialLoaded, setIsIntersitialLoaded] = useState<boolean>(false)

    const handleUpdate = (data: IReferee) => {
        updateReferee(data)
        getReferee({})
    }

    const handleUpdateReferee = (data: IReferee) => {
        getReferee(data)
        hideAndShowAddReferee(true)
    }

    const openSure = (data: IReferee) => {
        getReferee(data)
        sureRemoveReferee(true)
    }

    const handleRemoveReferee = () => {
        sureRemoveReferee(false)
        hideAndShowAddReferee(false)
        removeReferee(referee)
        getReferee({})
    }

    const close = () => {
        sureRemoveReferee(false)
    }

    const openCreateReferee = () => {
        getReferee({})
        hideAndShowAddReferee(true)
    }

    const goBack = () => {
        router.replace("/(tabs)/groups")
    }

    useEffect(() => {
        hideAndShowAddReferee(false)
        sureRemoveReferee(false)
        getReferee({})
    }, [])

    useEffect(() => {

        const loadInterstitialAd = () => {
            try {
                interstitial.load();
            } catch (error) {
                console.error("Error loading interstitial ad:", error);
            }
        };

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setIsIntersitialLoaded(true)
        });

        const unsubscribedClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setIsIntersitialLoaded(false)
            loadInterstitialAd();
        });

        loadInterstitialAd();

        return () => {
            unsubscribeLoaded()
            unsubscribedClosed()
        };
    }, []);

    return (
        <MainScreen colors={colors}>
            {
                isSure && (
                    <Sure
                        func={handleRemoveReferee}
                        text={i18n.t("areYouSureDelete")}
                        close={close}
                        labelButton={i18n.t("remove")}
                    />
                )
            }
            {
                showForm && (
                    <FormCreateReferee
                        group={group}
                        colors={colors}
                        referee={referee}
                        openSure={openSure}
                        hideAndShowAddReferee={hideAndShowAddReferee}
                        createReferee={createReferee}
                        updateReferee={handleUpdate}
                        interstitial={interstitial}
                        isIntersitialLoaded={isIntersitialLoaded}
                        premium={premium}
                    />
                )
            }
            <HeaderGeneral colors={colors} router={router} title={i18n.t("referees_title")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} createGroup={createGroup} group={group} groups={groups} premium={premium} />

            <SureGeneral />

            <Toast config={toastConfig} />

            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
                {
                    group.referees!.length > 0 ? (
                        <AddButton colors={colors} handleAdd={openCreateReferee} />
                    ) : (
                        <AddAction
                            openForm={hideAndShowAddReferee}
                            colors={colors}
                            text={i18n.t("add_referee")}
                        />
                    )
                }
                {
                    group.referees!.length > 0 ? (
                        <FlatList
                            style={{ width: '100%' }}
                            data={group.referees!}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Referee referee={item} handleUpdateReferee={handleUpdateReferee} colors={colors} />
                            )}
                        />
                    ) : (
                        <Text variant="bodyMedium" style={createStyles.advideText}>
                            {i18n.t("referees_empty")}
                        </Text>
                    )
                }
            </View>
        </MainScreen>
    );
};

export default Referees;