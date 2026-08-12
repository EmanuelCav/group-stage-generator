import { useCallback, useEffect, useMemo } from "react";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Toast, { ErrorToast } from 'react-native-toast-message';
import i18n from '@/i18n'

import TeamAdded from "@/components/create/TeamAdded";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import SureGeneral from "@/components/general/SureGeneral";
import MainScreen from "@/components/general/MainScreen";
import Banner from "@/components/general/Banner";

import { generalStyles } from "@/styles/general.styles";

import { ITeam } from "@/interface/Team";

import { useTeamStore } from "@/store/team.store";
import { useGroupStore } from "@/store/group.store";
import { useUserStore } from "@/store/user.store";

import { useSpacing } from "@/hooks/useSpacing";

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
};

const TeamsDrawerScreen = () => {

  const { hideAndShowAddTeam, getTeam, sureRemoveTeam } = useTeamStore()
  const { group } = useGroupStore()
  const { premium } = useUserStore()

  const { colors } = useTheme()
  const router = useRouter()

  const spacing = useSpacing()

  const handleUpdateTeam = useCallback((data: ITeam) => {
    getTeam(data)
    hideAndShowAddTeam(true)
  }, [])

  const goBack = useCallback(() => {
    router.replace("/(tabs)/groups")
  }, [router])

  useEffect(() => {
    hideAndShowAddTeam(false)
    sureRemoveTeam(false)
    getTeam({})
  }, [])

  const renderTeam = useCallback(
    ({ item }: { item: ITeam }) => (
      <TeamAdded
        isManualConfiguration={group.isManualConfiguration!}
        team={item}
        handleUpdateTeam={handleUpdateTeam}
        colors={colors}
        spacing={spacing}
      />
    ),
    [group.isManualConfiguration, group.teams, handleUpdateTeam, colors]
  )

  const sortedTeams = useMemo(() => {
    if (group.isGenerated) {
      return [...group.teams].sort((a, b) => {
        return (a.group! - b.group! || a.plot! - b.plot!)
      })
    } else {
      return [...group.teams].sort((a, b) => {
        return (a.groupAssigned! - b.groupAssigned! || a.plot! - b.plot!)
      })
    }
  }, [group.teams, group.isGenerated])

  return (
    <MainScreen colors={colors}>

      <HeaderGeneral
        colors={colors}
        title={i18n.t('teams')}
        goBack={goBack}
        isMatchdaysScreen={false}
      />

      <SureGeneral />

      {
        !premium && <Banner />
      }

      <Toast config={toastConfig} />

      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>

        <Text variant="bodyMedium" style={{ alignSelf: 'flex-start' }}>
          {i18n.t("teamsAddedCount")}: {group.teams.length}
        </Text>

        <FlatList
          style={{ width: '100%' }}
          data={sortedTeams}
          keyExtractor={(item) => item.id!}
          renderItem={renderTeam}
          initialNumToRender={10}
          removeClippedSubviews
        />

      </View>

    </MainScreen>
  );
};

export default TeamsDrawerScreen;