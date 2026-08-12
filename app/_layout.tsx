import "@/utils/polyfills";
import "@/utils/sentry";
import 'react-native-reanimated';
import mobileAds, { TestIds } from 'react-native-google-mobile-ads';
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import * as Sentry from "@sentry/react-native";

import AppStack from "@/components/router/AppStack";

import { useUserStore } from '@/store/user.store';

import { darkTheme, lightTheme } from '@/utils/theme';

import { ThemeContext } from '@/hooks/useThemeContext';
import { LanguageProvider } from "@/hooks/useLanguageContext";

import { interstitialService } from '@/services/interstitialService';

SplashScreen.preventAutoHideAsync();

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : process.env.EXPO_PUBLIC_INTERSTITIAL_TOURNAMENT!;

function RootLayout() {

  const [loaded] = useFonts({
    Raleway_Regular: require('../assets/fonts/Raleway-Regular.ttf'),
    Raleway_Medium: require('../assets/fonts/Raleway-Medium.ttf'),
    Raleway_SemiBold: require('../assets/fonts/Raleway-SemiBold.ttf'),
    Raleway_Bold: require('../assets/fonts/Raleway-Bold.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />
}

export default Sentry.wrap(RootLayout)

function RootLayoutNav() {

  const systemScheme = useColorScheme();
  const { setPremium, premium } = useUserStore();

  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    mobileAds().initialize()
  }, [])

  useEffect(() => {
    async function loadInitialConfig() {
      try {

        const theme = await AsyncStorage.getItem("theme");

        if (theme === "light" || theme === "dark") {
          setThemeMode(theme);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }

    loadInitialConfig();
  }, []);

  useEffect(() => {

    if (!ready) return;

    requestIdleCallback(async () => {

      try {

        Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.VERBOSE : LOG_LEVEL.ERROR);

        const apiKey =
          Platform.OS === "ios"
            ? process.env.EXPO_PUBLIC_IOS_API_KEY
            : process.env.EXPO_PUBLIC_ANDROID_API_KEY;

        Purchases.configure({ apiKey: apiKey! });

        const customerInfo = await Purchases.getCustomerInfo();

        setPremium(
          !!customerInfo.entitlements.active["Premium Group Stage"]
        );

      } catch (e) {
        console.warn(e);
      }

    });

  }, [ready]);

  useEffect(() => {

    if (!ready) return;
    if (premium) return;

    interstitialService.initialize(adUnitId);

  }, [premium, ready]);

  const resolvedTheme =
    themeMode === "system" ? systemScheme : themeMode;

  if (!ready) return null;

  return (
    <LanguageProvider>
      <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
        <PaperProvider theme={resolvedTheme === "dark" ? darkTheme : lightTheme}>
          <StatusBar barStyle={resolvedTheme === "dark" ? "light-content" : "dark-content"} />
          <AppStack />
          {/* <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ title: "login", headerShown: false }} />
            <Stack.Screen name="home" options={{ title: "home", headerShown: false }} />
            <Stack.Screen name="create" options={{ title: "create", headerShown: false }} />
            <Stack.Screen name="config" options={{ title: "config", headerShown: false }} />
            <Stack.Screen name="stadiums" options={{ title: "stadiums", headerShown: false }} />
            <Stack.Screen name="referees" options={{ title: "referees", headerShown: false }} />
            <Stack.Screen name="players" options={{ title: "players", headerShown: false }} />
            <Stack.Screen name="match" options={{ title: "match", headerShown: false }} />
            <Stack.Screen name="matchknockout" options={{ title: "matchknockout", headerShown: false }} />
            <Stack.Screen name="signup" options={{ title: "signup", headerShown: false }} />
            <Stack.Screen name="tent" options={{ title: "tent", headerShown: false }} />
            <Stack.Screen name="settings" options={{ title: "settings", headerShown: false }} />
            <Stack.Screen name="reset-password" options={{ headerShown: false }} />
            <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
            <Stack.Screen name="auth/update" options={{ headerShown: false }} />
          </Stack> */}
        </PaperProvider>
      </ThemeContext.Provider>
    </LanguageProvider>
  );
}