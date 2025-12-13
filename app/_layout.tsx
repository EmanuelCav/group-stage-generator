import 'react-native-reanimated';
import mobileAds from 'react-native-google-mobile-ads';
import * as Linking from "expo-linking";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import i18n from '@/i18n'

import { userStore } from '@/store/user.store';

import { darkTheme, lightTheme } from '@/utils/theme';

import { createSessionFromUrl } from '@/lib/providerAuth';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    Raleway: require('../assets/fonts/Raleway-Regular.ttf'),
    ...FontAwesome.font,
  });

  const url = Linking.useLinkingURL();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    if (url) createSessionFromUrl(url);
  }, [url]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  const colorScheme = useColorScheme()
  const { setPremium } = userStore()

  useEffect(() => {
    mobileAds().initialize().then(() => {
      console.log('AdMob initialized')
    })
  }, [])

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    const iosApiKey = `${process.env.EXPO_PUBLIC_IOS_API_KEY}`
    const androidApiKey = `${process.env.EXPO_PUBLIC_ANDROID_API_KEY}`
    const testApiKey = `${process.env.EXPO_PUBLIC_TEST_API_KEY}`

    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: iosApiKey });
    } else if (Platform.OS === 'android') {
      // Purchases.configure({ apiKey: testApiKey });
      Purchases.configure({ apiKey: androidApiKey });
    }

    getCustomerInfo()
  }, []);

  const getCustomerInfo = async () => {

    try {

      const customerInfo = await Purchases.getCustomerInfo();

      if (customerInfo.entitlements.active["Premium Group Stage"]) {
        setPremium(true)
      } else {
        setPremium(false)
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: i18n.t("login"), headerShown: false }} />
        <Stack.Screen name="home" options={{ title: i18n.t("groupstages"), headerShown: false }} />
        <Stack.Screen name="create" options={{ title: i18n.t("teams"), headerShown: false }} />
        <Stack.Screen name="config" options={{ title: i18n.t("config"), headerShown: false }} />
        <Stack.Screen name="stadiums" options={{ title: i18n.t("stadiums_title"), headerShown: false }} />
        <Stack.Screen name="referees" options={{ title: i18n.t("referees_title"), headerShown: false }} />
        <Stack.Screen name="players" options={{ title: i18n.t("players_title"), headerShown: false }} />
        <Stack.Screen name="match" options={{ title: i18n.t("match_title"), headerShown: false }} />
        <Stack.Screen name="matchknockout" options={{ title: i18n.t("match_title"), headerShown: false }} />
        <Stack.Screen name="signup" options={{ title: i18n.t("register"), headerShown: false }} />
        <Stack.Screen name="tent" options={{ title: i18n.t("tent"), headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
        <Stack.Screen name="auth/update" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
