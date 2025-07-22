import { Card, IconButton, Text } from "react-native-paper";
import { View, Image, Dimensions } from "react-native";
import i18n from '@/i18n'

import { TournamentPropsType } from "@/types/index.types";

import { indexStyles } from "@/styles/index.styles";

const Tournament = ({ group, colors, handleGroup }: TournamentPropsType) => {
    return (
        <Card style={{
            marginTop: Dimensions.get("window").height / 74,
            borderColor: colors.primary,
            borderStyle: 'solid',
            borderWidth: 2,
            backgroundColor: colors.tertiary
        }}
            onPress={() => handleGroup(group)}>
            <Card.Content>
                <View style={indexStyles.containTournament}>
                    {
                        group.logo ? (
                            <Image
                                source={{ uri: group.logo }}
                                style={indexStyles.imageTournament}
                                resizeMode="contain"
                            />
                        ) : (
                            <IconButton
                                icon="trophy"
                                iconColor={colors.primary}
                                size={40}
                            />
                        )
                    }
                    <View style={{ flex: 1 }}>
                        <Text variant="titleLarge"
                            style={[indexStyles.textTournament, { color: colors.primary }]}
                            numberOfLines={1}>
                            {group.title?.slice(0, 20)}
                        </Text>
                        <Text variant="labelLarge" style={[indexStyles.textTournament, { color: colors.primary }]}>
                            {i18n.t('group.numberOfTeams', { count: group.teams.length })}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

export default Tournament;
