import { groupStore } from '@/store/group.store';
import { getElimationTeams } from '@/utils/elimination';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

const bracketData = {
  roundOf16: [
    { id: 1, team1: 'Team A', team2: 'Team B' },
    { id: 2, team1: 'Team C', team2: 'Team D' },
    { id: 3, team1: 'Team E', team2: 'Team F' },
    { id: 4, team1: 'Team G', team2: 'Team H' },
    { id: 5, team1: 'Team I', team2: 'Team J' },
    { id: 6, team1: 'Team K', team2: 'Team L' },
    { id: 7, team1: 'Team M', team2: 'Team N' },
    { id: 8, team1: 'Team O', team2: 'Team P' },
  ],
  quarterfinals: [
    { id: 9, team1: 'Winner 1', team2: 'Winner 2' },
    { id: 10, team1: 'Winner 3', team2: 'Winner 4' },
    { id: 11, team1: 'Winner 5', team2: 'Winner 6' },
    { id: 12, team1: 'Winner 7', team2: 'Winner 8' },
  ],
  semifinals: [
    { id: 13, team1: 'Winner 9', team2: 'Winner 10' },
    { id: 14, team1: 'Winner 11', team2: 'Winner 12' },
  ],
  final: [
    { id: 15, team1: 'Winner 13', team2: 'Winner 14' },
  ],
};

const Match = ({ team1, team2 }: { team1: string; team2: string }) => {
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


const Bracket = () => {

  const { group } = groupStore()

  useEffect(() => {
    getElimationTeams(group)
  }, [])

  return (
    <ScrollView horizontal>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.column}>
          <Text style={styles.roundTitle}>Octavos</Text>
          {bracketData.roundOf16.map((match) => (
            <Match key={match.id} team1={match.team1} team2={match.team2} />
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.roundTitle}>Cuartos</Text>
          <View style={{ marginTop: 40 }} />
          {bracketData.quarterfinals.map((match) => (
            <Match key={match.id} team1={match.team1} team2={match.team2} />
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.roundTitle}>Semifinal</Text>
          <View style={{ marginTop: 80 }} />
          {bracketData.semifinals.map((match) => (
            <Match key={match.id} team1={match.team1} team2={match.team2} />
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.roundTitle}>Final</Text>
          <View style={{ marginTop: 160 }} />
          {bracketData.final.map((match) => (
            <Match key={match.id} team1={match.team1} team2={match.team2} />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
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

export default Bracket;
