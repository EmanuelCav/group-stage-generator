import { ReactNode } from 'react'

import { View } from '../Themed'

const MainScreen = ({ children }: { children: ReactNode }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F9' }}>
        {children}
    </View>
  )
}

export default MainScreen