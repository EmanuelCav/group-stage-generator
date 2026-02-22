import { Dimensions, StyleSheet } from 'react-native'

export const eliminationStyles = StyleSheet.create({

    scrollContainer: {
        flexDirection: 'row',
        padding: Dimensions.get("window").height / 37,
    },

    column: {
        marginRight: Dimensions.get("window").width / 9,
        alignItems: 'center'
    },

    roundTitle: {
        marginBottom: Dimensions.get("window").height / 36,
        fontFamily: 'Raleway_Bold'
    },

    match: {
        width: Dimensions.get("window").width / 1.44,
        padding: Dimensions.get("window").height / 61,
        marginVertical: Dimensions.get("window").height / 29,
        borderWidth: 2,
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: "#ffffff",
        gap: 10,
    },

    teamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Dimensions.get("window").height / 106
    }

})