import { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Toast, { ErrorToast } from 'react-native-toast-message';
import { TestIds } from 'react-native-google-mobile-ads';
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
import { userStore } from "@/store/user.store";

import { useInterstitialAd } from "@/hooks/useInterstitialAd";
import { useSpacing } from "@/hooks/useSpacing";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_STADIUM}`;

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
}

const Stadiums = () => {

  const { showForm, hideAndShowAddStadium, getStadium, stadium, isSure, sureRemoveStadium } = stadiumStore()
  const { group, createStadium, updateStadium, removeStadium, sureRestartGroup, sureRemoveGroup, createGroup, groups } = groupStore()
  const { premium } = userStore()

  const { colors } = useTheme()

  const router = useRouter()

  const spacing = useSpacing()

  const { interstitial, isLoaded: isInterstitialLoaded } = useInterstitialAd(premium ? null : adUnitId)

  const handleUpdate = (data: IStadium) => {
    updateStadium(data)
    getStadium({})
  }

  const handleUpdateStadium = useCallback((data: IStadium) => {
    getStadium(data)
    hideAndShowAddStadium(true)
  }, [])

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

  const goBack = useCallback(() => {
    router.replace("/(tabs)/groups")
  }, [router])

  const renderStadium = useCallback(
    ({ item }: { item: IStadium }) => (
      <Stadium
        stadium={item}
        handleUpdateStadium={handleUpdateStadium}
        colors={colors}
        spacing={spacing}
      />
    ),
    [handleUpdateStadium, colors, spacing]
  )

  useEffect(() => {
    hideAndShowAddStadium(false)
    sureRemoveStadium(false)
    getStadium({})
  }, [])

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
            premium={premium}
            group={group}
            colors={colors}
            stadium={stadium}
            openSure={openSure}
            hideAndShowAddStadium={hideAndShowAddStadium}
            createStadium={createStadium}
            updateStadium={handleUpdate}
            interstitial={interstitial!}
            isIntersitialLoaded={isInterstitialLoaded}
            spacing={spacing}
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
        createGroup={createGroup}
        group={group}
        groups={groups}
        premium={premium}
      />

      <SureGeneral />

      <Toast config={toastConfig} />

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
              keyExtractor={(item) => item.id!}
              renderItem={renderStadium}
              initialNumToRender={10}
              windowSize={5}
              removeClippedSubviews
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