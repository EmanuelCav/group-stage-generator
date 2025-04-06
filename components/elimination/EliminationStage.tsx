import { ScrollView, StyleSheet } from 'react-native';

import ColumnElimination from './components/ColumnElimination';

import { IGroup } from '@/interface/Group';

import { columnTitle } from '@/utils/elimination';

const EliminationStage = ({ group }: { group: IGroup }) => {

  return (
    <ScrollView horizontal>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {
          group.eliminationMatches?.map((matches, index) => {
            return <ColumnElimination matches={matches}
              text={columnTitle(index, group.eliminationMatches?.length!)}
              key={index} />
          })
        }

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

export default EliminationStage;
