import { BackHandler } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import i18n from '@/i18n'

import { View } from '@/components/Themed';
import Tournaments from '@/components/index/Tournaments';
import AddGroupStage from '@/components/index/AddGroupStage';
import Banner from '@/components/general/Banner';
import MainScreen from '@/components/general/MainScreen';
import HeaderTournaments from '@/components/index/HeaderTournaments';
import Sure from '@/components/general/Sure';

import { IGroup } from '@/interface/Group';

import { generalStyles } from '@/styles/general.styles';

import { groupStore } from '@/store/group.store';
import { userStore } from '@/store/user.store';

import { groupValue } from '@/utils/defaultGroup';

import { useAuth } from '@/hooks/auth';

import { handleSignOut } from '@/lib/providerAuth';
import { saveGroupsToSupabase } from '@/lib/save';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL_TOURNAMENT}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const Home = () => {

  const { colors } = useTheme()
  const { user } = useAuth()

  const { groups, idGroup, createGroup, getGroup, setGroups } = groupStore()
  const { premium } = userStore()

  const router = useRouter()

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isSureLogOut, setIsSureLogOut] = useState<boolean>(false)
  const [isIntersitialLoaded, setIsIntersitialLoaded] = useState<boolean>(false)

  const handleCreateTournament = () => {

    if (!premium && groups.length >= 2) {
      router.navigate("/tent")
      return
    }

    createGroup(groupValue(idGroup, user ? user.id : null))
    router.replace("/create")
  }

  const handleGroup = async (group: IGroup) => {

    getGroup(group)

    const storedCount = await AsyncStorage.getItem("reviewCount");
    const count = storedCount ? parseInt(storedCount, 10) : 0;

    try {

      if (count > 3) {
        if ((interstitial.loaded || isIntersitialLoaded) && !premium && count % 3 === 0) {
          interstitial.show()
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
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (groups) {
      if (isMounted && groups.length > 0 && user) {
        saveGroupsToSupabase(groups, user.id);
      }
    }
  }, [isMounted, groups]);

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

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      )

      return () => subscription.remove()
    }, [])
  )

  if (!isMounted) return <ActivityIndicator style={{ flex: 1, backgroundColor: colors.background }} size="large" />

  return (
    <MainScreen colors={colors}>
      {
        isSureLogOut && <Sure close={() => setIsSureLogOut(false)} text={i18n.t("sure_logout")}
          func={() => handleSignOut(setIsSureLogOut, router, setGroups, getGroup)} labelButton={i18n.t("logout")}
        />
      }
      <HeaderTournaments router={router} user={user} setIsSureLogOut={setIsSureLogOut} />
      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
        {
          !premium && <Banner />
        }
        <Text variant='titleLarge' style={{ color: colors.primary }}>{i18n.t("titleIndex")}</Text>
        <Text variant='titleMedium'>{i18n.t("selectGroupStage")}</Text>
        <Tournaments groups={groups} colors={colors} handleGroup={handleGroup} />
        <AddGroupStage colors={colors} handleCreateTournament={handleCreateTournament} />
      </View>
    </MainScreen>
  );
}

export default Home