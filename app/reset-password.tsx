import { useState } from "react";
import { View, Alert, Dimensions } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import i18n from "@/i18n";

import MainScreen from "@/components/general/MainScreen";
import Email from "@/components/auth/Email";

import { generalStyles } from "@/styles/general.styles";
import { authStyles } from "@/styles/auth.styles";

import { isValidEmail } from "@/utils/auth";

import { supabase } from "@/lib/supabase";

import { useSpacing } from "@/hooks/useSpacing";

const ResetPassword = () => {

    const { colors } = useTheme()
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

            if (!email) {
                setErrorData(i18n.t("emptyFields"));
                return;
            }

            if (!isValidEmail(email)) {
                setErrorData(i18n.t("invalidEmail"));
                return;
            }

            setLoading(true)

            const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "groupstagegenerator://auth/update"
            })

            if (error) {
                setErrorData(error.message)
                return
            }

            if (data) {
                setErrorData("")
                Alert.alert(i18n.t("email_sent"), i18n.t("check_email"))
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
                    {i18n.t("recover_account")}
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

                <Button mode="contained" onPress={handleSendEmail} loading={loading}
                    labelStyle={{ color: "#ffffff" }}
                    style={[{ marginTop: Dimensions.get("window").height / 41 },
                    generalStyles.generateButton]}>
                    {i18n.t("send_email")}
                </Button>

                <Button
                    onPress={handleComeback}
                    style={authStyles.textContinueWithoutLogin}
                    labelStyle={{
                        fontSize: 15
                    }}
                >
                    {i18n.t("back")}
                </Button>

            </View>
        </MainScreen>
    )
}

export default ResetPassword