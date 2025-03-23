import { Dimensions, StyleSheet } from 'react-native'

export const indexStyles = StyleSheet.create({

    containTournament: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    imageTournament: {
        width: Dimensions.get("window").width / 9,
        height: Dimensions.get("window").height / 18.5,
        borderRadius: 8
    },

    textTournament: {
        color: "#ffffff",
        marginTop: Dimensions.get("window").height / 182
    }

})