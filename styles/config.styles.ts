import { Dimensions, StyleSheet } from 'react-native'

export const configStyles = StyleSheet.create({

    containerSettings: {
        flex: 1,
        width: '100%',
        padding: Dimensions.get("window").height / 106
    },

    labelSettings: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: Dimensions.get("window").height / 106
    },

    textConfig: {
        marginBottom: Dimensions.get("window").height / 47
    },

    inputSettingsNumber: {
        width: Dimensions.get("window").width / 3.6,
        height: Dimensions.get("window").height / 18.5,
        backgroundColor: '#ffffff',
        textAlign: 'center'
    }

})