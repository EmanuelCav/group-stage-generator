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
    },

    scoreTeamForm: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Dimensions.get("window").height / 148
    },

    teamForm: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    containAdd: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },

    containerLineUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    dateInput: {
        width: '60%',
        backgroundColor: "#ffffff",
        textAlign: 'center'
    }

})