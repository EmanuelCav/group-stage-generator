import { useEffect } from "react";
import { FlatList } from "react-native";
import { MD3Colors, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Toast from 'react-native-toast-message';
import i18n from '@/i18n'

import { View } from "@/components/Themed";
import TeamAdded from "@/components/create/TeamAdded";
import AddTeam from "@/components/create/AddTeam";
import HeaderCreate from "@/components/create/HeaderCreate";
import FormCreateTeam from "@/components/create/FormCreateTeam";
import GenerateButton from "@/components/create/GenerateButton";
import AddButton from "@/components/general/AddButton";
import SettingsFAB from "@/components/general/SettingsFAB";
import Sure from "@/components/general/Sure";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import SureGeneral from "@/components/general/SureGeneral";
import Loading from "@/components/general/Loading";
import MainScreen from "@/components/general/MainScreen";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { ITeam } from "@/interface/Team";

import { teamStore } from "@/store/team.store";
import { groupStore } from "@/store/group.store";
import { responseStore } from "@/store/response.store";

import { groupValue, powerRange } from "@/utils/defaultGroup";
import { groupGenerator } from "@/utils/generator";

const Create = () => {

  const { showForm, hideAndShowAddTeam, getTeam, team, isSure, sureRemoveTeam } = teamStore()
  const { createGroup, group, groups, createTeam, generateMatches, updateGenerateAgain,
    updateTeam, removeTeam, sureRemoveGroup, sureRestartGroup } = groupStore()
  const { isLoading, handleLoading } = responseStore()

  const { colors } = useTheme()

  const router = useRouter()

  const generateGroups = () => {

    handleLoading(true)

    try {

      if (group.isManualConfiguration) {

        if (group.teamsPerGroup === 1) {
          Toast.show({
            type: 'error',
            text1: i18n.t("validation.teamsPerGroup.title"),
            text2: i18n.t("validation.teamsPerGroup.message")
          });
          return;
        }

        if (Math.ceil(group.amountGroups! / 2) > group.teams.length) {
          Toast.show({
            type: 'error',
            text1: i18n.t("validation.numberOfGroups.title"),
            text2: i18n.t("validation.numberOfGroups.message")
          });
          return;
        }

        if ((group.amountGroups! * group.teamsPerGroup!) > group.teams.length) {
          Toast.show({
            type: 'error',
            text1: i18n.t("validation.numberOfTeams.title"),
            text2: i18n.t("validation.numberOfTeams.message")
          });
          return;
        }
      }

      const groupsMatches = groupGenerator(group)

      if (group.isManualConfiguration) {
        generateMatches(groupsMatches.groupsMatches, group.teamsPerGroup!, group.amountGroups!, group.amountClassified!)
      } else {
        generateMatches(groupsMatches.groupsMatches, groupsMatches.groupsSorted[groupsMatches.groupsSorted.length - 1].length, group.matches?.length!,
          Math.pow(2, powerRange(group.teams.length)))
      }

      for (let i = 0; i < groupsMatches.groupsSorted.length; i++) {
        for (let j = 0; j < groupsMatches.groupsSorted[i].length; j++) {
          updateTeam({
            id: groupsMatches.groupsSorted[i][j].id,
            group: groupsMatches.groupsSorted[i][j].group,
            logo: groupsMatches.groupsSorted[i][j].logo,
            plot: group.teams.find(t => t.id === groupsMatches.groupsSorted[i][j].id)?.plot,
            name: groupsMatches.groupsSorted[i][j].name
          })
        }
      }

      router.push("/(tabs)/groups")

    } catch (error) {
      console.log(error);
    } finally {
      handleLoading(false)
    }

  }

  const handleUpdate = (data: ITeam) => {
    updateTeam(data)
    getTeam({})
  }

  const handleUpdateTeam = (data: ITeam) => {
    getTeam(data)
    hideAndShowAddTeam(true)
  }

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

  const goBack = () => {
    router.replace("/(tabs)/groups")
  }

  useEffect(() => {
    hideAndShowAddTeam(false)
    sureRemoveTeam(false)
    getTeam({})
  }, [])

  useEffect(() => {
    if (groups.length === 0) {
      createGroup(groupValue(groups.length + 1))
    }
  }, [])

  return (
    <MainScreen>


      <Toast />

      {isLoading && <Loading text={i18n.t('generating')} />}

      {isSure && (
        <Sure
          func={handleRemoveTeam}
          text={i18n.t('areYouSureDelete')}
          close={close}
          labelButton={i18n.t('remove')}
        />
      )}

      {showForm && (
        <FormCreateTeam
          colors={colors}
          group={group}
          team={team}
          openSure={openSure}
          hideAndShowAddTeam={hideAndShowAddTeam}
          createTeam={createTeam}
          updateTeam={handleUpdate}
        />
      )}

      {group.isGenerated ? (
        <HeaderGeneral
          colors={colors}
          router={router}
          title={i18n.t('teams')}
          goBack={goBack}
          sureRemoveGroup={sureRemoveGroup}
          sureRestartGroup={sureRestartGroup}
        />
      ) : (
        <HeaderCreate
          colors={colors}
          groups={groups}
          router={router}
          group={group}
        />
      )}

      <SureGeneral />

      <View style={generalStyles.containerGeneral}>
        {group.teams.length > 0 ? (
          <AddButton colors={colors} handleAdd={openCreateTeam} />
        ) : (
          <AddTeam
            openForm={hideAndShowAddTeam}
            colors={colors}
            length={groups.length}
          />
        )}

        {group.teams.length > 0 && !group.isGenerated && (
          <SettingsFAB colors={colors} router={router} />
        )}

        {group.teams.length > 0 ? (
          <FlatList
            style={{ width: '100%' }}
            data={group.teams}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TeamAdded
                team={item}
                handleUpdateTeam={handleUpdateTeam}
                colors={colors}
              />
            )}
          />
        ) : (
          <Text variant="bodyMedium" style={createStyles.advideText}>
            {i18n.t('addTeamsToGenerate')}
          </Text>
        )}
      </View>

      {group.teams.length < 2 && (
        <Text
          variant="bodySmall"
          style={{ color: MD3Colors.error50, textAlign: 'center' }}
        >
          {i18n.t('addAtLeastTwo')}
        </Text>
      )}

      {!group.isGenerated && (
        <GenerateButton
          teams={group.teams}
          colors={colors}
          generateGroups={generateGroups}
        />
      )}
    </MainScreen>
  );
};

export default Create;