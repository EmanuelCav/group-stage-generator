import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import i18n from '@/i18n'

import { View } from "@/components/Themed";
import MainScreen from "@/components/general/MainScreen";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import AddAction from "@/components/general/AddAction";
import FormCreateStadium from "@/components/stadiums/FormCreateStadium";
import Stadium from "@/components/stadiums/Stadium";
import AddButton from "@/components/general/AddButton";
import Sure from "@/components/general/Sure";
import SureGeneral from "@/components/general/SureGeneral";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IStadium } from "@/interface/Stadium";

import { groupStore } from "@/store/group.store";

import { stadiumStore } from "@/store/stadium.store";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const Stadiums = () => {

  const { showForm, hideAndShowAddStadium, getStadium, stadium, isSure, sureRemoveStadium } = stadiumStore()
  const { group, createStadium, updateStadium, removeStadium, sureRestartGroup, sureRemoveGroup } = groupStore()

  const { colors } = useTheme()

  const router = useRouter()

  const [isIntersitialLoaded, setIsIntersitialLoaded] = useState<boolean>(false)

  const handleUpdate = (data: IStadium) => {
    updateStadium(data)
    getStadium({})
  }

  const handleUpdateStadium = (data: IStadium) => {
    getStadium(data)
    hideAndShowAddStadium(true)
  }

  const openSure = (data: IStadium) => {
    getStadium(data)
    sureRemoveStadium(true)
  }

  const handleRemoveReferee = () => {
    sureRemoveStadium(false)
    hideAndShowAddStadium(false)
    removeStadium(stadium)
    getStadium({})
  }

  const close = () => {
    sureRemoveStadium(false)
  }

  const openCreateStadium = () => {
    getStadium({})
    hideAndShowAddStadium(true)
  }

  const goBack = () => {
    router.replace("/(tabs)/groups")
  }

  useEffect(() => {
    hideAndShowAddStadium(false)
    sureRemoveStadium(false)
    getStadium({})
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
          <FormCreateStadium
            group={group}
            colors={colors}
            stadium={stadium}
            openSure={openSure}
            hideAndShowAddStadium={hideAndShowAddStadium}
            createStadium={createStadium}
            updateStadium={handleUpdate}
            interstitial={interstitial}
            isIntersitialLoaded={isIntersitialLoaded}
          />
        )
      }
      <HeaderGeneral
        colors={colors}
        router={router}
        title={i18n.t("stadiums_title")}
        goBack={goBack}
        sureRemoveGroup={sureRemoveGroup}
        sureRestartGroup={sureRestartGroup}
      />
      <SureGeneral />
      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
        {
          group.stadiums!.length > 0 ? (
            <AddButton colors={colors} handleAdd={openCreateStadium} />
          ) : (
            <AddAction
              openForm={hideAndShowAddStadium}
              colors={colors}
              text={i18n.t("add_stadium")}
            />
          )
        }
        {
          group.stadiums!.length > 0 ? (
            <FlatList
              style={{ width: '100%' }}
              data={group.stadiums!}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Stadium stadium={item} handleUpdateStadium={handleUpdateStadium} colors={colors} />
              )}
            />
          ) : (
            <Text variant="bodyMedium" style={createStyles.advideText}>
              {i18n.t("stadiums_empty")}
            </Text>
          )
        }
      </View>
    </MainScreen>
  );
};

export default Stadiums;