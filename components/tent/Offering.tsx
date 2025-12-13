import { Button, Card, Text } from "react-native-paper";
import { View, Dimensions } from "react-native";
import i18n from "@/i18n";

import { OfferingPropsType } from "@/types/tent.types";

import { tentStyles } from "@/styles/tent.styles";

const getPeriodLabel = (period: string | null) => {
    if (!period) return i18n.t("one-time_purchase");
    if (period.includes("P1M")) return i18n.t("monthly");
    if (period.includes("P1Y")) return i18n.t("annual");
    return "";
};

const Offering = ({ pkg, handlePurchase, colors }: OfferingPropsType) => {

    const periodLabel = getPeriodLabel(pkg.product.subscriptionPeriod);

    return (
        <Card style={{
            marginTop: Dimensions.get("window").height / 74,
            borderColor: colors.primary,
            borderStyle: 'solid',
            borderWidth: 2,
            backgroundColor: colors.tertiary,
            width: '100%'
        }}>
            <Card.Content>
                <View style={tentStyles.headerOffering}>
                    <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{pkg.product.title.split("(")[0]}</Text>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold', color: colors.secondary }}>
                            {pkg.product.priceString}
                        </Text>
                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
                            {periodLabel}
                        </Text>
                    </View>
                </View>

            </Card.Content>

            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={() => handlePurchase(pkg)}
                    style={{ backgroundColor: colors.primary }}
                    labelStyle={{ color: "#ffffff" }}
                >
                    {i18n.t("subscribe")}
                </Button>
            </Card.Actions>
        </Card>
    )
}

export default Offering;