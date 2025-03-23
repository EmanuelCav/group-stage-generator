import { Button } from 'react-native-paper'

import { View } from '../Themed'

import { SettingsButtonPropsType } from '@/types/config.types'

import { createStyles } from '@/styles/create.styles'

const SettingsButton = ({ colors, handleSumbit, handleConfig }: SettingsButtonPropsType) => {
    return (
        <View style={createStyles.containerGenerateButton}>
            <Button mode="contained" style={[{ backgroundColor: colors.primary }, createStyles.generateButton]}
                labelStyle={createStyles.labelAdd} onPress={handleSumbit((data) => handleConfig(data))}>
                ACCEPT
            </Button>
        </View>
    )
}

export default SettingsButton