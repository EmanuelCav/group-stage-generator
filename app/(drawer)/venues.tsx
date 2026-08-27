import { useCallback, useEffect } from "react";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Redirect, useRouter } from "expo-router";
import Toast, { ErrorToast } from 'react-native-toast-message';

import MainScreen from "@/components/general/MainScreen";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import AddAction from "@/components/general/AddAction";
import FormCreateVenue from "@/components/venues/FormCreateVenue";
import Venue from "@/components/venues/Venue";
import AddButton from "@/components/general/AddButton";
import Sure from "@/components/general/Sure";
import SureGeneral from "@/components/general/SureGeneral";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IVenue } from "@/interface/Venue";

import { useGroupStore } from "@/store/group.store";
import { useVenueStore } from "@/store/venue.store";
import { useUserStore } from "@/store/user.store";

import { useSpacing } from "@/hooks/useSpacing";
import { useLanguage } from "@/hooks/useLanguageContext";

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
}

const VenuesScreen = () => {

  const { showForm, hideAndShowAddVenue, getVenue, venue, isSure, sureRemoveVenue } = useVenueStore()
  const { group, createStadium, updateStadium, removeStadium } = useGroupStore()
  const { premium } = useUserStore()

  const { colors } = useTheme()
  const { t } = useLanguage()

  const router = useRouter()

  const spacing = useSpacing()

  const handleUpdate = (data: IVenue) => {
    updateStadium(data)
    getVenue({})
  }

  const handleUpdateVenue = useCallback((data: IVenue) => {
    getVenue(data)
    hideAndShowAddVenue(true)
  }, [])

  const openSure = (data: IVenue) => {
    getVenue(data)
    sureRemoveVenue(true)
  }

  const handleRemoveVenue = () => {
    sureRemoveVenue(false)
    hideAndShowAddVenue(false)
    removeStadium(venue)
    getVenue({})
  }

  const close = () => {
    sureRemoveVenue(false)
  }

  const openCreateVenue = () => {
    getVenue({})
    hideAndShowAddVenue(true)
  }

  const goBack = useCallback(() => {
    router.replace("/(drawer)/(tabs)/groups")
  }, [router])

  const renderVenue = useCallback(
    ({ item }: { item: IVenue }) => (
      <Venue
        venue={item}
        handleUpdateVenue={handleUpdateVenue}
        colors={colors}
        spacing={spacing}
      />
    ),
    [handleUpdateVenue, colors, spacing]
  )

  useEffect(() => {
    hideAndShowAddVenue(false)
    sureRemoveVenue(false)
    getVenue({})
  }, [])

  if (!group.isGenerated) return <Redirect href="/home" />

  return (
    <MainScreen colors={colors}>
      {
        isSure && (
          <Sure
            func={handleRemoveVenue}
            text={t("areYouSureDelete")}
            close={close}
            labelButton={t("remove")}
          />
        )
      }
      {
        showForm && (
          <FormCreateVenue
            premium={premium}
            group={group}
            colors={colors}
            venue={venue}
            openSure={openSure}
            hideAndShowAddVenue={hideAndShowAddVenue}
            createVenue={createStadium}
            updateVenue={handleUpdate}
            spacing={spacing}
            t={t}
          />
        )
      }

      <HeaderGeneral
        colors={colors}
        title={t("stadiums_title")}
        goBack={goBack}
        isMatchdaysScreen={false}
      />

      <SureGeneral />

      <Toast config={toastConfig} />

      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
        {
          group.stadiums!.length > 0 ? (
            <AddButton colors={colors} handleAdd={openCreateVenue} />
          ) : (
            <AddAction
              openForm={hideAndShowAddVenue}
              colors={colors}
              text={t("add_stadium")}
            />
          )
        }
        {
          group.stadiums!.length > 0 ? (
            <FlatList
              style={{ width: '100%' }}
              data={group.stadiums!}
              keyExtractor={(item) => item.id!}
              renderItem={renderVenue}
              initialNumToRender={10}
              windowSize={5}
              removeClippedSubviews
            />
          ) : (
            <Text variant="bodyMedium" style={createStyles.advideText}>
              {t("stadiums_empty")}
            </Text>
          )
        }
      </View>
    </MainScreen>
  );
};

export default VenuesScreen