import { View } from '../Themed'

import { MainScreenPropsType } from '@/types/config.types'

const MainScreen = ({ children, colors }: MainScreenPropsType) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
        {children}
    </View>
  )
}

export default MainScreen