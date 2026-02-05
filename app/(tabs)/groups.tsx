import { useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, { ErrorToast } from 'react-native-toast-message';
import * as StoreReview from 'expo-store-review';
import i18n from '@/i18n'

import MainScreen from '@/components/general/MainScreen'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import GroupsList from '@/components/groups/GroupsList'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'

import { groupStore } from '@/store/group.store'
import { userStore } from '@/store/user.store';

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
};

const Groups = () => {

  const { colors } = useTheme()
  const router = useRouter()
  const { group, sureRemoveGroup, sureRestartGroup, createGroup, groups } = groupStore()
  const { premium } = userStore()

  const goBack = () => {
    router.replace("/home")
  }

  const requestAppReview = async () => {

    try {

      const isAvailable = await StoreReview.isAvailableAsync()

      if (isAvailable) {
        await StoreReview.requestReview()
      }

    } catch (error) {
      console.error("Error requesting review:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const handleCount = async () => {

        try {

          const storedCount = await AsyncStorage.getItem("reviewCount");
          const count = storedCount ? parseInt(storedCount, 10) : 0;

          if (count !== 0 && (count === 3 || count % 50 === 0)) {
            requestAppReview();
          }

          await AsyncStorage.setItem("reviewCount", (count + 1).toString());

        } catch (error) {
          console.error("Error checking review count:", error);
        }
      };

      handleCount();
    }, [])
  );

  return (
    <MainScreen colors={colors}>
      <HeaderGeneral colors={colors} router={router} title={i18n.t("groups")} goBack={goBack}
        sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup}
        createGroup={createGroup} group={group} groups={groups} premium={premium} />
      <SureGeneral />
      {
        group.isGeneratedAgain && <GenerateAgain colors={colors} />
      }
      <Toast config={toastConfig} />
      <GroupsList group={group} colors={colors} />
    </MainScreen>
  )
}

export default Groups