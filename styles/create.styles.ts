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
        alignItems: 'center'
    },

    containerGenerateButton: {
        paddingHorizontal: Dimensions.get("window").height / 91,
        paddingVertical: Dimensions.get("window").height / 47
    },

    cardAddTeam: {
        alignItems: "center",
        padding: Dimensions.get("window").height / 72,
        marginTop: Dimensions.get("window").height / 28
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
        backgroundColor: "#ffffff"
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
        borderWidth: 1,
        borderColor: '#eeeeee',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
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

    dropdown: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: Dimensions.get("window").width / 45,
    }

})