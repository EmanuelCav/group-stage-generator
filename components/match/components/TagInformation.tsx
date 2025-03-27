import { Icon, Text } from "react-native-paper"

import { View } from "@/components/Themed"

import { TagInformationPropsType } from "@/types/match.types"

import { matchStyles } from "@/styles/match.styles"

const TagInformation = ({ colors, source, info }: TagInformationPropsType) => {
    return (
        <View style={[matchStyles.tagInformation, { borderBottomColor: colors.secondary }]}>
            <Icon
                source={source}
                size={28}
                color={colors.primary}
            />
            <Text variant="bodyMedium">{info}</Text>
        </View>
    )
}

export default TagInformation