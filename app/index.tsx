import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import i18n from '@/i18n'

import { View } from '@/components/Themed';
import Tournaments from '@/components/index/Tournaments';
import AddGroupStage from '@/components/index/AddGroupStage';
import Banner from '@/components/general/Banner';
import MainScreen from '@/components/general/MainScreen';
import HeaderTournaments from '@/components/index/HeaderTournaments';

import { IGroup } from '@/interface/Group';

import { generalStyles } from '@/styles/general.styles';

import { groupStore } from '@/store/group.store';

import { groupValue } from '@/utils/defaultGroup';

export default function TabOneScreen() {

  const { colors } = useTheme()

  const { groups, idGroup, createGroup, getGroup } = groupStore()

  const router = useRouter()

  const [isMounted, setIsMounted] = useState<boolean>(false)

  const handleCreateTournament = () => {
    createGroup(groupValue(idGroup))
    router.replace("/create")
  }

  const handleGroup = (group: IGroup) => {

    getGroup(group)

    if (group.isGenerated) {
      router.replace("/(tabs)/groups")
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

  if (groups.length === 0) return <ActivityIndicator style={{ flex: 1, backgroundColor: colors.background }} size="large" />

  return (
    <MainScreen colors={colors}>
      <HeaderTournaments />
      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
        <Banner />
        <Text variant='titleLarge' style={{ color: colors.primary }}>{i18n.t("titleIndex")}</Text>
        <Text variant='titleMedium'>{i18n.t("selectGroupStage")}</Text>
        <Tournaments groups={groups} colors={colors} handleGroup={handleGroup} />
        <AddGroupStage colors={colors} handleCreateTournament={handleCreateTournament} />
      </View>
    </MainScreen>
  );
}
