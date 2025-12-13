import { Router } from "expo-router"
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { PurchasesPackage } from "react-native-purchases";

export type HeaderTentPropsType = {
    router: Router;
    colors: MD3Colors
}

export type OfferingPropsType = {
    pkg: PurchasesPackage;
    handlePurchase: (pkg: PurchasesPackage) => void
    colors: MD3Colors;
}