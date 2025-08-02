import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import i18n from '@/i18n'
import Toast, { ErrorToast } from 'react-native-toast-message';

import MainScreen from '@/components/general/MainScreen'
import HeaderGeneral from '@/components/general/HeaderGeneral'
import GroupsList from '@/components/groups/GroupsList'
import GenerateAgain from '@/components/general/GenerateAgain'
import SureGeneral from '@/components/general/SureGeneral'

import { groupStore } from '@/store/group.store'

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={1}
      text2NumberOfLines={3}
    />
  ),
};

const Groups = () => {

    const { colors } = useTheme()
    const router = useRouter()
    const { group, sureRemoveGroup, sureRestartGroup } = groupStore()

    const goBack = () => {
        router.replace("/")
    }

    return (
        <MainScreen colors={colors}>
            <HeaderGeneral colors={colors} router={router} title={i18n.t("groups")} goBack={goBack}
                sureRemoveGroup={sureRemoveGroup} sureRestartGroup={sureRestartGroup} />
            <SureGeneral />
            {
                group.isGeneratedAgain && <GenerateAgain colors={colors} />
            }
            <Toast config={toastConfig} />
            <GroupsList group={group} colors={colors} />
        </MainScreen>
    )
}

export default Groups