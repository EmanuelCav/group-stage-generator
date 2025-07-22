import { Dimensions, StyleSheet } from 'react-native';

export const statisticsStyles = StyleSheet.create({

    titleStatistics: {
        marginVertical: Dimensions.get("window").height / 74,
        textAlign: 'center'
    },

    noPlayerStatistics: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})