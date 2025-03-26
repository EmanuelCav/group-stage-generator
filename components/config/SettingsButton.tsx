import { Button } from 'react-native-paper'

import { View } from '../Themed'

import { SettingsButtonPropsType } from '@/types/config.types'

import { createStyles } from '@/styles/create.styles'
import { generalStyles } from '@/styles/general.styles'

const SettingsButton = ({ colors, handleSumbit, handleConfig }: SettingsButtonPropsType) => {
    return (
        <View style={createStyles.containerGenerateButton}>
            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ backgroundColor: "#ffffff" }} onPress={handleSumbit((data) => handleConfig(data))}>
                ACCEPT
            </Button>
        </View>
    )
}

export default SettingsButton