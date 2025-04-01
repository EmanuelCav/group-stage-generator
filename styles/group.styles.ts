import { Dimensions, StyleSheet } from "react-native";

export const groupStyles = StyleSheet.create({

    headerRow: {
        flexDirection: "row",
        backgroundColor: "#ddd",
        paddingVertical: Dimensions.get("window").height / 123,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },

    headerCellPosition: {
        width: Dimensions.get("window").width / 11.25,
        textAlign: "center",
        fontWeight: "bold",
        color: "#ffffff"
    },

    headerCell: {
        width: Dimensions.get("window").width / 9,
        textAlign: "center",
        fontWeight: "bold",
        color: "#ffffff"
    },

    row: {
        flexDirection: "row",
        paddingVertical: Dimensions.get("window").height / 185,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    },

    cellPosition: {
        width: Dimensions.get("window").width / 11.25,
        textAlign: "center",
        fontWeight: '600',
        height: Dimensions.get("window").height / 21,
        alignContent: 'center'
    },

    cell: {
        width: Dimensions.get("window").width / 9,
        textAlign: "center",
        height: Dimensions.get("window").height / 21,
        alignContent: 'center'
    },

    teamCell: {
        width: Dimensions.get("window").width / 6,
        textAlign: "center",
        fontWeight: '600',
        height: Dimensions.get("window").height / 21,
        alignContent: 'center'
    },

    mainCell: {
        width: Dimensions.get("window").width / 9,
        textAlign: "center",
        fontWeight: '600',
        height: Dimensions.get("window").height / 21,
        alignContent: 'center'
    },

    groupList: {
        flexDirection: 'row',
        marginTop: Dimensions.get("window").height / 148
    },

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