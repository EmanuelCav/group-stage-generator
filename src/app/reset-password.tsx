import { useState } from "react";
import { View, Alert, Dimensions } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

import MainScreen from "@/components/general/MainScreen";
import Email from "@/components/auth/Email";

import { generalStyles } from "@/styles/general.styles";
import { authStyles } from "@/styles/auth.styles";

import { isValidEmail } from "@/utils/auth";

import { supabase } from "@/lib/supabase";

import { useSpacing } from "@/hooks/useSpacing";
import { useLanguage } from "@/hooks/useLanguageContext";

const ResetPassword = () => {

    const { colors } = useTheme()
    const { t } = useLanguage()
    const router = useRouter()

    const [email, setEmail] = useState<string>("");
    const [errorData, setErrorData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const spacing = useSpacing()

    const handleComeback = () => {
        router.replace("/")
    }

    const handleSendEmail = async () => {

        try {

            setLoading(true)

            if (!email) {
                setErrorData(t("emptyFields"));
                return;
            }

            if (!isValidEmail(email)) {
                setErrorData(t("invalidEmail"));
                return;
            }

            const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "groupstagegenerator://auth/update"
            })

            if (error) {
                setErrorData(error.message)
                return
            }

            if (data) {
                setErrorData("")
                Alert.alert(t("email_sent"), t("check_email"))
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    return (
        <MainScreen colors={colors}>

            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background, alignItems: "stretch" }]}>

                <Text variant='titleMedium' style={authStyles.titleAuth}>
                    {t("recover_account")}
                </Text>

                <Email
                    email={email}
                    setEmail={setEmail}
                    colors={colors}
                    spacing={spacing}
                />

                {
                    errorData &&
                    <Text style={{ color: 'red' }}>
                        {errorData}
                    </Text>
                }

                <Button mode="contained" onPress={handleSendEmail} loading={loading} disabled={loading}
                    labelStyle={{ color: "#ffffff" }}
                    style={[{ marginTop: Dimensions.get("window").height / 41 },
                    generalStyles.generateButton]}>
                    {t("send_email")}
                </Button>

                <Button
                    onPress={handleComeback}
                    style={authStyles.textContinueWithoutLogin}
                    labelStyle={{
                        fontSize: 15
                    }}
                >
                    {t("back")}
                </Button>

            </View>
        </MainScreen>
    )
}

export default ResetPassword