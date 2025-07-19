import { Dimensions, StyleSheet } from 'react-native'

export const createStyles = StyleSheet.create({

    buttonAdd: {
        width: '100%',
        borderRadius: 7,
    },

    advideText: {
        marginBottom: Dimensions.get("window").height / 74
    },

    containerAddTeam: {
        marginVertical: Dimensions.get("window").height / 91,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerGenerateButton: {
        paddingHorizontal: Dimensions.get("window").height / 91,
        paddingVertical: Dimensions.get("window").height / 47,
        backgroundColor: '#F5F5F9'
    },

    cardAddTeam: {
        alignItems: "center",
        padding: Dimensions.get("window").height / 72,
        marginTop: Dimensions.get("window").height / 28,
        backgroundColor: '#ffffff'
    },

    cardShieldTeam: {
        alignItems: 'center',
        marginTop: Dimensions.get("window").height / 28
    },

    imageCard: {
        width: 90,
        height: 90,
        borderRadius: 8
    },

    inputAdd: {
        marginVertical: Dimensions.get("window").height / 74,
    },

    inputGeneralCreate: {
        marginTop: Dimensions.get("window").height / 28,
    },

    inputNumberCreate: {
        width: Dimensions.get("window").width / 4,
        textAlign: 'center'
    },

    containTeamAdded: {
        width: '100%',
        marginVertical: Dimensions.get("window").height / 106,
        padding: Dimensions.get("window").height / 106,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 2
    },

    textHeader: {
        marginBottom: Dimensions.get("window").height / 74,
        textAlign: 'center'
    },

    selectInputContain: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: Dimensions.get("window").height / 106
    },

    selectInputDropdownContain: {
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: Dimensions.get("window").height / 74,
    },

    dropdown: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: Dimensions.get("window").width / 45,
    },

    dropdownComplete: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: Dimensions.get("window").width / 45,
        width: '100%',
        marginTop: Dimensions.get("window").height / 106
    },

    dropdownMatchdays: {
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: Dimensions.get("window").height / 74,
        padding: Dimensions.get("window").width / 45,
        width: '100%',
        backgroundColor: "#ffffff"
    },

    containerStatisticsPlayer: {
        borderRadius: 4,
        borderWidth: 0.5,
        marginVertical: Dimensions.get("window").height / 106
    },

    statisticPlayer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: Dimensions.get("window").height / 106,
        paddingHorizontal: Dimensions.get("window").width / 106
    },

    updateValue: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: Dimensions.get("window").height / 106,
    }

})