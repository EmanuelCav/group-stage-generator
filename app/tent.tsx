import { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import Purchases, { PurchasesOffering, PurchasesPackage } from "react-native-purchases";
import { Text, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MainScreen from "@/components/general/MainScreen";
import HeaderTent from "@/components/tent/HeaderTent";
import Offering from "@/components/tent/Offering";
import Benefits from "@/components/tent/Benefits";

import { generalStyles } from "@/styles/general.styles";
import { tentStyles } from "@/styles/tent.styles";

import { useUserStore } from "@/store/user.store";

import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguageContext";

const Tent = () => {

    const [offerings, setOfferings] = useState<PurchasesOffering | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    const { colors } = useTheme()
    const { t } = useLanguage()

    const { user } = useAuth()
    const { setPremium, premium } = useUserStore()
    const router = useRouter()

    const { message } = useLocalSearchParams<{ message?: string }>();

    useEffect(() => {

        const fetchOfferings = async () => {

            try {

                const offeringsData = await Purchases.getOfferings();
                setOfferings(offeringsData.current);

            } catch (error) {
                console.warn("Error fetching offerings:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOfferings();

    }, []);

    const handlePurchase = async (packageToBuy: PurchasesPackage) => {

        if (!user) {
            await AsyncStorage.removeItem("without_account");
            router.replace("/")
            return
        }

        try {

            const { customerInfo } = await Purchases.purchasePackage(packageToBuy);

            if (customerInfo.entitlements.active["Premium Group Stage"]) {
                setPremium(true)
                Alert.alert(t("congrulations"), t("successSubscription"))
            }

        } catch (error: any) {

            if (error.code === Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
                return;
            }

            if (error.code === Purchases.PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR) {
                Alert.alert("Not allowed", "The store does not allow purchases.");
                return;
            }

            if (error.code === Purchases.PURCHASES_ERROR_CODE.NETWORK_ERROR) {
                Alert.alert("Offline", "Unable to connect. Please try again.");
                return;
            }

            Alert.alert(t("error"), t("error_buy_tent"))
        }
    }

    if (loading) return <ActivityIndicator style={{ flex: 1, backgroundColor: colors.background }} size="large" />

    return (
        <MainScreen colors={colors}>
            <HeaderTent colors={colors} router={router} />
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
                {
                    message && <Text variant="bodyMedium" style={tentStyles.reachedTournament}>
                        {message}
                    </Text>
                }
                <Text variant="titleMedium" style={{ textAlign: "center" }}>
                    {premium ? t("titleIsPremium") : t("titleTent")}
                </Text>
                {!premium && offerings?.availablePackages.map((pkg) => (
                    <Offering
                        pkg={pkg}
                        handlePurchase={handlePurchase}
                        colors={colors}
                        t={t}
                        key={pkg.identifier}
                    />
                ))}
                <Benefits colors={colors} t={t} />
            </View>
        </MainScreen>
    );
}

export default Tent