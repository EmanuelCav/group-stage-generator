import { Button } from 'react-native-paper'
import i18n from '@/i18n'

import { View } from '../Themed'

import { createStyles } from '@/styles/create.styles'
import { generalStyles } from '@/styles/general.styles'

import { GenerateButtonPropsType } from '@/types/create.types'

const GenerateButton = ({ teams, colors, generateGroups }: GenerateButtonPropsType) => {
    return (
        <View style={[createStyles.containerGenerateButton, { backgroundColor: colors.background }]}>
            <Button mode="contained" onPress={generateGroups}
                style={[{ backgroundColor: teams.length < 2 ? "#bbbbbb" : colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} disabled={teams.length < 2}>
                {i18n.t("generate")}
            </Button>
        </View>
    )
}

export default GenerateButton