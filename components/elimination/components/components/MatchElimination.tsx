import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

import { View } from "@/components/Themed";

const MatchElimination = ({ team1, team2 }: { team1: string; team2: string }) => {

    const [score1, setScore1] = useState('');
    const [score2, setScore2] = useState('');

    return (
        <View style={styles.match}>
            <View style={styles.teamRow}>
                <Text style={styles.team}>{team1}</Text>
                <TextInput
                    style={styles.scoreInput}
                    value={score1}
                    onChangeText={setScore1}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>
            <View style={styles.teamRow}>
                <Text style={styles.team}>{team2}</Text>
                <TextInput
                    style={styles.scoreInput}
                    value={score2}
                    onChangeText={setScore2}
                    keyboardType="numeric"
                    placeholder="0"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    column: {
        marginRight: 40,
        alignItems: 'center',
    },
    roundTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    match: {
        width: 250,
        backgroundColor: '#f0f0f0',
        padding: 12,
        marginVertical: 25,
        borderRadius: 8,
        justifyContent: 'center',
        gap: 10,
    },
    teamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    team: {
        fontSize: 14,
        flex: 1,
        color: '#333',
    },
    scoreInput: {
        width: 45,
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
});

export default MatchElimination