import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { TestIds } from 'react-native-google-mobile-ads';
import i18n from '@/i18n'

import { View } from '@/components/Themed';
import Tournaments from '@/components/index/Tournaments';
import AddGroupStage from '@/components/index/AddGroupStage';
import Banner from '@/components/general/Banner';
import MainScreen from '@/components/general/MainScreen';
import HeaderTournaments from '@/components/index/HeaderTournaments';
import AddTournament from '@/components/index/AddTournament';

import { IGroup } from '@/interface/Group';

import { generalStyles } from '@/styles/general.styles';

import { groupStore } from '@/store/group.store';
import { userStore } from '@/store/user.store';

import { groupValue } from '@/utils/defaultGroup';

import { useAuth } from '@/hooks/useAuth';

import { saveGroupsToSupabase } from '@/lib/save';

import { useInterstitialAd } from '@/hooks/useInterstitialAd';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_TOURNAMENT}`;

const Home = () => {

  const { colors } = useTheme()
  const { user } = useAuth()

  const { groups, idGroup, createGroup, getGroup } = groupStore()
  const { premium } = userStore()

  const router = useRouter()

  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { interstitial, isLoaded: isInterstitialLoaded } = useInterstitialAd(premium ? null : adUnitId)

  const handleCreateTournament = async () => {

    const getAmountGroups = await AsyncStorage.getItem("amount_groups_general")

    if (!premium && (groups.length >= 2 || Number(getAmountGroups) >= 2)) {
      router.navigate({
        pathname: "/tent",
        params: { message: i18n.t("reachedTournament") }
      })
      return
    }

    await AsyncStorage.setItem("amount_groups_general", String(Number(getAmountGroups) + 1))
    router.navigate("/create")

    setTimeout(() => {
      createGroup(groupValue(idGroup, user ? user.id : null))
    }, 0)
  }

  const handleGroup = async (group: IGroup) => {

    getGroup(group)

    const storedCount = await AsyncStorage.getItem("reviewCount");
    const count = storedCount ? parseInt(storedCount, 10) : 0;

    try {

      if (interstitial) {
        if (count > 3) {
          if ((interstitial.loaded || isInterstitialLoaded) && !premium && count % 3 === 0) {
            interstitial.show()
          }
        }
      }

    } catch (error) {
      console.log(error);
    }

    if (group.isGenerated) {
      router.navigate("/(tabs)/groups")
    } else {
      router.navigate("/create")

      await AsyncStorage.setItem("reviewCount", (count + 1).toString());
    }
  }

  useEffect(() => {
    if (router.canGoBack()) {
      router.dismiss(1)
    }

    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (groups) {
      if (isMounted && groups.length > 0 && user) {
        saveGroupsToSupabase(groups, user.id);
      }
    }
  }, [isMounted, groups]);

  if (!isMounted) return <ActivityIndicator style={{ flex: 1, backgroundColor: colors.background }} size="large" />

  return (
    <MainScreen colors={colors}>
      <HeaderTournaments router={router} />
      {
        !premium && <Banner />
      }
      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
        {
          groups.length > 0 ?
            <>
              <Text variant='titleLarge' style={{ color: colors.primary }}>{i18n.t("titleIndex")}</Text>
              <Text variant='titleMedium'>{i18n.t("selectGroupStage")}</Text>
              <Tournaments groups={groups} colors={colors} handleGroup={handleGroup} />
              <AddGroupStage colors={colors} handleCreateTournament={handleCreateTournament} />
            </> : <AddTournament handleCreateTournament={handleCreateTournament} colors={colors} />
        }
      </View>
    </MainScreen>
  );
}

export default Home