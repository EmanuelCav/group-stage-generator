import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Sure from "./Sure"

import { useGroupStore } from "@/store/group.store"

import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/useLanguageContext"

import { deleteGroupFromSupabase } from "@/lib/save"

const SureGeneral = () => {

    const { isSureRemove, isSureRestart, sureRestartGroup, sureRemoveGroup, removeGroup, group, restartGroup } = useGroupStore()
    const router = useRouter()
    const { user } = useAuth()
    const { t } = useLanguage()

    const handleRestart = () => {
        router.replace("/(create)/teams")
        setTimeout(() => {
            sureRestartGroup(false);
            restartGroup();
        }, 0);
    }

    const handleRemove = async () => {

        if (user && group.user_id) {
            deleteGroupFromSupabase(group.id!, user.id)
        }

        router.replace("/home")

        const getAmountGroups = await AsyncStorage.getItem("amount_groups_general")
        await AsyncStorage.setItem("amount_groups_general", String(Number(getAmountGroups) - 1))

        setTimeout(() => {
            sureRemoveGroup(false)
            removeGroup(group)
        }, 0);
    }

    const close = () => {
        sureRemoveGroup(false)
        sureRestartGroup(false)
    }

    return (
        <>
            {isSureRemove && (
                <Sure
                    func={handleRemove}
                    text={t("sure.removeGroupStage")}
                    close={close}
                    labelButton={t("remove")}
                />
            )}
            {isSureRestart && (
                <Sure
                    func={handleRestart}
                    text={t("sure.restartGroupStage")}
                    close={close}
                    labelButton={t("sure.restart")}
                />
            )}
        </>
    )
}

export default SureGeneral