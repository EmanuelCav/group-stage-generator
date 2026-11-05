import { TextInput } from 'react-native-paper'

import { EmailPropsType } from '@/types/auth.types'

const Email = ({ email, setEmail, colors, spacing }: EmailPropsType) => {
  return (
    <TextInput
      value={email}
      onChangeText={setEmail}
      autoCapitalize='none'
      label="Email"
      style={{ marginBottom: spacing.h41, backgroundColor: colors.tertiary }}
    />
  )
}

export default Email
