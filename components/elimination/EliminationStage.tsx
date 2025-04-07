import { ScrollView } from 'react-native';

import ColumnElimination from './components/ColumnElimination';

import { EliminationStagePropsType } from '@/types/elimination.types';

import { eliminationStyles } from '@/styles/elimination.styles';

import { columnTitle } from '@/utils/elimination';

const EliminationStage = ({ group, colors, handleGetMatch }: EliminationStagePropsType) => {

  return (
    <ScrollView horizontal>
      <ScrollView contentContainerStyle={eliminationStyles.scrollContainer}>

        {
          group.eliminationMatches?.map((matches, index) => {
            return <ColumnElimination matches={matches} colors={colors} indexElimination={index}
              text={columnTitle(index, group.eliminationMatches?.length!)}
              handleGetMatch={handleGetMatch} group={group} key={index} />
          })
        }

      </ScrollView>
    </ScrollView>
  )
}

export default EliminationStage;
