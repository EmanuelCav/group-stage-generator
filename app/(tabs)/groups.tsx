import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import i18n from '@/i18n'
import Toast from 'react-native-toast-message';

import MainScreen from '@/components/general/MainScreen'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import GroupsList from '@/components/groups/GroupsList'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'
import Loading from '@/components/general/Loading'

import { groupStore } from '@/store/group.store'
import { responseStore } from '@/store/response.store'

const Groups = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, sureRemoveGroup, sureRestartGroup } = groupStore()
    const { isLoading } = responseStore()

    const goBack = () => {
        router.replace("/")
    }

    return (
        <MainScreen colors={colors}>
            {
                isLoading && <Loading text={i18n.t("generating")} />
            }
            <HeaderGeneral colors={colors} router={router} title={i18n.t("groups")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            <Toast />
            {
                group.isGeneratedAgain && <GenerateAgain colors={colors} />
            }
            <GroupsList group={group} colors={colors} />
        </MainScreen>
    )
}

export default Groups