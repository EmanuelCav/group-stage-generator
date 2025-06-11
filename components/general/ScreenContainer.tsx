import { ReactNode } from "react"

import { View } from "../Themed"

const ScreenContainer = ({ children }: { children: ReactNode }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#ffffee" }}>
            {children}
        </View>
    )
}

export default ScreenContainer