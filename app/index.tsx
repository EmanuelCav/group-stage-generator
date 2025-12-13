import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
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

import { useAuth } from '@/hooks/auth';

const Index = () => {

    const router = useRouter()
    const { setGroups, groups } = groupStore()
    const { colors } = useTheme()
    const { user, loadingUser } = useAuth()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorData, setErrorData] = useState<string>("");

    const handleSignIn = async () => {

        try {

            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({ email, password })

            setLoading(false);

            if (error) {
                setErrorData(error.message)
                return
            }

            if (data.user) {

                const groupsData = await getGroupsFromSupabase(data.user.id)
                setErrorData("")

                if (groupsData.length > 0) {
                    setGroups(groupsData)
                    router.replace("/home")
                } else {
                    router.replace("/create")
                }

            }

        } catch (error) {
            console.log(error);
        }

    }

    const continueWithoutLogin = async () => {
        await AsyncStorage.setItem("without_account", "yes")

        if (groups.length === 0) {
            router.replace('/create')
        } else {
            router.replace('/home')
        }
    }

    const handleSignInWithGoogle = async () => {
        const data = await signInWithGoogle()
        const userId = data?.user?.id

        if (!userId) return

        const groupsData = await getGroupsFromSupabase(userId)

        if (groupsData.length > 0) {
            setGroups(groupsData)
            router.replace("/home")
        } else {
            router.replace("/create")
        }
    }

    useEffect(() => {
        (async () => {
            const user_decision = await AsyncStorage.getItem("without_account")

            if (user || user_decision === "yes") {
                if (groups.length > 0) {
                    router.replace("/home")
                } else {
                    router.replace("/create")
                }
            }
        })()
    }, [loadingUser])

    if (loadingUser || user) return <ActivityIndicator style={{ flex: 1, backgroundColor: colors.background }} size="large" />

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
                />

                <Password
                    label={i18n.t("password")}
                    setValue={setPassword}
                    value={password}
                    colors={colors}
                />

                {
                    errorData &&
                    <Text style={{ color: 'red' }}>
                        {errorData}
                    </Text>
                }

                <Button mode="contained" onPress={handleSignIn} loading={loading}
                    labelStyle={{ color: "#ffffff" }}
                    style={[{ marginTop: Dimensions.get("window").height / 41 },
                    generalStyles.generateButton]}>
                    {i18n.t("login")}
                </Button>

                <View style={[authStyles.anotherAccountContain, { backgroundColor: colors.background }]}>
                    <Text>
                        {i18n.t("forgot_password")}
                    </Text>
                    <Button
                        style={{ marginLeft: Dimensions.get("window").width / 74 }}
                        onPress={() => router.navigate("/reset-password")}
                    >
                        {i18n.t("restart")}
                    </Button>
                </View>

                <ChangeAuth
                    text={i18n.t("not_account")}
                    buttonText={i18n.t("register")}
                    navigate={() => router.replace("/signup")}
                    colors={colors}
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