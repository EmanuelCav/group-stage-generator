import 'react-native-reanimated';
import mobileAds from 'react-native-google-mobile-ads';
import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { PaperProvider } from 'react-native-paper';
import i18n from '@/i18n'

import { responseStore } from '@/store/response.store';

import { theme } from '@/utils/theme';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Raleway: require('../assets/fonts/Raleway-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  const { handleLoading } = responseStore()

  useEffect(() => {
    mobileAds().initialize().then(() => {
      console.log('AdMob initialized')
    })
  }, [])

  useEffect(() => {
    handleLoading(false)
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Toast />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: i18n.t("index"), headerShown: false }} />
        <Stack.Screen name="create" options={{ title: i18n.t("teams"), headerShown: false }} />
        <Stack.Screen name="config" options={{ title: i18n.t("config"), headerShown: false }} />
        <Stack.Screen name="stadiums" options={{ title: i18n.t("stadiums_title"), headerShown: false }} />
        <Stack.Screen name="referees" options={{ title: i18n.t("referees_title"), headerShown: false }} />
        <Stack.Screen name="players" options={{ title: i18n.t("players_title"), headerShown: false }} />
        <Stack.Screen name="match" options={{ title: i18n.t("match_title"), headerShown: false }} />
        <Stack.Screen name="matchknockout" options={{ title: i18n.t("match_title"), headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
