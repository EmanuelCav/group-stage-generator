import { memo } from 'react';
import { ScrollView } from 'react-native';

import ColumnElimination from './components/ColumnElimination';

import { EliminationStagePropsType } from '@/types/elimination.types';

import { eliminationStyles } from '@/styles/elimination.styles';

import { columnTitle } from '@/utils/elimination';

const EliminationStage = memo(({ group, colors, handleGetMatch, spacing, isFullName }: EliminationStagePropsType) => {

  return (
    <ScrollView horizontal>
      <ScrollView contentContainerStyle={eliminationStyles.scrollContainer}>

        {
          group.eliminationMatches?.map((matches, index) => {
            return <ColumnElimination matches={matches} colors={colors}
              indexElimination={index} spacing={spacing} isFullName={isFullName}
              text={columnTitle(index, group.eliminationMatches?.length!)}
              handleGetMatch={handleGetMatch} group={group} key={index} />
          })
        }

      </ScrollView>
    </ScrollView>
  )
})

export default EliminationStage;
