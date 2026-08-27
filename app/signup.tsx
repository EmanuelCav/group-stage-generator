import { useState } from 'react';
import { Dimensions, View, Alert } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainScreen from '@/components/general/MainScreen';
import Password from '@/components/auth/Password';
import Email from '@/components/auth/Email';
import ChangeAuth from '@/components/auth/ChangeAuth';

import { generalStyles } from '@/styles/general.styles';
import { authStyles } from '@/styles/auth.styles';

import { useGroupStore } from '@/store/group.store';

import { checkRateLimit, isStrongPassword, isValidEmail, isWeakPassword, registerAttempt } from '@/utils/auth';

import { supabase } from '../lib/supabase';
import { signInWithGoogle } from '../lib/providerAuth';
import { getGroupsFromSupabase } from '@/lib/save';

import { useSpacing } from '@/hooks/useSpacing';
import { useLanguage } from '@/hooks/useLanguageContext';

const SignUp = () => {

    const { t } = useLanguage()
    const { colors } = useTheme()

    const router = useRouter()
    const { setGroups } = useGroupStore()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorData, setErrorData] = useState<string>("");
    const [blockedUntil, setBlockedUntil] = useState<number | null>(null);

    const spacing = useSpacing()

    const continueWithoutLogin = async () => {
        await AsyncStorage.setItem("without_account", "yes")
        router.replace("/home")
    }

    const handleSignUp = async () => {

        try {

            setLoading(true)

            const isBlocked = await checkRateLimit(setBlockedUntil)

            if (isBlocked) {
                setErrorData(t("manyAttempts"));
                return;
            }

            if (!email || !password || !confirmPassword) {
                setErrorData(t("emptyFields"));
                return;
            }

            if (!isValidEmail(email)) {
                setErrorData(t("invalidEmail"));
                return;
            }

            if (!isStrongPassword(password)) {
                setErrorData(t("sixCharacters"));
                return;
            }
            
            if (password !== confirmPassword) {
                setErrorData(t("passwordDontMatch"))
                return
            }

            if (!isWeakPassword(password)) {
                setErrorData(t("weakPassword"));
                return;
            }

            const { error, data } = await supabase.auth.signUp({
                email, password,
                options: {
                    emailRedirectTo: "groupstagegenerator://auth/callback"
                }
            })

            await registerAttempt()

            if (error) {
                setErrorData(error.message)
                return
            }

            if (data.user) {

                setErrorData("")
                Alert.alert(t("successfullyRegister"), t("checkToVerify"));
                await AsyncStorage.setItem("amount_groups_general", "0")

                setTimeout(() => {
                    router.replace("/")
                }, 2000);
            }

        } catch (error) {
            console.log("Error to register: ", error);
        } finally {
            setLoading(false)
        }
    }

    const handleSignInWithGoogle = async () => {
        try {
            setLoading(true);

            const data = await signInWithGoogle();
            const userId = data?.user?.id;

            if (!userId) return;

            const groupsData = await getGroupsFromSupabase(userId);

            if (groupsData.length > 0) {
                setGroups(groupsData);
                await AsyncStorage.setItem("amount_groups_general", groupsData.length.toString());
            } else {
                await AsyncStorage.setItem("amount_groups_general", "0");
            }
        } catch (error) {
            console.log("Google Sign-In error:", error)
            setErrorData("Google sign-in failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainScreen colors={colors}>
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background, alignItems: "stretch" }]}>
                <Text variant='titleMedium' style={authStyles.titleAuth}>
                    {t("startNow")}
                </Text>

                <Email
                    email={email}
                    setEmail={setEmail}
                    colors={colors}
                    spacing={spacing}
                />

                <Password
                    label={t("password")}
                    setValue={setPassword}
                    value={password}
                    colors={colors}
                    spacing={spacing}
                />

                <Password
                    label={t("confirmPassword")}
                    setValue={setConfirmPassword}
                    value={confirmPassword}
                    colors={colors}
                    spacing={spacing}
                />

                {
                    errorData &&
                    <Text style={{ color: 'red' }}>
                        {errorData}
                    </Text>
                }

                <Button mode="contained" onPress={handleSignUp} loading={loading}
                    disabled={(blockedUntil !== null && Date.now() < blockedUntil) || loading}
                    labelStyle={{ color: "#ffffff" }}
                    style={[{ marginTop: Dimensions.get("window").height / 41 },
                    generalStyles.generateButton]}>
                    {t("register")}
                </Button>

                <ChangeAuth
                    text={t("already_account")}
                    buttonText={t("login")}
                    navigate={() => router.replace("/")}
                    colors={colors}
                    spacing={spacing}
                />

                <Button icon="google" mode="outlined" onPress={handleSignInWithGoogle} disabled={loading} loading={loading}>
                    {t("google_signin")}
                </Button>

                <Button
                    onPress={continueWithoutLogin}
                    style={authStyles.textContinueWithoutLogin}
                >
                    {t("title_without_account")}
                </Button>

            </View>
        </MainScreen>
    );
}

export default SignUp