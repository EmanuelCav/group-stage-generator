import { Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper'

import { EmailPropsType } from '@/types/auth.types'

const Email = ({ email, setEmail, colors }: EmailPropsType) => {
  return (
    <TextInput
      value={email}
      onChangeText={setEmail}
      autoCapitalize='none'
      label="Email"
      style={{ marginBottom: Dimensions.get("window").height / 41, backgroundColor: colors.tertiary }}
    />
  )
}

export default Email
