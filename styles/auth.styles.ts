import { Dimensions, StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({

    titleAuth: {
        textAlign: "center",
        marginBottom: Dimensions.get("window").height / 74
    },

    anotherAccountContain: {
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        flexDirection: 'row',
        marginVertical: Dimensions.get("window").height / 74
    },

    textContinueWithoutLogin: {
        marginTop: Dimensions.get("window").height / 58,
        textAlign: "center"
    }

})