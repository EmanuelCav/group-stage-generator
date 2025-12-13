import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { ActivityIndicator, useTheme } from "react-native-paper";

import { supabase } from "@/lib/supabase";

export default function AuthCallback() {

  const { colors } = useTheme()

  const params = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    
    const code = params.code as string | undefined;

    if (!code) {
      router.replace("/create");
      return
    }

    supabase.auth.exchangeCodeForSession(code)
      .then(() => router.replace("/create"))
      .catch((err) => console.log("Error al intercambiar código:", err));
  }, [params])

  return <ActivityIndicator style={{ flex: 1, backgroundColor: colors.background }} size="large" />
}
