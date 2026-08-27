import { Dimensions, StyleSheet } from 'react-native';

export const statisticsStyles = StyleSheet.create({

    titleStatistics: {
        marginVertical: Dimensions.get("window").height / 74,
        textAlign: 'center'
    },

    noPlayerStatistics: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardContainer: {
        borderRadius: 12,
        marginVertical: 10,
        marginHorizontal: 12,
        overflow: 'hidden',
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        position: 'relative',
        width: '100%',
    },

    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },

    editButton: {
        position: 'absolute',
        right: 4,
        margin: 0,
    },

    listContainer: {
        width: '100%',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
    },

    rankText: {
        width: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
    },

    playerInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },

    shield: {
        width: 28,
        height: 28,
        marginRight: 10,
    },

    shieldPlaceholder: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 10,
    },

    namesContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 7
    },

    playerName: {
        fontWeight: '600',
    },

    valueContainer: {
        paddingLeft: 10,
        alignItems: 'flex-end',
        minWidth: 40,
    },

    valueText: {
        fontWeight: 'bold',
    },

    expandButton: {
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
    },

    noPlayers: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }

})