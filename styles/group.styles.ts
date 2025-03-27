import { Dimensions, StyleSheet } from "react-native";

export const groupStyles = StyleSheet.create({

    rowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    rowStart: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },

    rowEnd: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },

    textMatchGroup: {
        marginLeft: Dimensions.get("window").width / 28,
        marginVertical: Dimensions.get("window").height / 106
    }

})