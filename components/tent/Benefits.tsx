import { Dimensions } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'
import i18n from '@/i18n';

import { View } from '../Themed';

import { tentStyles } from '@/styles/tent.styles';

const benefits: string[] = [
    i18n.t("benefit_remove_advertising"),
    i18n.t("unlimited_group_stages"),
    i18n.t("unlimited_teams"),
    i18n.t("unlimited_images"),
    i18n.t("unlimited_players")
];

const Benefits = ({ colors }: { colors: MD3Colors }) => {
    return (
        <Card style={{
            marginTop: Dimensions.get("window").height / 74,
            borderColor: colors.primary,
            borderStyle: 'solid',
            width: '100%',
            borderWidth: 4,
            backgroundColor: colors.tertiary
        }}>
            <Card.Content>
                <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
                    {i18n.t("benefits")}
                </Text>
                <View style={tentStyles.benefitContainer}>
                    {benefits.map((benefit, index) => (
                        <Text key={index}>• {benefit}</Text>
                    ))}
                </View>
            </Card.Content>
        </Card>
    )
}

export default Benefits