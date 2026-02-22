import { memo, useCallback } from 'react';
import { FlatList } from 'react-native';

import Tournament from './components/Tournament';

import { IGroup } from '@/interface/Group';
import { TournamentsPropsType } from '@/types/index.types';

const Tournaments = memo(({ groups, colors, handleGroup }: TournamentsPropsType) => {

  const renderTournaments = useCallback(({ item }: { item: IGroup }) => (
    <Tournament group={item} colors={colors} handleGroup={handleGroup} />),
    [colors, handleGroup]
  )

  return (
    <FlatList
      style={{ width: '100%' }}
      data={groups}
      keyExtractor={(group) => group.id!.toString()}
      renderItem={renderTournaments}
    />
  )
})

export default Tournaments