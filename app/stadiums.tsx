import { useEffect } from "react";
import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

import { View } from "@/components/Themed";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import AddAction from "@/components/general/AddAction";
import FormCreateStadium from "@/components/stadiums/FormCreateStadium";
import Stadium from "@/components/stadiums/Stadium";
import AddButton from "@/components/general/AddButton";
import Sure from "@/components/general/Sure";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IStadium } from "@/interface/Stadium";

import { groupStore } from "@/store/group.store";

import { stadiumStore } from "@/store/stadium.store";

const Stadiums = () => {

  const { showForm, hideAndShowAddStadium, getStadium, stadium, isSure, sureRemoveStadium } = stadiumStore()
  const { group, createStadium, updateStadium, removeStadium } = groupStore()

  const { colors } = useTheme()

  const router = useRouter()

  const handleUpdate = (data: IStadium) => {
    updateStadium(data)
    getStadium({})
  }

  const handleUpdateStadium = (data: IStadium) => {
    getStadium(data)
    hideAndShowAddStadium(true)
  }

  const openSure = (data: IStadium) => {
    getStadium(data)
    sureRemoveStadium(true)
  }

  const handleRemoveReferee = () => {
    sureRemoveStadium(false)
    hideAndShowAddStadium(false)
    removeStadium(stadium)
    getStadium({})
  }

  const close = () => {
    sureRemoveStadium(false)
  }

  const openCreateStadium = () => {
    getStadium({})
    hideAndShowAddStadium(true)
  }

  const goBack = () => {
    router.replace("/(tabs)/groups")
  }

  useEffect(() => {
    hideAndShowAddStadium(false)
    sureRemoveStadium(false)
    getStadium({})
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {
        isSure && <Sure func={handleRemoveReferee} text="Are you sure you want to delete?" close={close} />
      }
      {
        showForm && <FormCreateStadium group={group} colors={colors} stadium={stadium} openSure={openSure}
          hideAndShowAddStadium={hideAndShowAddStadium} createStadium={createStadium} updateStadium={handleUpdate} />
      }
      <HeaderGeneral colors={colors} router={router} title="Stadiums" goBack={goBack} />
      <View style={generalStyles.containerGeneral}>
        {
          group.stadiums!.length > 0 ? <AddButton colors={colors} handleAdd={openCreateStadium} /> :
            <AddAction openForm={hideAndShowAddStadium} colors={colors} text="ADD STADIUM" />
        }
        {
          group.stadiums!.length > 0 ?
            <FlatList
              style={{ width: '100%' }}
              data={group.stadiums!}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <Stadium stadium={item} handleUpdateStadium={handleUpdateStadium} />}
            /> : <Text variant="bodyMedium" style={createStyles.advideText}>
              Add stadiums to add to matches
            </Text>
        }
      </View>
    </View>
  );
};

export default Stadiums;