import { useState } from 'react'
import { Button, IconButton, MD3Colors, Text, TextInput } from 'react-native-paper'

import ContainerBackground from '../general/ContainerBackground'

import { FormUpdateMatchPropsType } from '@/types/match.types'

import { generalStyles } from '@/styles/general.styles'
import { createStyles } from '@/styles/create.styles'

const FormUpdateMatch = ({ colors, hideAndShowUpdateMatch }: FormUpdateMatchPropsType) => {

    const [scoreLocal, setScoreLocal] = useState<string>("")
    const [scoreVisitant, setScoreVisitant] = useState<string>("")

    return (
        <ContainerBackground zIndex={20}>
            <IconButton
                icon="close"
                style={generalStyles.buttonClose}
                iconColor={MD3Colors.error50}
                size={24}
                onPress={() => hideAndShowUpdateMatch(false)}
            />
            <TextInput
                inputMode="numeric"
                keyboardType="numeric"
                onChangeText={(text) => {
                    const formattedText = text.replace(/\D/g, '');
                    setScoreLocal(formattedText);
                }}
                value={scoreLocal}
                style={createStyles.inputNumberCreate}
            />

            <Button mode="contained" style={[{ backgroundColor: colors.primary }, generalStyles.generateButton]}
                labelStyle={{ color: "#ffffff" }} onPress={() => {}}>
                UPDATE
            </Button>
            <Text>FormUpdateMatch</Text>
        </ContainerBackground>
    )
}

export default FormUpdateMatch