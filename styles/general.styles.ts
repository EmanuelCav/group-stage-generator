import { Dimensions, StyleSheet } from 'react-native'

export const generalStyles = StyleSheet.create({

    containerGeneral: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: Dimensions.get("window").height / 106
    },

    containerBanner: {
        height: '10%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    containerBackground: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Dimensions.get("window").width / 36
    },

    cardBackground: {
        borderRadius: 8,
        width: '100%',
        flexGrow: 0,
        padding: Dimensions.get("window").width / 36,
        position: 'relative',
        maxHeight: Dimensions.get("window").height / 1.05,
        marginVertical: Dimensions.get("window").height / 74
    },

    addButtonContain: {
        position: "absolute",
        bottom: Dimensions.get("window").height / 24,
        right: Dimensions.get("window").width / 12,
        zIndex: 12
    },

    settingsFABContain: {
        position: "absolute",
        bottom: Dimensions.get("window").height / 7,
        right: Dimensions.get("window").width / 12,
        zIndex: 12,
        backgroundColor: "transparent"
    },

    buttonClose: {
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0,
        top: -Dimensions.get("window").height / 74
    },

    generateButton: {
        borderRadius: 7,
        marginTop: Dimensions.get("window").height / 106
    },

    containerGenerateAgain: {
        padding: Dimensions.get("window").height / 182,
        margin: Dimensions.get("window").height / 74,
    },

    showGenerateAgain: {
        alignItems: 'center',
        marginTop: Dimensions.get("window").height / 24,
    },

    titleDataTable: {
        marginLeft: Dimensions.get("window").width / 30,
        marginVertical: Dimensions.get("window").height / 106
    },

    containerLoading: {
        position: 'absolute',
        opacity: 0.9,
        zIndex: 70,
        top: 0,
        left: 0,
        height: Dimensions.get("window").height,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }

})