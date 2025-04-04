import { StyleSheet } from "react-native";
import { Text } from "react-native-paper"

import { View } from "@/components/Themed"
import MatchElimination from "./components/MatchElimination";

const ColumnElimination = ({ bracketData }: { bracketData: any[] }) => {
    return (
        <View style={styles.column}>
            <Text style={styles.roundTitle}>Octavos</Text>
            {bracketData.map((match) => (
                <MatchElimination key={match.id} team1={match.team1} team2={match.team2} />
            ))}
        </View>
    )
}

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

export default ColumnElimination