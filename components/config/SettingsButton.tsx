import { Button } from 'react-native-paper'
import { View } from 'react-native'

import { SettingsButtonPropsType } from '@/types/config.types'

import { createStyles } from '@/styles/create.styles'
import { generalStyles } from '@/styles/general.styles'

const SettingsButton = ({ colors, handleSumbit, handleConfig, loading, t }: SettingsButtonPropsType) => {
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
                {t("general.applyChanges")}
            </Button>
        </View>
    )
}

export default SettingsButton