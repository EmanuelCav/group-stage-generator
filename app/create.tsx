import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { MD3Colors, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Toast, { ErrorToast } from 'react-native-toast-message';
import i18n from '@/i18n'
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

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
import MainScreen from "@/components/general/MainScreen";
import Banner from "@/components/general/Banner";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { ITeam } from "@/interface/Team";

import { teamStore } from "@/store/team.store";
import { groupStore } from "@/store/group.store";

import { groupValue, powerRange } from "@/utils/defaultGroup";
import { groupGenerator } from "@/utils/generator";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : `${process.env.EXPO_PUBLIC_INTERSTITIAL}`;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
};

const Create = () => {

  const { showForm, hideAndShowAddTeam, getTeam, team, isSure, sureRemoveTeam } = teamStore()
  const { createGroup, group, idGroup, groups, createTeam, generateMatches, updateGenerateAgain,
    updateTeam, removeTeam, sureRemoveGroup, sureRestartGroup } = groupStore()

  const { colors } = useTheme()

  const router = useRouter()

  const [isIntersitialLoaded, setIsInterstitialLoaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const generateGroups = () => {

    try {

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
      })

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

      router.push("/(tabs)/groups")

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
      createGroup(groupValue(idGroup))
    }
  }, [])

  useEffect(() => {
    const loadInterstitialAd = () => {
      try {
        interstitial.load();
      } catch (error) {
        console.error("Error loading interstitial ad:", error);
      }
    };

    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      async () => {
        setIsInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      async () => {
        setIsInterstitialLoaded(false);
        loadInterstitialAd();
      }
    );

    loadInterstitialAd();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  return (
    <MainScreen colors={colors}>

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
          interstitial={interstitial}
          isIntersitialLoaded={isIntersitialLoaded}
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

      <Banner />

      <Toast config={toastConfig} />

      <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
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

      {group.teams.length < 2 && !group.isManualConfiguration && (
        <Text
          variant="bodySmall"
          style={{ textAlign: 'center' }}
        >
          {i18n.t('noteCreate')}
        </Text>
      )}

      {group.teams.length < 2 && (
        <Text
          variant="bodySmall"
          style={{ color: MD3Colors.error50, textAlign: 'center', marginTop: Dimensions.get("window").height / 106 }}
        >
          {i18n.t('addAtLeastTwo')}
        </Text>
      )}

      {!group.isGenerated && (
        <GenerateButton
          teams={group.teams}
          colors={colors}
          loading={loading}
          generateGroups={generateGroups}
        />
      )}
    </MainScreen>
  );
};

export default Create;