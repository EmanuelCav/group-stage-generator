import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { MD3Colors, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Toast, { ErrorToast } from 'react-native-toast-message';

import TeamAdded from "@/components/create/TeamAdded";
import AddTeam from "@/components/create/AddTeam";
import HeaderCreate from "@/components/create/HeaderCreate";
import FormCreateTeam from "@/components/create/FormCreateTeam";
import GenerateButton from "@/components/create/GenerateButton";
import AddButton from "@/components/general/AddButton";
import SettingsFAB from "@/components/general/SettingsFAB";
import Sure from "@/components/general/Sure";
import MainScreen from "@/components/general/MainScreen";
import Banner from "@/components/general/Banner";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { ITeam } from "@/interface/Team";

import { useTeamStore } from "@/store/team.store";
import { useGroupStore } from "@/store/group.store";
import { useUserStore } from "@/store/user.store";

import { powerRange } from "@/utils/defaultGroup";
import { groupGenerator } from "@/utils/generator";

import { useSpacing } from "@/hooks/useSpacing";
import { useLanguage } from "@/hooks/useLanguageContext";

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
};

const TeamsScreen = () => {

  const { showForm, hideAndShowAddTeam, getTeam, team, isSure, sureRemoveTeam } = useTeamStore()
  const { group, createTeam, generateMatches, updateGenerateAgain, updateTeam, removeTeam } = useGroupStore()
  const { premium } = useUserStore()

  const { colors } = useTheme()
  const { t } = useLanguage()

  const router = useRouter()

  const spacing = useSpacing()

  const [loading, setLoading] = useState<boolean>(false)

  const generateGroups = () => {

    try {

      setLoading(true)

      let teamsPerGroupUpdate = Number(group.teamsPerGroup)
      let amountGroupsUpdate = Number(group.amountGroups)

      if (group.isManualConfiguration) {

        if (teamsPerGroupUpdate < 2) {
          teamsPerGroupUpdate = 2
        }

        if ((amountGroupsUpdate * teamsPerGroupUpdate) > group.teams.length) {
          while ((amountGroupsUpdate * teamsPerGroupUpdate) > group.teams.length) {
            if (teamsPerGroupUpdate > 2) {
              teamsPerGroupUpdate -= 1
            }

            if (amountGroupsUpdate > 1) {
              amountGroupsUpdate -= 1
            }
          }
        }
      }

      const groupsMatches = groupGenerator({
        ...group,
        teamsPerGroup: teamsPerGroupUpdate,
        amountGroups: amountGroupsUpdate,
      }, "NORMAL")

      groupsMatches.groupsSorted = groupsMatches.groupsSorted.map(subGroup =>
        subGroup.filter(team => Object.keys(team).length > 0)
      );

      if (group.isManualConfiguration) {
        generateMatches(groupsMatches.groupsMatches, groupsMatches.groupsSorted[groupsMatches.groupsSorted.length - 1].length,
          groupsMatches.groupsSorted.length, group.amountClassified!)
      } else {
        generateMatches(groupsMatches.groupsMatches, groupsMatches.groupsSorted[groupsMatches.groupsSorted.length - 1].length, groupsMatches.groupsSorted.length,
          Math.pow(2, powerRange(group.teams.length)))
      }

      for (let i = 0; i < groupsMatches.groupsSorted.length; i++) {
        for (let j = 0; j < groupsMatches.groupsSorted[i].length; j++) {
          updateTeam({
            id: groupsMatches.groupsSorted[i][j].id,
            group: groupsMatches.groupsSorted[i][j].group,
            logo: groupsMatches.groupsSorted[i][j].logo,
            groupAssigned: groupsMatches.groupsSorted[i][j].groupAssigned,
            plot: group.teams.find(t => t.id === groupsMatches.groupsSorted[i][j].id)?.plot,
            name: groupsMatches.groupsSorted[i][j].name,
            color: groupsMatches.groupsSorted[i][j].color
          })
        }
      }

      router.replace("/(drawer)/(tabs)/groups")

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }

  }

  const handleUpdate = (data: ITeam) => {
    updateTeam(data)
    getTeam({})
  }

  const handleUpdateTeam = useCallback((data: ITeam) => {
    getTeam(data)
    hideAndShowAddTeam(true)
  }, [])

  const openSure = (data: ITeam) => {
    getTeam(data)
    sureRemoveTeam(true)
  }

  const handleRemoveTeam = () => {
    sureRemoveTeam(false)
    hideAndShowAddTeam(false)
    removeTeam(team)

    if (group.isGenerated) {
      updateGenerateAgain(true)
    }

    getTeam({})
  }

  const close = () => {
    sureRemoveTeam(false)
  }

  const openCreateTeam = () => {
    getTeam({})
    hideAndShowAddTeam(true)
  }

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
        t={t}
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

      {isSure && (
        <Sure
          func={handleRemoveTeam}
          text={t('areYouSureDelete')}
          close={close}
          labelButton={t('remove')}
        />
      )}

      {showForm && (
        <FormCreateTeam
          colors={colors}
          premium={premium}
          group={group}
          team={team}
          openSure={openSure}
          hideAndShowAddTeam={hideAndShowAddTeam}
          createTeam={createTeam}
          updateTeam={handleUpdate}
          t={t}
        />
      )}

      <HeaderCreate
        colors={colors}
        router={router}
        t={t}
      />

      {
        !premium && <Banner />
      }

      <Toast config={toastConfig} />

      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>

        {
          group.teams.length > 0 && <Text variant="bodyMedium" style={{ alignSelf: 'flex-start' }}>
            {t("teamsAddedCount")}: {group.teams.length}
          </Text>
        }

        {group.teams.length > 0 ? (
          <AddButton colors={colors} handleAdd={openCreateTeam} />
        ) : (
          <AddTeam
            openForm={hideAndShowAddTeam}
            colors={colors}
            t={t}
          />
        )}

        {group.teams.length > 0 && (
          <SettingsFAB colors={colors} router={router} />
        )}

        {group.teams.length > 0 ? (
          <FlatList
            style={{ width: '100%' }}
            data={sortedTeams}
            keyExtractor={(item) => item.id!}
            renderItem={renderTeam}
            initialNumToRender={10}
            removeClippedSubviews
          />
        ) : (
          <Text variant="bodyMedium" style={createStyles.advideText}>
            {t('addTeamsToGenerate')}
          </Text>
        )}
      </View>

      {group.teams.length < 2 && !group.isManualConfiguration && (
        <Text
          variant="bodySmall"
          style={{ textAlign: 'center' }}
        >
          {t('noteCreate')}
        </Text>
      )}

      {group.teams.length < 2 && (
        <Text
          variant="bodySmall"
          style={{ color: MD3Colors.error50, textAlign: 'center', marginTop: spacing.h106 }}
        >
          {t('addAtLeastTwo')}
        </Text>
      )}

      <GenerateButton
        teams={group.teams}
        colors={colors}
        loading={loading}
        generateGroups={generateGroups}
        t={t}
      />

    </MainScreen>
  );
}

export default TeamsScreen