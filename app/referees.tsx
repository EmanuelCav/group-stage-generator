import { useEffect } from "react";
import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import i18n from '@/i18n'

import { View } from "@/components/Themed";
import MainScreen from "@/components/general/MainScreen";
import HeaderGeneral from "@/components/general/HeaderGeneral";
import AddAction from "@/components/general/AddAction";
import FormCreateReferee from "@/components/referees/FormCreateReferee";
import Referee from "@/components/referees/Referee";
import AddButton from "@/components/general/AddButton";
import Sure from "@/components/general/Sure";
import SureGeneral from "@/components/general/SureGeneral";

import { generalStyles } from "@/styles/general.styles";
import { createStyles } from "@/styles/create.styles";

import { IReferee } from "@/interface/Referee";

import { groupStore } from "@/store/group.store";

import { refereeStore } from "@/store/referee.store";

const Referees = () => {

    const { showForm, hideAndShowAddReferee, getReferee, referee, isSure, sureRemoveReferee } = refereeStore()
    const { group, createReferee, updateReferee, removeReferee, sureRestartGroup, sureRemoveGroup } = groupStore()

    const { colors } = useTheme()

    const router = useRouter()

    const handleUpdate = (data: IReferee) => {
        updateReferee(data)
        getReferee({})
    }

    const handleUpdateReferee = (data: IReferee) => {
        getReferee(data)
        hideAndShowAddReferee(true)
    }

    const openSure = (data: IReferee) => {
        getReferee(data)
        sureRemoveReferee(true)
    }

    const handleRemoveReferee = () => {
        sureRemoveReferee(false)
        hideAndShowAddReferee(false)
        removeReferee(referee)
        getReferee({})
    }

    const close = () => {
        sureRemoveReferee(false)
    }

    const openCreateReferee = () => {
        getReferee({})
        hideAndShowAddReferee(true)
    }

    const goBack = () => {
        router.replace("/(tabs)/groups")
    }

    useEffect(() => {
        hideAndShowAddReferee(false)
        sureRemoveReferee(false)
        getReferee({})
    }, [])

    return (
        <MainScreen colors={colors}>
            {
                isSure && (
                    <Sure
                        func={handleRemoveReferee}
                        text={i18n.t("areYouSureDelete")}
                        close={close}
                        labelButton={i18n.t("remove")}
                    />
                )
            }
            {
                showForm && (
                    <FormCreateReferee
                        group={group}
                        colors={colors}
                        referee={referee}
                        openSure={openSure}
                        hideAndShowAddReferee={hideAndShowAddReferee}
                        createReferee={createReferee}
                        updateReferee={handleUpdate}
                    />
                )
            }
            <HeaderGeneral
                colors={colors}
                router={router}
                title={i18n.t("referees_title")}
                goBack={goBack}
                sureRemoveGroup={sureRemoveGroup}
                sureRestartGroup={sureRestartGroup}
            />
            <SureGeneral />
            <View style={[generalStyles.containerGeneral, { backgroundColor: colors.background }]}>
                {
                    group.referees!.length > 0 ? (
                        <AddButton colors={colors} handleAdd={openCreateReferee} />
                    ) : (
                        <AddAction
                            openForm={hideAndShowAddReferee}
                            colors={colors}
                            text={i18n.t("add_referee")}
                        />
                    )
                }
                {
                    group.referees!.length > 0 ? (
                        <FlatList
                            style={{ width: '100%' }}
                            data={group.referees!}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Referee referee={item} handleUpdateReferee={handleUpdateReferee} colors={colors} />
                            )}
                        />
                    ) : (
                        <Text variant="bodyMedium" style={createStyles.advideText}>
                            {i18n.t("referees_empty")}
                        </Text>
                    )
                }
            </View>
        </MainScreen>
    );
};

export default Referees;