import { useState } from "react";
import { View, Alert, Dimensions } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import i18n from "@/i18n";

import MainScreen from "@/components/general/MainScreen";
import Password from "@/components/auth/Password";

import { generalStyles } from "@/styles/general.styles";
import { authStyles } from "@/styles/auth.styles";

import { supabase } from "@/lib/supabase";

const UpdatePassword = () => {

    const { colors } = useTheme()
    const router = useRouter()

    const [password, setPassword] = useState<string>("");
    const [errorData, setErrorData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpdatePassword = async () => {

        setLoading(true)

        const { error, data } = await supabase.auth.updateUser({
            password
        })

        setLoading(false)

        if (error) {
            setErrorData(error.message)
            return
        }

        if (data.user) {

            await supabase.auth.signOut()

            setErrorData("")
            Alert.alert(i18n.t("updated_password"), i18n.t("now_login"))

            setTimeout(() => {
                router.replace("/")
            }, 2000);
        }

    }

    return (
        <MainScreen colors={colors}>

            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background, alignItems: "stretch" }]}>

                <Text variant='titleMedium' style={authStyles.titleAuth}>
                    {i18n.t("restart_password_title")}
                </Text>

                <Password
                    colors={colors}
                    label={i18n.t("new_password")}
                    setValue={setPassword}
                    value={password}
                />


                {
                    errorData &&
                    <Text style={{ color: 'red' }}>
                        {errorData}
                    </Text>
                }

                <Button mode="contained" onPress={handleUpdatePassword} loading={loading}
                    labelStyle={{ color: "#ffffff" }}
                    style={[{ marginTop: Dimensions.get("window").height / 41 },
                    generalStyles.generateButton]}>
                    {i18n.t("restart")}
                </Button>

            </View>
        </MainScreen>
    );
}

export default UpdatePassword