import { Button } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '../Themed'

import { SettingsButtonPropsType } from '@/types/config.types'

import { createStyles } from '@/styles/create.styles'
import { generalStyles } from '@/styles/general.styles'

const SettingsButton = ({ colors, handleSumbit, handleConfig, loading }: SettingsButtonPropsType) => {
    return (
        <View style={[createStyles.containerGenerateButton, { backgroundColor: colors.background }]}>
            <Button
                disabled={loading}
                loading={loading}
                mode="contained"
                style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }}
                onPress={handleSumbit((data) => handleConfig(data))}
            >
                {i18n.t("general.applyChanges")}
            </Button>
        </View>
    )
}

export default SettingsButton