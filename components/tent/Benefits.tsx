import { Dimensions, View } from 'react-native'
import { Card, Text } from 'react-native-paper'

import { tentStyles } from '@/styles/tent.styles';

import { BenefitsPropsType } from '@/types/tent.types';

const Benefits = ({ colors, t }: BenefitsPropsType) => {
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
                <Text variant='titleLarge' style={{ fontFamily: 'Raleway_Bold' }}>
                    {t("benefits")}
                </Text>
                <View style={[tentStyles.benefitContainer, { backgroundColor: colors.tertiary }]}>
                    {[
                        t("benefit_remove_advertising"),
                        t("unlimited_group_stages"),
                        t("unlimited_teams"),
                        t("unlimited_images"),
                        t("unlimited_players")
                    ].map((benefit, index) => (
                        <Text key={index}>• {benefit}</Text>
                    ))}
                </View>
            </Card.Content>
        </Card>
    )
}

export default Benefits