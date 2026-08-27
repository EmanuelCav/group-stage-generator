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
        height: '8%',
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
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10
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
        alignItems: 'center'
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
    },

    containerDropdown: {
        width: "100%",
        position: "relative",
    },

    inputButtonDropdown: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        borderWidth: 1,
    },

    dropdownVisible: {
        width: "100%",
        maxHeight: 200,
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    picker: {
        width: '100%',
        minHeight: 48,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
    },

    selectedTextPick: {
        flex: 1,
        fontSize: 12,
        marginRight: 8,
    },

    modalContainer: {
        flex: 1,
    },

    headerPicker: {
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
    },

    closeButtonPicker: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titlePickElement: {
        marginLeft: 8,
    },

    listElements: {
        paddingBottom: 20,
    },

    optionContainer: {
        width: '100%',
    },

    optionPick: {
        minHeight: 58,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

})