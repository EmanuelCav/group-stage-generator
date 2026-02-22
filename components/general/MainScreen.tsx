import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from '../Themed'

import { MainScreenPropsType } from '@/types/config.types'

const MainScreen = ({ children, colors }: MainScreenPropsType) => {

  const insets = useSafeAreaInsets()

  return (
    <SafeAreaProvider>
      <View style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }
      ]}>
        {children}
      </View>
    </SafeAreaProvider>
  )
}

export default MainScreen