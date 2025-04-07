import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';

import { responseStore } from '@/store/response.store';

import { theme } from '@/utils/theme';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    handleLoading(false)
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: "Index", headerShown: false }} />
        <Stack.Screen name="create" options={{ title: "Create", headerShown: false }} />
        <Stack.Screen name="config" options={{ title: "Config", headerShown: false }} />
        <Stack.Screen name="stadiums" options={{ title: "Stadiums", headerShown: false }} />
        <Stack.Screen name="referees" options={{ title: "Referees", headerShown: false }} />
        <Stack.Screen name="players" options={{ title: "Players", headerShown: false }} />
        <Stack.Screen name="match" options={{ title: "Match", headerShown: false }} />
        <Stack.Screen name="matchknockout" options={{ title: "Matchknockout", headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
