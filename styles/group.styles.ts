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
        fontWeight: '600',
        width: Dimensions.get("window").width / 9,
        height: Dimensions.get("window").height / 21,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cell: {
        width: Dimensions.get("window").width / 9,
        height: Dimensions.get("window").height / 21,
        justifyContent: 'center',
        alignItems: 'center'
    },

    teamCell: {
        width: Dimensions.get("window").width / 6,
        fontWeight: '600',
        height: Dimensions.get("window").height / 21,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainCell: {
        width: Dimensions.get("window").width / 9,
        height: Dimensions.get("window").height / 21,
        justifyContent: 'center',
        alignItems: 'center',
    },

    groupList: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Dimensions.get("window").height / 74,
        width: '100%',
        flex: 1,
        backgroundColor: "#F5F5F9"
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
    },

    statisticsCell: {
        width: Dimensions.get("window").width / 6,
        textAlign: "center",
        fontWeight: "bold",
        color: "#ffffff"
    },

    statisticsCellMain: {
        width: Dimensions.get("window").width / 4,
        textAlign: "center",
        fontWeight: "bold",
        color: "#ffffff"
    },

    cellStatistic: {
        width: Dimensions.get("window").width / 6,
        height: Dimensions.get("window").height / 21,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cellStatisticMain: {
        width: Dimensions.get("window").width / 4,
        height: Dimensions.get("window").height / 21,
        justifyContent: 'center',
        alignItems: 'center'
    }

})