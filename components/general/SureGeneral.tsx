import { useRouter } from "expo-router"
import i18n from '@/i18n'

import Sure from "./Sure"

import { groupStore } from "@/store/group.store"

const SureGeneral = () => {

    const { isSureRemove, isSureRestart, sureRestartGroup, sureRemoveGroup, removeGroup, group, restartGroup } = groupStore()
    const router = useRouter()

    const handleRestart = () => {
        router.replace("/create")
        setTimeout(() => {
            sureRestartGroup(false);
            restartGroup();
        }, 0);
    }

    const handleRemove = () => {
        router.replace("/")
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