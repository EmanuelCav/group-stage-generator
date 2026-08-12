import { Dimensions, StyleSheet } from 'react-native'

export const teamsStyles = StyleSheet.create({

    containMatchesTeam: {
        borderWidth: 2,
        marginTop: 12
    },

    matchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 4
    },

    containMatchRow: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    dateMatchRow: {
        minWidth: 44,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
    },

    monthMatch: {
        letterSpacing: 0.5,
        fontSize: 10,
        lineHeight: 12,
    },

    dayMatch: {
        fontSize: 16,
        lineHeight: 18,
        marginTop: 2,
    },

    scoreMatchRow: {
        paddingLeft: 12,
        alignItems: "flex-end"
    },

    statisticPlayer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: Dimensions.get("window").height / 74
    },

    noMatches: {
        textAlign: "center",
        marginVertical: 12,
        opacity: 0.6
    },

    itemPlayer: {
        paddingHorizontal: 16,
        width: "100%",
    },

    avatarPlayer: {
        alignSelf: "center",
        marginRight: 8,
    },

    sectionHeader: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    sectionHeaderText: {
        letterSpacing: 0.8,
    },
})