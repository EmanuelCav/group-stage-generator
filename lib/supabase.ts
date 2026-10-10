import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const ExpoWebAdapter = {
    getItem: (key: string) => {
        return AsyncStorage.getItem(key)
    },
    setItem: (key: string, value: string) => {
        return AsyncStorage.setItem(key, value)
    },
    removeItem: (key: string) => {
        return AsyncStorage.removeItem(key)
    },
};

const supabaseUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}`;
const supabaseAnonKey = `${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`;

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            storage: ExpoWebAdapter,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false
        },
    },
);

if (Platform.OS !== 'web') {
    AppState.addEventListener('change', (state) => {
        if (state === 'active') {
            supabase.auth.startAutoRefresh();
        } else {
            supabase.auth.stopAutoRefresh();
        }
    });
}