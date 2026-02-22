import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, useRouter } from 'expo-router';
import i18n from '@/i18n';

import MainScreen from '@/components/general/MainScreen';
import Password from '@/components/auth/Password';
import Email from '@/components/auth/Email';
import ChangeAuth from '@/components/auth/ChangeAuth';

import { generalStyles } from '@/styles/general.styles';
import { authStyles } from '@/styles/auth.styles';

import { groupStore } from '@/store/group.store';

import { supabase } from '../lib/supabase';
import { signInWithGoogle } from '../lib/providerAuth';
import { getGroupsFromSupabase } from '@/lib/save';

import { useAuth } from '@/hooks/useAuth';
import { useSpacing } from '@/hooks/useSpacing';

const Index = () => {

    const router = useRouter()
    const { setGroups } = groupStore()
    const { colors } = useTheme()
    const { user, loadingUser } = useAuth()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorData, setErrorData] = useState<string>("");

    const spacing = useSpacing()

    const handleSignIn = async () => {

        try {

            if (!email || !password) {
                setErrorData(i18n.t("emptyFields"));
                return;
            }

            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({ email, password })

            if (error) {
                setErrorData(error.message)
                return
            }

            if (data.user) {
                const groupsData = await getGroupsFromSupabase(data.user.id)
                setErrorData("")

                if (groupsData.length > 0) {
                    setGroups(groupsData)
                    await AsyncStorage.setItem("amount_groups_general", groupsData.length.toString())
                } else {
                    await AsyncStorage.setItem("amount_groups_general", "0")
                }
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const continueWithoutLogin = async () => {
        await AsyncStorage.setItem("without_account", "yes")
        router.replace('/home')
    }

    const handleSignInWithGoogle = async () => {
        const data = await signInWithGoogle()
        const userId = data?.user?.id

        if (!userId) return

        const groupsData = await getGroupsFromSupabase(userId)

        if (groupsData.length > 0) {
            setGroups(groupsData)
            await AsyncStorage.setItem("amount_groups_general", groupsData.length.toString())
        } else {
            await AsyncStorage.setItem("amount_groups_general", "0")
        }
    }

    useEffect(() => {
        (async () => {
            const user_decision = await AsyncStorage.getItem("without_account")

            if (user_decision === "yes") {
                router.replace("/home")
            }

        })()
    }, [router])

    if (loadingUser) return <ActivityIndicator style={{ flex: 1, backgroundColor: colors.background }} size="large" />

    if (user) return <Redirect href="/home" />

    return (
        <MainScreen colors={colors}>
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background, alignItems: "stretch" }]}>
                <Text variant='titleMedium' style={authStyles.titleAuth}>
                    {i18n.t("title_login")}
                </Text>

                <Email
                    email={email}
                    setEmail={setEmail}
                    colors={colors}
                    spacing={spacing}
                />

                <Password
                    label={i18n.t("password")}
                    setValue={setPassword}
                    value={password}
                    colors={colors}
                    spacing={spacing}
                />

                {
                    errorData &&
                    <Text style={{ color: 'red' }}>
                        {errorData}
                    </Text>
                }

                <Button mode="contained" onPress={handleSignIn} loading={loading}
                    labelStyle={{ color: "#ffffff" }}
                    style={[{ marginTop: spacing.h41 },
                    generalStyles.generateButton]}>
                    {i18n.t("login")}
                </Button>

                <View style={[authStyles.anotherAccountContain, { backgroundColor: colors.background }]}>
                    <Text>
                        {i18n.t("forgot_password")}
                    </Text>
                    <Button
                        style={{ marginLeft: spacing.w72 }}
                        onPress={() => router.replace("/reset-password")}
                    >
                        {i18n.t("restart")}
                    </Button>
                </View>

                <ChangeAuth
                    text={i18n.t("not_account")}
                    buttonText={i18n.t("register")}
                    navigate={() => router.replace("/signup")}
                    colors={colors}
                    spacing={spacing}
                />

                <Button icon="google" mode="outlined"
                    onPress={handleSignInWithGoogle}>
                    {i18n.t("google_signin")}
                </Button>

                <Button
                    onPress={continueWithoutLogin}
                    style={authStyles.textContinueWithoutLogin}
                    labelStyle={{
                        fontSize: 15
                    }}
                >
                    {i18n.t("title_without_account")}
                </Button>

            </View>
        </MainScreen>
    );
}

export default Index