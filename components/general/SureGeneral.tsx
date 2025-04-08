import { useRouter } from "expo-router"

import Sure from "./Sure"

import { groupStore } from "@/store/group.store"

const SureGeneral = () => {

    const { isSureRemove, isSureRestart, sureRestartGroup, sureRemoveGroup, removeGroup, group, restartGroup } = groupStore()
    const router = useRouter()

    const handleRestart = () => {
        sureRestartGroup(false)
        restartGroup()
        router.replace("/create")
    }

    const handleRemove = () => {
        removeGroup(group)
        sureRemoveGroup(false)
        router.replace("/create")
    }

    const close = () => {
        sureRemoveGroup(false)
        sureRestartGroup(false)
    }

    return (
        <>
            {
                isSureRemove && <Sure func={handleRemove}
                    text="Are you sure you want to delete group stage?"
                    close={close} labelButton="REMOVE" />
            }
            {
                isSureRestart && <Sure func={handleRestart}
                    text="Are you sure you want to restart group stage?"
                    close={close} labelButton="RESTART" />
            }
        </>
    )
}

export default SureGeneral