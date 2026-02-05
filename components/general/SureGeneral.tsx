import { useRouter } from "expo-router"
import i18n from '@/i18n'

import Sure from "./Sure"

import { groupStore } from "@/store/group.store"

import { useAuth } from "@/hooks/useAuth"

import { deleteGroupFromSupabase } from "@/lib/save"

const SureGeneral = () => {

    const { isSureRemove, isSureRestart, sureRestartGroup, sureRemoveGroup, removeGroup, group, restartGroup, groups } = groupStore()
    const router = useRouter()
    const { user } = useAuth()

    const handleRestart = () => {
        router.replace("/create")
        setTimeout(() => {
            sureRestartGroup(false);
            restartGroup();
        }, 0);
    }

    const handleRemove = () => {

        if (user && group.user_id) {
            deleteGroupFromSupabase(group.id!, user.id)
        }

        if (groups.length <= 1) {
            router.replace("/create")
        } else {
            router.replace("/home")
        }

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
                    text={i18n.t("sure.removeGroupStage")}
                    close={close}
                    labelButton={i18n.t("remove")}
                />
            )}
            {isSureRestart && (
                <Sure
                    func={handleRestart}
                    text={i18n.t("sure.restartGroupStage")}
                    close={close}
                    labelButton={i18n.t("sure.restart")}
                />
            )}
        </>
    )
}

export default SureGeneral