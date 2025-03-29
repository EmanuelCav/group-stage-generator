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
    },

    summaryDesign: {
        width: '100%',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingHorizontal: Dimensions.get("window").height / 120,
        paddingVertical: Dimensions.get("window").height / 106
    },

    containerSummary: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    containerPlayersLineup: {
        width: '100%',
        paddingHorizontal: Dimensions.get("window").height / 120,
        paddingVertical: Dimensions.get("window").height / 320,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    lineupContainLocal: {
        width: '50%',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },

    lineupContainVisitant: {
        width: '50%',
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },

    containerStatisticMatch: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get("window").height / 120,
        paddingVertical: Dimensions.get("window").height / 320,
        width: "100%",
        flexDirection: "column",
    },

    containerBarStatisticMatch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        flexDirection: "row",
    },

    containStatistic: {
        flex: 1,
        height: Dimensions.get("window").height / 185,
        flexDirection: "row",
        backgroundColor: "#dddddd",
        marginHorizontal: Dimensions.get("window").width / 36,
        borderRadius: 2,
    }

})