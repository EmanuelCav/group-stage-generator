import { useState } from 'react';
import { Dimensions, View, Alert } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const SignUp = () => {

    const router = useRouter()
    const { colors } = useTheme()
    const { setGroups } = groupStore()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorData, setErrorData] = useState<string>("");

    const continueWithoutLogin = async () => {
        await AsyncStorage.setItem("without_account", "yes")
        router.replace("/home")
    }

    const handleSignUp = async () => {

        try {

            if (password !== confirmPassword) {
                setErrorData(i18n.t("passwordDontMatch"))
                return
            }

            if (password.length < 6) {
                setErrorData(i18n.t("sixCharacters"))
                return
            }

            setLoading(true)

            const { error, data } = await supabase.auth.signUp({
                email, password,
                options: {
                    emailRedirectTo: "groupstagegenerator://auth/callback"
                }
            })

            setLoading(false)

            if (error) {
                setErrorData(error.message)
                return
            }

            if (data.user) {

                setErrorData("")
                Alert.alert(i18n.t("successfullyRegister"), i18n.t("checkToVerify"));

                setTimeout(() => {
                    router.replace("/")
                }, 2000);
            }

        } catch (error) {
            console.log("Error to register: ", error);
        }
    }

    const handleSignInWithGoogle = async () => {
        const data = await signInWithGoogle()
        const groupsData = await getGroupsFromSupabase(data?.user?.id!)

        if (groupsData.length > 0) {
            setGroups(groupsData)
            router.replace("/home")
        } else {
            router.replace("/create")
        }
    }

    return (
        <MainScreen colors={colors}>
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background, alignItems: "stretch" }]}>
                <Text variant='titleMedium' style={authStyles.titleAuth}>
                    {i18n.t("startNow")}
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

                <Password
                    label={i18n.t("confirmPassword")}
                    setValue={setConfirmPassword}
                    value={confirmPassword}
                    colors={colors}
                />

                {
                    errorData &&
                    <Text style={{ color: 'red' }}>
                        {errorData}
                    </Text>
                }

                <Button mode="contained" onPress={handleSignUp} loading={loading}
                    labelStyle={{ color: "#ffffff" }}
                    style={[{ marginTop: Dimensions.get("window").height / 41 },
                    generalStyles.generateButton]}>
                    {i18n.t("register")}
                </Button>

                <ChangeAuth
                    text={i18n.t("already_account")}
                    buttonText={i18n.t("login")}
                    navigate={() => router.replace("/")}
                    colors={colors}
                />

                <Button icon="google" mode="outlined" onPress={handleSignInWithGoogle}>
                    {i18n.t("google_signin")}
                </Button>

                <Button
                    onPress={continueWithoutLogin}
                    style={authStyles.textContinueWithoutLogin}
                >
                    {i18n.t("title_without_account")}
                </Button>

            </View>
        </MainScreen>
    );
}

export default SignUp