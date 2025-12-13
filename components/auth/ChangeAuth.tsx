import { Dimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { View } from '../Themed'

import { authStyles } from '@/styles/auth.styles'

import { ChangeAuthPropsType } from '@/types/auth.types'

const ChangeAuth = ({ text, buttonText, navigate, colors }: ChangeAuthPropsType) => {
    return (
        <View style={[authStyles.anotherAccountContain, { backgroundColor: colors.background }]}>
            <Text>
                {text}
            </Text>
            <Button style={{ marginLeft: Dimensions.get("window").width / 74 }} onPress={navigate}>
                {buttonText}
            </Button>
        </View>
    )
}

export default ChangeAuth