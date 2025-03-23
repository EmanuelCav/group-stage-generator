import { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { View } from '@/components/Themed';
import Tournaments from '@/components/index/Tournaments';
import AddGroupStage from '@/components/index/AddGroupStage';

import { IGroup } from '@/interface/Group';

import { generalStyles } from '@/styles/general.styles';

import { groupStore } from '@/store/group.store';

import { groupValue } from '@/utils/defaultGroup';

export default function TabOneScreen() {

  const { colors } = useTheme()

  const { groups, createGroup, getGroup } = groupStore()

  const router = useRouter()
  
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const handleCreateTournament = () => {
    createGroup(groupValue(groups.length + 1))
    router.replace("/create")
  }

  const handleGroup = (group: IGroup) => {

    getGroup(group)

    if(group.isGenerated) {
      router.replace("/(tabs)/matchdays")
    } else {
      router.replace("/create")
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && groups.length === 0) {
      router.replace('/create')
    }
  }, [isMounted, groups, router])

  return (
    <View style={generalStyles.containerGeneral}>
      <Tournaments groups={groups} colors={colors} handleGroup={handleGroup} />
      <AddGroupStage colors={colors} handleCreateTournament={handleCreateTournament}  />
    </View>
  );
}
