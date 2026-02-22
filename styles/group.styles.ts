import { Dimensions, StyleSheet } from "react-native";

export const groupStyles = StyleSheet.create({

    headerRow: {
        flexDirection: "row",
        backgroundColor: "#ddd",
        paddingVertical: Dimensions.get("window").height / 123,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    },

    headerCellPosition: {
        width: Dimensions.get("window").width / 11.25,
        textAlign: "center",
        fontFamily: 'Raleway_Bold',
        color: "#ffffff"
    },

    headerCell: {
        width: Dimensions.get("window").width / 9,
        textAlign: "center",
        fontFamily: 'Raleway_Bold',
        color: "#ffffff"
    },

    row: {
        flexDirection: "row",
        paddingVertical: Dimensions.get("window").height / 185,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    },

    cellPosition: {
        fontFamily: 'Raleway_SemiBold',
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
        fontFamily: 'Raleway_SemiBold',
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
        flex: 1
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

    textDateGroup: {
        marginRight: Dimensions.get("window").width / 28,
        marginVertical: Dimensions.get("window").height / 106
    },

    statisticsCell: {
        width: Dimensions.get("window").width / 3,
        textAlign: "center"
    },

    statisticsCellMain: {
        width: Dimensions.get("window").width / 3,
        textAlign: "center",
        fontFamily: "Raleway_Bold",
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
    },

    smallScoreCell: {
        maxWidth: 40,
        minWidth: 40,
        flexGrow: 0,
        flexShrink: 0,
        justifyContent: 'center'
    }

})