import { Dimensions, StyleSheet } from 'react-native'

export const tentStyles = StyleSheet.create({

    headerOffering: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Dimensions.get("window").height / 74,
    },

    benefitContainer: {
        marginVertical: Dimensions.get("window").height / 106,
        gap: 4,
    }

})