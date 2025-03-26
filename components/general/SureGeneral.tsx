import Sure from "./Sure"

import { groupStore } from "@/store/group.store"

const SureGeneral = () => {

    const { isSureRemove, isSureRestart, sureRestartGroup, sureRemoveGroup, removeGroup, group } = groupStore()

    const handleRestart = () => {
        sureRestartGroup(false)
    }

    const handleRemove = () => {
        sureRemoveGroup(false)
        removeGroup(group)
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
                    close={close} />
            }
            {
                isSureRestart && <Sure func={handleRestart}
                    text="Are you sure you want to restart group stage?"
                    close={close} />
            }
        </>
    )
}

export default SureGeneral