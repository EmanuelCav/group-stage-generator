import { Dimensions, StyleSheet } from 'react-native'

export const indexStyles = StyleSheet.create({

    containTournament: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    imageTournament: {
        width: Dimensions.get("window").width / 6,
        height: Dimensions.get("window").height / 18.5,
        borderRadius: 8
    },

    textTournament: {
        marginTop: Dimensions.get("window").height / 182
    }

})