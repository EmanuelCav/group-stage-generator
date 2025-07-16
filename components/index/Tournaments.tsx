import { FlatList } from 'react-native';

import Tournament from './components/Tournament';

import { TournamentsPropsType } from '@/types/index.types';

const Tournaments = ({ groups, colors, handleGroup }: TournamentsPropsType) => {
  return (
    <FlatList
      style={{ width: '100%' }}
      data={groups}
      keyExtractor={(group) => group.id!.toString()}
      renderItem={({ item }) =>
        <Tournament group={item} colors={colors} handleGroup={handleGroup} />
      }
    />
  )
}

export default Tournaments