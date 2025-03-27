import { Dimensions, StyleSheet } from 'react-native'

export const matchStyles = StyleSheet.create({

    containerMatch: {
        flex: 1,
        padding: Dimensions.get("window").height / 106
    },

    titleMatch: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    scoreTeams: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: Dimensions.get("window").height / 47
    },

    teamView: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    scoreView: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },

    informationContain: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: Dimensions.get("window").height / 47
    },

    tagInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: Dimensions.get("window").height / 106,
        borderBottomWidth: 1
    }

})